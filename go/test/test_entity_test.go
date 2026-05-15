package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/game-development-sdk"
	"github.com/voxgig-sdk/game-development-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestTestEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Test(nil)
		if ent == nil {
			t.Fatal("expected non-nil TestEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := testBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "test." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set GAMEDEVELOPMENT_TEST_TEST_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		testRef01Ent := client.Test(nil)
		testRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "test"}, setup.data), "test_ref01"))
		testRef01Data["project_id"] = setup.idmap["project01"]

		testRef01DataResult, err := testRef01Ent.Create(testRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		testRef01Data = core.ToMapAny(testRef01DataResult)
		if testRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if testRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		testRef01Match := map[string]any{
			"project_id": setup.idmap["project01"],
		}

		testRef01ListResult, err := testRef01Ent.List(testRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		testRef01List, testRef01ListOk := testRef01ListResult.([]any)
		if !testRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", testRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(testRef01List), map[string]any{"id": testRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// LOAD
		testRef01MatchDt0 := map[string]any{
			"id": testRef01Data["id"],
		}
		testRef01DataDt0Loaded, err := testRef01Ent.Load(testRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		testRef01DataDt0LoadResult := core.ToMapAny(testRef01DataDt0Loaded)
		if testRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if testRef01DataDt0LoadResult["id"] != testRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func testBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "test", "TestTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read test test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse test test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"test01", "test02", "test03", "project01", "project02", "project03"},
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
	entidEnvRaw := os.Getenv("GAMEDEVELOPMENT_TEST_TEST_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GAMEDEVELOPMENT_TEST_TEST_ENTID": idmap,
		"GAMEDEVELOPMENT_TEST_LIVE":      "FALSE",
		"GAMEDEVELOPMENT_TEST_EXPLAIN":   "FALSE",
		"GAMEDEVELOPMENT_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["GAMEDEVELOPMENT_TEST_TEST_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["GAMEDEVELOPMENT_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["GAMEDEVELOPMENT_APIKEY"],
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
