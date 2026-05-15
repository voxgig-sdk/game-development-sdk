-- Deployment entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("game-development_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("DeploymentEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Deployment(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = deployment_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "deployment." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set GAMEDEVELOPMENT_TEST_DEPLOYMENT_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local deployment_ref01_ent = client:Deployment(nil)
    local deployment_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.deployment"), "deployment_ref01"))
    deployment_ref01_data["project_id"] = setup.idmap["project01"]

    local deployment_ref01_data_result, err = deployment_ref01_ent:create(deployment_ref01_data, nil)
    assert.is_nil(err)
    deployment_ref01_data = helpers.to_map(deployment_ref01_data_result)
    assert.is_not_nil(deployment_ref01_data)
    assert.is_not_nil(deployment_ref01_data["id"])

    -- LIST
    local deployment_ref01_match = {
      ["project_id"] = setup.idmap["project01"],
    }

    local deployment_ref01_list_result, err = deployment_ref01_ent:list(deployment_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(deployment_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(deployment_ref01_list_result),
      { id = deployment_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    -- LOAD
    local deployment_ref01_match_dt0 = {
      id = deployment_ref01_data["id"],
    }
    local deployment_ref01_data_dt0_loaded, err = deployment_ref01_ent:load(deployment_ref01_match_dt0, nil)
    assert.is_nil(err)
    local deployment_ref01_data_dt0_load_result = helpers.to_map(deployment_ref01_data_dt0_loaded)
    assert.is_not_nil(deployment_ref01_data_dt0_load_result)
    assert.are.equal(deployment_ref01_data_dt0_load_result["id"], deployment_ref01_data["id"])

  end)
end)

function deployment_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/deployment/DeploymentTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read deployment test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "deployment01", "deployment02", "deployment03", "project01", "project02", "project03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("GAMEDEVELOPMENT_TEST_DEPLOYMENT_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["GAMEDEVELOPMENT_TEST_DEPLOYMENT_ENTID"] = idmap,
    ["GAMEDEVELOPMENT_TEST_LIVE"] = "FALSE",
    ["GAMEDEVELOPMENT_TEST_EXPLAIN"] = "FALSE",
    ["GAMEDEVELOPMENT_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["GAMEDEVELOPMENT_TEST_DEPLOYMENT_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["GAMEDEVELOPMENT_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
        apikey = env["GAMEDEVELOPMENT_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["GAMEDEVELOPMENT_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["GAMEDEVELOPMENT_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
