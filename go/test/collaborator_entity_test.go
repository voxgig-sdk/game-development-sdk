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

func TestCollaboratorEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Collaborator(nil)
		if ent == nil {
			t.Fatal("expected non-nil CollaboratorEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := collaboratorBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "collaborator." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set GAMEDEVELOPMENT_TEST_COLLABORATOR_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		collaboratorRef01Ent := client.Collaborator(nil)
		collaboratorRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "collaborator"}, setup.data), "collaborator_ref01"))
		collaboratorRef01Data["project_id"] = setup.idmap["project01"]

		collaboratorRef01DataResult, err := collaboratorRef01Ent.Create(collaboratorRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		collaboratorRef01Data = core.ToMapAny(collaboratorRef01DataResult)
		if collaboratorRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func collaboratorBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "collaborator", "CollaboratorTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read collaborator test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse collaborator test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"collaborator01", "collaborator02", "collaborator03", "project01", "project02", "project03"},
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
	entidEnvRaw := os.Getenv("GAMEDEVELOPMENT_TEST_COLLABORATOR_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GAMEDEVELOPMENT_TEST_COLLABORATOR_ENTID": idmap,
		"GAMEDEVELOPMENT_TEST_LIVE":      "FALSE",
		"GAMEDEVELOPMENT_TEST_EXPLAIN":   "FALSE",
		"GAMEDEVELOPMENT_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["GAMEDEVELOPMENT_TEST_COLLABORATOR_ENTID"])
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
