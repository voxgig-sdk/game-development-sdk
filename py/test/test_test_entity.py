# Test entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from gamedevelopment_sdk import GameDevelopmentSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestTestEntity:

    def test_should_create_instance(self):
        testsdk = GameDevelopmentSDK.test(None, None)
        ent = testsdk.Test(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _test_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "test." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set GAMEDEVELOPMENT_TEST_TEST_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        test_ref01_ent = client.Test(None)
        test_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.test"), "test_ref01"))
        test_ref01_data["project_id"] = setup["idmap"]["project01"]

        test_ref01_data = helpers.to_map(test_ref01_ent.create(test_ref01_data, None))
        assert test_ref01_data is not None
        assert test_ref01_data["id"] is not None

        # LIST
        test_ref01_match = {
            "project_id": setup["idmap"]["project01"],
        }

        test_ref01_list_result = test_ref01_ent.list(test_ref01_match, None)
        assert isinstance(test_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(test_ref01_list_result),
            {"id": test_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # LOAD
        test_ref01_match_dt0 = {
            "id": test_ref01_data["id"],
        }
        test_ref01_data_dt0_loaded = test_ref01_ent.load(test_ref01_match_dt0, None)
        test_ref01_data_dt0_load_result = helpers.to_map(test_ref01_data_dt0_loaded)
        assert test_ref01_data_dt0_load_result is not None
        assert test_ref01_data_dt0_load_result["id"] == test_ref01_data["id"]



def _test_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/test/TestTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = GameDevelopmentSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["test01", "test02", "test03", "project01", "project02", "project03"],
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
        "GAMEDEVELOPMENT_TEST_TEST_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "GAMEDEVELOPMENT_TEST_TEST_ENTID": idmap,
        "GAMEDEVELOPMENT_TEST_LIVE": "FALSE",
        "GAMEDEVELOPMENT_TEST_EXPLAIN": "FALSE",
        "GAMEDEVELOPMENT_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("GAMEDEVELOPMENT_TEST_TEST_ENTID"))
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
