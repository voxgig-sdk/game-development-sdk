# Project entity test

require "minitest/autorun"
require "json"
require_relative "../GameDevelopment_sdk"
require_relative "runner"

class ProjectEntityTest < Minitest::Test
  def test_create_instance
    testsdk = GameDevelopmentSDK.test(nil, nil)
    ent = testsdk.Project(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "project" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = GameDevelopmentSDK.test(seed, nil)
    seen = base.Project(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = GameDevelopmentConfig.make_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = GameDevelopmentSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Project(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  def test_basic_flow
    setup = project_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "project." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set GAMEDEVELOPMENT_TEST_PROJECT_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    project_ref01_ent = client.Project(nil)
    project_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.project"), "project_ref01"))

    project_ref01_data_result = project_ref01_ent.create(project_ref01_data, nil)
    project_ref01_data = Helpers.to_map(project_ref01_data_result)
    assert !project_ref01_data.nil?
    assert !project_ref01_data["id"].nil?

    # LIST
    project_ref01_match = {}

    project_ref01_list_result = project_ref01_ent.list(project_ref01_match, nil)
    assert project_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(project_ref01_list_result),
      { "id" => project_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # UPDATE
    project_ref01_data_up0_up = {
      "id" => project_ref01_data["id"],
    }

    project_ref01_markdef_up0_name = "created_at"
    project_ref01_markdef_up0_value = "Mark01-project_ref01_#{setup[:now]}"
    project_ref01_data_up0_up[project_ref01_markdef_up0_name] = project_ref01_markdef_up0_value

    project_ref01_resdata_up0_result = project_ref01_ent.update(project_ref01_data_up0_up, nil)
    project_ref01_resdata_up0 = Helpers.to_map(project_ref01_resdata_up0_result)
    assert !project_ref01_resdata_up0.nil?
    assert_equal project_ref01_resdata_up0["id"], project_ref01_data_up0_up["id"]
    assert_equal project_ref01_resdata_up0[project_ref01_markdef_up0_name], project_ref01_markdef_up0_value

    # LOAD
    project_ref01_match_dt0 = {
      "id" => project_ref01_data["id"],
    }
    project_ref01_data_dt0_loaded = project_ref01_ent.load(project_ref01_match_dt0, nil)
    project_ref01_data_dt0_load_result = Helpers.to_map(project_ref01_data_dt0_loaded)
    assert !project_ref01_data_dt0_load_result.nil?
    assert_equal project_ref01_data_dt0_load_result["id"], project_ref01_data["id"]

    # REMOVE
    project_ref01_match_rm0 = {
      "id" => project_ref01_data["id"],
    }
    project_ref01_ent.remove(project_ref01_match_rm0, nil)

    # LIST
    project_ref01_match_rt0 = {}

    project_ref01_list_rt0_result = project_ref01_ent.list(project_ref01_match_rt0, nil)
    assert project_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(project_ref01_list_rt0_result),
      { "id" => project_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def project_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "project", "ProjectTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = GameDevelopmentSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["project01", "project02", "project03"],
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
  entid_env_raw = ENV["GAMEDEVELOPMENT_TEST_PROJECT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "GAMEDEVELOPMENT_TEST_PROJECT_ENTID" => idmap,
    "GAMEDEVELOPMENT_TEST_LIVE" => "FALSE",
    "GAMEDEVELOPMENT_TEST_EXPLAIN" => "FALSE",
    "GAMEDEVELOPMENT_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["GAMEDEVELOPMENT_TEST_PROJECT_ENTID"])
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
