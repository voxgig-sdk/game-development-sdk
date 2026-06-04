<?php
declare(strict_types=1);

// Collaborator entity test

require_once __DIR__ . '/../gamedevelopment_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class CollaboratorEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = GameDevelopmentSDK::test(null, null);
        $ent = $testsdk->Collaborator(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = collaborator_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "collaborator." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set GAMEDEVELOPMENT_TEST_COLLABORATOR_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $collaborator_ref01_ent = $client->Collaborator(null);
        $collaborator_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.collaborator"), "collaborator_ref01"));
        $collaborator_ref01_data["project_id"] = $setup["idmap"]["project01"];

        [$collaborator_ref01_data_result, $err] = $collaborator_ref01_ent->create($collaborator_ref01_data, null);
        $this->assertNull($err);
        $collaborator_ref01_data = Helpers::to_map($collaborator_ref01_data_result);
        $this->assertNotNull($collaborator_ref01_data);

    }
}

function collaborator_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/collaborator/CollaboratorTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = GameDevelopmentSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["collaborator01", "collaborator02", "collaborator03", "project01", "project02", "project03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("GAMEDEVELOPMENT_TEST_COLLABORATOR_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "GAMEDEVELOPMENT_TEST_COLLABORATOR_ENTID" => $idmap,
        "GAMEDEVELOPMENT_TEST_LIVE" => "FALSE",
        "GAMEDEVELOPMENT_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["GAMEDEVELOPMENT_TEST_COLLABORATOR_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["GAMEDEVELOPMENT_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
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
