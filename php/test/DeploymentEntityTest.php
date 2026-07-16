<?php
declare(strict_types=1);

// Deployment entity test

require_once __DIR__ . '/../gamedevelopment_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class DeploymentEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = GameDevelopmentSDK::test(null, null);
        $ent = $testsdk->Deployment(null);
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
                "deployment" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = GameDevelopmentSDK::test($seed, null);
        $seen = iterator_to_array($base->Deployment(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = GameDevelopmentConfig::make_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = GameDevelopmentSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Deployment(null)->stream("list", null, null) as $item) {
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
        $setup = deployment_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "deployment." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set GAMEDEVELOPMENT_TEST_DEPLOYMENT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $deployment_ref01_ent = $client->Deployment(null);
        $deployment_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.deployment"), "deployment_ref01"));
        $deployment_ref01_data["project_id"] = $setup["idmap"]["project01"];

        $deployment_ref01_data_result = $deployment_ref01_ent->create($deployment_ref01_data, null);
        $deployment_ref01_data = Helpers::to_map($deployment_ref01_data_result);
        $this->assertNotNull($deployment_ref01_data);
        $this->assertNotNull($deployment_ref01_data["id"]);

        // LIST
        $deployment_ref01_match = [
            "project_id" => $setup["idmap"]["project01"],
        ];

        $deployment_ref01_list_result = $deployment_ref01_ent->list($deployment_ref01_match, null);
        $this->assertIsArray($deployment_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($deployment_ref01_list_result),
            ["id" => $deployment_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // LOAD
        $deployment_ref01_match_dt0 = [
            "id" => $deployment_ref01_data["id"],
        ];
        $deployment_ref01_data_dt0_loaded = $deployment_ref01_ent->load($deployment_ref01_match_dt0, null);
        $deployment_ref01_data_dt0_load_result = Helpers::to_map($deployment_ref01_data_dt0_loaded);
        $this->assertNotNull($deployment_ref01_data_dt0_load_result);
        $this->assertEquals($deployment_ref01_data_dt0_load_result["id"], $deployment_ref01_data["id"]);

    }
}

function deployment_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/deployment/DeploymentTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = GameDevelopmentSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["deployment01", "deployment02", "deployment03", "project01", "project02", "project03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("GAMEDEVELOPMENT_TEST_DEPLOYMENT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "GAMEDEVELOPMENT_TEST_DEPLOYMENT_ENTID" => $idmap,
        "GAMEDEVELOPMENT_TEST_LIVE" => "FALSE",
        "GAMEDEVELOPMENT_TEST_EXPLAIN" => "FALSE",
        "GAMEDEVELOPMENT_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["GAMEDEVELOPMENT_TEST_DEPLOYMENT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["GAMEDEVELOPMENT_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["GAMEDEVELOPMENT_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new GameDevelopmentSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["GAMEDEVELOPMENT_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["GAMEDEVELOPMENT_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
