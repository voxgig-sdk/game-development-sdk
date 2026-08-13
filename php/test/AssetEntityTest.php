<?php
declare(strict_types=1);

// Asset entity test

require_once __DIR__ . '/../gamedevelopment_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class AssetEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = GameDevelopmentSDK::test(null, null);
        $ent = $testsdk->Asset(null);
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
                "asset" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = GameDevelopmentSDK::test($seed, null);
        $seen = iterator_to_array($base->Asset(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = GameDevelopmentConfig::make_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = GameDevelopmentSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Asset(null)->stream("list", null, null) as $item) {
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
        $setup = asset_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "asset." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set GAME_DEVELOPMENT_TEST_ASSET_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $asset_ref01_ent = $client->Asset(null);
        $asset_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.asset"), "asset_ref01"));
        $asset_ref01_data["project_id"] = $setup["idmap"]["project01"];

        $asset_ref01_data_result = $asset_ref01_ent->create($asset_ref01_data, null);
        $asset_ref01_data = Helpers::to_map(is_object($asset_ref01_data_result) && method_exists($asset_ref01_data_result, 'data_get') ? $asset_ref01_data_result->data_get() : $asset_ref01_data_result);
        $this->assertNotNull($asset_ref01_data);
        $this->assertNotNull($asset_ref01_data["id"]);

        // LIST
        $asset_ref01_match = [
            "project_id" => $setup["idmap"]["project01"],
        ];

        $asset_ref01_list_result = $asset_ref01_ent->list($asset_ref01_match, null);
        $this->assertIsArray($asset_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($asset_ref01_list_result),
            ["id" => $asset_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // LOAD
        $asset_ref01_match_dt0 = [
            "id" => $asset_ref01_data["id"],
        ];
        $asset_ref01_data_dt0_loaded = $asset_ref01_ent->load($asset_ref01_match_dt0, null);
        $asset_ref01_data_dt0_load_result = Helpers::to_map(is_object($asset_ref01_data_dt0_loaded) && method_exists($asset_ref01_data_dt0_loaded, 'data_get') ? $asset_ref01_data_dt0_loaded->data_get() : $asset_ref01_data_dt0_loaded);
        $this->assertNotNull($asset_ref01_data_dt0_load_result);
        $this->assertEquals($asset_ref01_data_dt0_load_result["id"], $asset_ref01_data["id"]);

        // REMOVE
        $asset_ref01_match_rm0 = [
            "id" => $asset_ref01_data["id"],
        ];
        $asset_ref01_ent->remove($asset_ref01_match_rm0, null);

        // LIST
        $asset_ref01_match_rt0 = [
            "project_id" => $setup["idmap"]["project01"],
        ];

        $asset_ref01_list_rt0_result = $asset_ref01_ent->list($asset_ref01_match_rt0, null);
        $this->assertIsArray($asset_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($asset_ref01_list_rt0_result),
            ["id" => $asset_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function asset_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/asset/AssetTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = GameDevelopmentSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["asset01", "asset02", "asset03", "project01", "project02", "project03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("GAME_DEVELOPMENT_TEST_ASSET_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "GAME_DEVELOPMENT_TEST_ASSET_ENTID" => $idmap,
        "GAME_DEVELOPMENT_TEST_LIVE" => "FALSE",
        "GAME_DEVELOPMENT_TEST_EXPLAIN" => "FALSE",
        "GAME_DEVELOPMENT_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["GAME_DEVELOPMENT_TEST_ASSET_ENTID"]);
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
