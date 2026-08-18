<?php
declare(strict_types=1);

// Collaboration entity test

require_once __DIR__ . '/../gamedevelopment_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class CollaborationEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = GameDevelopmentSDK::test(null, null);
        $ent = $testsdk->Collaboration(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "collaboration" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = GameDevelopmentSDK::test($seed, null);
        $seen = iterator_to_array($base->Collaboration(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = GameDevelopmentConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = GameDevelopmentSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Collaboration(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = collaboration_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "collaboration." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set GAME_DEVELOPMENT_TEST_COLLABORATION_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $collaboration_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.collaboration")));
        $collaboration_ref01_data = null;
        if (count($collaboration_ref01_data_raw) > 0) {
            $collaboration_ref01_data = Helpers::to_map($collaboration_ref01_data_raw[0][1]);
        }

        // LIST
        $collaboration_ref01_ent = $client->Collaboration(null);
        $collaboration_ref01_match = [
            "project_id" => $setup["idmap"]["project01"],
        ];

        $collaboration_ref01_list_result = $collaboration_ref01_ent->list($collaboration_ref01_match, null);
        $this->assertIsArray($collaboration_ref01_list_result);

    }
}

function collaboration_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/collaboration/CollaborationTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = GameDevelopmentSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["collaboration01", "collaboration02", "collaboration03", "project01", "project02", "project03", "collaborator01", "collaborator02", "collaborator03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("GAME_DEVELOPMENT_TEST_COLLABORATION_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "GAME_DEVELOPMENT_TEST_COLLABORATION_ENTID" => $idmap,
        "GAME_DEVELOPMENT_TEST_LIVE" => "FALSE",
        "GAME_DEVELOPMENT_TEST_EXPLAIN" => "FALSE",
        "GAME_DEVELOPMENT_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["GAME_DEVELOPMENT_TEST_COLLABORATION_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["GAME_DEVELOPMENT_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["GAME_DEVELOPMENT_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new GameDevelopmentSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["GAME_DEVELOPMENT_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["GAME_DEVELOPMENT_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
