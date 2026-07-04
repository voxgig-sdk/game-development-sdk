# GameDevelopment SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import GameDevelopmentUtility
from core.spec import GameDevelopmentSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import GameDevelopmentBaseFeature
from features import _make_feature


class GameDevelopmentSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = GameDevelopmentUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return GameDevelopmentUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = GameDevelopmentSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    @property
    def analytics(self):
        """Idiomatic facade: client.analytics.list() / client.analytics.load({"id": ...})."""
        from entity.analytics_entity import AnalyticsEntity
        cached = getattr(self, "_analytics", None)
        if cached is None:
            cached = AnalyticsEntity(self, None)
            self._analytics = cached
        return cached

    def Analytics(self, data=None):
        # Deprecated: use client.analytics instead.
        from entity.analytics_entity import AnalyticsEntity
        return AnalyticsEntity(self, data)


    @property
    def asset(self):
        """Idiomatic facade: client.asset.list() / client.asset.load({"id": ...})."""
        from entity.asset_entity import AssetEntity
        cached = getattr(self, "_asset", None)
        if cached is None:
            cached = AssetEntity(self, None)
            self._asset = cached
        return cached

    def Asset(self, data=None):
        # Deprecated: use client.asset instead.
        from entity.asset_entity import AssetEntity
        return AssetEntity(self, data)


    @property
    def build(self):
        """Idiomatic facade: client.build.list() / client.build.load({"id": ...})."""
        from entity.build_entity import BuildEntity
        cached = getattr(self, "_build", None)
        if cached is None:
            cached = BuildEntity(self, None)
            self._build = cached
        return cached

    def Build(self, data=None):
        # Deprecated: use client.build instead.
        from entity.build_entity import BuildEntity
        return BuildEntity(self, data)


    @property
    def collaboration(self):
        """Idiomatic facade: client.collaboration.list() / client.collaboration.load({"id": ...})."""
        from entity.collaboration_entity import CollaborationEntity
        cached = getattr(self, "_collaboration", None)
        if cached is None:
            cached = CollaborationEntity(self, None)
            self._collaboration = cached
        return cached

    def Collaboration(self, data=None):
        # Deprecated: use client.collaboration instead.
        from entity.collaboration_entity import CollaborationEntity
        return CollaborationEntity(self, data)


    @property
    def collaborator(self):
        """Idiomatic facade: client.collaborator.list() / client.collaborator.load({"id": ...})."""
        from entity.collaborator_entity import CollaboratorEntity
        cached = getattr(self, "_collaborator", None)
        if cached is None:
            cached = CollaboratorEntity(self, None)
            self._collaborator = cached
        return cached

    def Collaborator(self, data=None):
        # Deprecated: use client.collaborator instead.
        from entity.collaborator_entity import CollaboratorEntity
        return CollaboratorEntity(self, data)


    @property
    def deployment(self):
        """Idiomatic facade: client.deployment.list() / client.deployment.load({"id": ...})."""
        from entity.deployment_entity import DeploymentEntity
        cached = getattr(self, "_deployment", None)
        if cached is None:
            cached = DeploymentEntity(self, None)
            self._deployment = cached
        return cached

    def Deployment(self, data=None):
        # Deprecated: use client.deployment instead.
        from entity.deployment_entity import DeploymentEntity
        return DeploymentEntity(self, data)


    @property
    def project(self):
        """Idiomatic facade: client.project.list() / client.project.load({"id": ...})."""
        from entity.project_entity import ProjectEntity
        cached = getattr(self, "_project", None)
        if cached is None:
            cached = ProjectEntity(self, None)
            self._project = cached
        return cached

    def Project(self, data=None):
        # Deprecated: use client.project instead.
        from entity.project_entity import ProjectEntity
        return ProjectEntity(self, data)


    @property
    def test(self):
        """Idiomatic facade: client.test.list() / client.test.load({"id": ...})."""
        from entity.test_entity import TestEntity
        cached = getattr(self, "_test", None)
        if cached is None:
            cached = TestEntity(self, None)
            self._test = cached
        return cached

    def Test(self, data=None):
        # Deprecated: use client.test instead.
        from entity.test_entity import TestEntity
        return TestEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk
