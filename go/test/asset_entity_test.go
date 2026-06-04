package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/game-development-sdk/go"
	"github.com/voxgig-sdk/game-development-sdk/go/core"

	vs "github.com/voxgig-sdk/game-development-sdk/go/utility/struct"
)

func TestAssetEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Asset(nil)
		if ent == nil {
			t.Fatal("expected non-nil AssetEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := assetBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "asset." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set GAMEDEVELOPMENT_TEST_ASSET_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		assetRef01Ent := client.Asset(nil)
		assetRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "asset"}, setup.data), "asset_ref01"))
		assetRef01Data["project_id"] = setup.idmap["project01"]

		assetRef01DataResult, err := assetRef01Ent.Create(assetRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		assetRef01Data = core.ToMapAny(assetRef01DataResult)
		if assetRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if assetRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		assetRef01Match := map[string]any{
			"project_id": setup.idmap["project01"],
		}

		assetRef01ListResult, err := assetRef01Ent.List(assetRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		assetRef01List, assetRef01ListOk := assetRef01ListResult.([]any)
		if !assetRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", assetRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(assetRef01List), map[string]any{"id": assetRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// LOAD
		assetRef01MatchDt0 := map[string]any{
			"id": assetRef01Data["id"],
		}
		assetRef01DataDt0Loaded, err := assetRef01Ent.Load(assetRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		assetRef01DataDt0LoadResult := core.ToMapAny(assetRef01DataDt0Loaded)
		if assetRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if assetRef01DataDt0LoadResult["id"] != assetRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		assetRef01MatchRm0 := map[string]any{
			"id": assetRef01Data["id"],
		}
		_, err = assetRef01Ent.Remove(assetRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		assetRef01MatchRt0 := map[string]any{
			"project_id": setup.idmap["project01"],
		}

		assetRef01ListRt0Result, err := assetRef01Ent.List(assetRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		assetRef01ListRt0, assetRef01ListRt0Ok := assetRef01ListRt0Result.([]any)
		if !assetRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", assetRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(assetRef01ListRt0), map[string]any{"id": assetRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func assetBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "asset", "AssetTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read asset test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse asset test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"asset01", "asset02", "asset03", "project01", "project02", "project03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("GAMEDEVELOPMENT_TEST_ASSET_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GAMEDEVELOPMENT_TEST_ASSET_ENTID": idmap,
		"GAMEDEVELOPMENT_TEST_LIVE":      "FALSE",
		"GAMEDEVELOPMENT_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["GAMEDEVELOPMENT_TEST_ASSET_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["GAMEDEVELOPMENT_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewGameDevelopmentSDK(core.ToMapAny(mergedOpts))
	}

	live := env["GAMEDEVELOPMENT_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["GAMEDEVELOPMENT_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
