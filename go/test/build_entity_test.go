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

func TestBuildEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Build(nil)
		if ent == nil {
			t.Fatal("expected non-nil BuildEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := buildBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "build." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set GAME_DEVELOPMENT_TEST_BUILD_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		buildRef01Ent := client.Build(nil)
		buildRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "build"}, setup.data), "build_ref01"))
		buildRef01Data["project_id"] = setup.idmap["project01"]

		buildRef01DataResult, err := buildRef01Ent.Create(buildRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		buildRef01Data = core.ToMapAny(entityData(buildRef01DataResult))
		if buildRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func buildBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "build", "BuildTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read build test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse build test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"build01", "build02", "build03", "project01", "project02", "project03"},
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
	entidEnvRaw := os.Getenv("GAME_DEVELOPMENT_TEST_BUILD_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GAME_DEVELOPMENT_TEST_BUILD_ENTID": idmap,
		"GAME_DEVELOPMENT_TEST_LIVE":      "FALSE",
		"GAME_DEVELOPMENT_TEST_EXPLAIN":   "FALSE",
		"GAME_DEVELOPMENT_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["GAME_DEVELOPMENT_TEST_BUILD_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["GAME_DEVELOPMENT_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["GAME_DEVELOPMENT_APIKEY"],
			},
			extra,
		})
		client = sdk.NewGameDevelopmentSDK(core.ToMapAny(mergedOpts))
	}

	live := env["GAME_DEVELOPMENT_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["GAME_DEVELOPMENT_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
