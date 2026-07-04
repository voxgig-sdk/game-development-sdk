# Collaboration entity test

require "minitest/autorun"
require "json"
require_relative "../GameDevelopment_sdk"
require_relative "runner"

class CollaborationEntityTest < Minitest::Test
  def test_create_instance
    testsdk = GameDevelopmentSDK.test(nil, nil)
    ent = testsdk.Collaboration(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = collaboration_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "collaboration." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set GAMEDEVELOPMENT_TEST_COLLABORATION_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    collaboration_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.collaboration")))
    collaboration_ref01_data = nil
    if collaboration_ref01_data_raw.length > 0
      collaboration_ref01_data = Helpers.to_map(collaboration_ref01_data_raw[0][1])
    end

    # LIST
    collaboration_ref01_ent = client.Collaboration(nil)
    collaboration_ref01_match = {
      "project_id" => setup[:idmap]["project01"],
    }

    collaboration_ref01_list_result = collaboration_ref01_ent.list(collaboration_ref01_match, nil)
    assert collaboration_ref01_list_result.is_a?(Array)

    # REMOVE
    collaboration_ref01_match_rm0 = {
      "id" => collaboration_ref01_data["id"],
    }
    collaboration_ref01_ent.remove(collaboration_ref01_match_rm0, nil)

    # LIST
    collaboration_ref01_match_rt0 = {
      "project_id" => setup[:idmap]["project01"],
    }

    collaboration_ref01_list_rt0_result = collaboration_ref01_ent.list(collaboration_ref01_match_rt0, nil)
    assert collaboration_ref01_list_rt0_result.is_a?(Array)

  end
end

def collaboration_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "collaboration", "CollaborationTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = GameDevelopmentSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["collaboration01", "collaboration02", "collaboration03", "project01", "project02", "project03", "collaborator01", "collaborator02", "collaborator03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["GAMEDEVELOPMENT_TEST_COLLABORATION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "GAMEDEVELOPMENT_TEST_COLLABORATION_ENTID" => idmap,
    "GAMEDEVELOPMENT_TEST_LIVE" => "FALSE",
    "GAMEDEVELOPMENT_TEST_EXPLAIN" => "FALSE",
    "GAMEDEVELOPMENT_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["GAMEDEVELOPMENT_TEST_COLLABORATION_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["GAMEDEVELOPMENT_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["GAMEDEVELOPMENT_APIKEY"],
      },
      extra || {},
    ])
    client = GameDevelopmentSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["GAMEDEVELOPMENT_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["GAMEDEVELOPMENT_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
