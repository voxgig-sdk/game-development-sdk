# Project entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from gamedevelopment_sdk import GameDevelopmentSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestProjectEntity:

    def test_should_create_instance(self):
        testsdk = GameDevelopmentSDK.test(None, None)
        ent = testsdk.Project(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _project_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "project." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set GAMEDEVELOPMENT_TEST_PROJECT_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        project_ref01_ent = client.Project(None)
        project_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.project"), "project_ref01"))

        project_ref01_data_result, err = project_ref01_ent.create(project_ref01_data, None)
        assert err is None
        project_ref01_data = helpers.to_map(project_ref01_data_result)
        assert project_ref01_data is not None
        assert project_ref01_data["id"] is not None

        # LIST
        project_ref01_match = {}

        project_ref01_list_result, err = project_ref01_ent.list(project_ref01_match, None)
        assert err is None
        assert isinstance(project_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(project_ref01_list_result),
            {"id": project_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # UPDATE
        project_ref01_data_up0_up = {
            "id": project_ref01_data["id"],
        }

        project_ref01_markdef_up0_name = "created_at"
        project_ref01_markdef_up0_value = "Mark01-project_ref01_" + str(setup["now"])
        project_ref01_data_up0_up[project_ref01_markdef_up0_name] = project_ref01_markdef_up0_value

        project_ref01_resdata_up0_result, err = project_ref01_ent.update(project_ref01_data_up0_up, None)
        assert err is None
        project_ref01_resdata_up0 = helpers.to_map(project_ref01_resdata_up0_result)
        assert project_ref01_resdata_up0 is not None
        assert project_ref01_resdata_up0["id"] == project_ref01_data_up0_up["id"]
        assert project_ref01_resdata_up0[project_ref01_markdef_up0_name] == project_ref01_markdef_up0_value

        # LOAD
        project_ref01_match_dt0 = {
            "id": project_ref01_data["id"],
        }
        project_ref01_data_dt0_loaded, err = project_ref01_ent.load(project_ref01_match_dt0, None)
        assert err is None
        project_ref01_data_dt0_load_result = helpers.to_map(project_ref01_data_dt0_loaded)
        assert project_ref01_data_dt0_load_result is not None
        assert project_ref01_data_dt0_load_result["id"] == project_ref01_data["id"]

        # REMOVE
        project_ref01_match_rm0 = {
            "id": project_ref01_data["id"],
        }
        _, err = project_ref01_ent.remove(project_ref01_match_rm0, None)
        assert err is None

        # LIST
        project_ref01_match_rt0 = {}

        project_ref01_list_rt0_result, err = project_ref01_ent.list(project_ref01_match_rt0, None)
        assert err is None
        assert isinstance(project_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(project_ref01_list_rt0_result),
            {"id": project_ref01_data["id"]})
        assert vs.isempty(not_found_item)



def _project_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/project/ProjectTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = GameDevelopmentSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["project01", "project02", "project03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "GAMEDEVELOPMENT_TEST_PROJECT_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "GAMEDEVELOPMENT_TEST_PROJECT_ENTID": idmap,
        "GAMEDEVELOPMENT_TEST_LIVE": "FALSE",
        "GAMEDEVELOPMENT_TEST_EXPLAIN": "FALSE",
        "GAMEDEVELOPMENT_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("GAMEDEVELOPMENT_TEST_PROJECT_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("GAMEDEVELOPMENT_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("GAMEDEVELOPMENT_APIKEY"),
            },
            extra or {},
        ])
        client = GameDevelopmentSDK(helpers.to_map(merged_opts))

    _live = env.get("GAMEDEVELOPMENT_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("GAMEDEVELOPMENT_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
