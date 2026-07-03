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

func TestCollaborationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Collaboration(nil)
		if ent == nil {
			t.Fatal("expected non-nil CollaborationEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := collaborationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "collaboration." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set GAMEDEVELOPMENT_TEST_COLLABORATION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		collaborationRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.collaboration", setup.data)))
		var collaborationRef01Data map[string]any
		if len(collaborationRef01DataRaw) > 0 {
			collaborationRef01Data = core.ToMapAny(collaborationRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = collaborationRef01Data

		// LIST
		collaborationRef01Ent := client.Collaboration(nil)
		collaborationRef01Match := map[string]any{
			"project_id": setup.idmap["project01"],
		}

		collaborationRef01ListResult, err := collaborationRef01Ent.List(collaborationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, collaborationRef01ListOk := collaborationRef01ListResult.([]any)
		if !collaborationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", collaborationRef01ListResult)
		}

		// REMOVE
		collaborationRef01MatchRm0 := map[string]any{
			"id": collaborationRef01Data["id"],
		}
		_, err = collaborationRef01Ent.Remove(collaborationRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		collaborationRef01MatchRt0 := map[string]any{
			"project_id": setup.idmap["project01"],
		}

		collaborationRef01ListRt0Result, err := collaborationRef01Ent.List(collaborationRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, collaborationRef01ListRt0Ok := collaborationRef01ListRt0Result.([]any)
		if !collaborationRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", collaborationRef01ListRt0Result)
		}

	})
}

func collaborationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "collaboration", "CollaborationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read collaboration test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse collaboration test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"collaboration01", "collaboration02", "collaboration03", "project01", "project02", "project03", "collaborator01", "collaborator02", "collaborator03"},
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
	entidEnvRaw := os.Getenv("GAMEDEVELOPMENT_TEST_COLLABORATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GAMEDEVELOPMENT_TEST_COLLABORATION_ENTID": idmap,
		"GAMEDEVELOPMENT_TEST_LIVE":      "FALSE",
		"GAMEDEVELOPMENT_TEST_EXPLAIN":   "FALSE",
		"GAMEDEVELOPMENT_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["GAMEDEVELOPMENT_TEST_COLLABORATION_ENTID"])
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
