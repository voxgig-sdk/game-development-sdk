"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('AssetEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GAME_DEVELOPMENT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GAME_DEVELOPMENT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GameDevelopmentSDK.test();
        const ent = testsdk.Asset();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GAME_DEVELOPMENT_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'asset.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "date-time", "name": "createdAt", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "mimeType", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "name", "req": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "projectId", "req": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "size", "req": false, "short": "File size in bytes", "type": "`$INTEGER`", "index$": 5 }, { "active": true, "name": "tags", "req": false, "type": "`$ARRAY`", "index$": 6 }, { "active": true, "name": "type", "req": false, "type": "`$STRING`", "index$": 7 }, { "active": true, "format": "date-time", "name": "updatedAt", "req": false, "type": "`$STRING`", "index$": 8 }, { "active": true, "format": "uri", "name": "url", "req": false, "type": "`$STRING`", "index$": 9 }], "id": { "field": "id", "name": "id" }, "name": "asset", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "project_id", "orig": "project_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "POST /projects/{projectId}/assets", "json": "{\"operationId\":\"uploadAsset\",\"parameters\":[{\"description\":\"Unique identifier of the project\",\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"multipart/form-data\":{\"schema\":{\"properties\":{\"file\":{\"description\":\"Asset file to upload\",\"format\":\"binary\",\"type\":\"string\"},\"name\":{\"description\":\"Display name for the asset\",\"type\":\"string\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"type\":{\"enum\":[\"image\",\"audio\",\"video\",\"model\",\"texture\",\"script\",\"font\",\"config\"],\"type\":\"string\"}},\"required\":[\"file\",\"type\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"createdAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"mimeType\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"projectId\":{\"type\":\"string\"},\"size\":{\"description\":\"File size in bytes\",\"type\":\"integer\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"type\":{\"enum\":[\"image\",\"audio\",\"video\",\"model\",\"texture\",\"script\",\"font\",\"config\"],\"type\":\"string\"},\"updatedAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Asset uploaded successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"The request was malformed or contains invalid parameters\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication information is missing or invalid\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/projects/{projectId}/assets", "rename": { "param": { "projectId": "project_id" } }, "segments": [{ "lit": "projects" }, { "var": "project_id" }, { "lit": "assets" }], "select": { "exist": ["project_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "project_id", "orig": "project_id", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "example": 50, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "kind": "query", "name": "type", "orig": "type", "reqd": false, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /projects/{projectId}/assets", "json": "{\"operationId\":\"listAssets\",\"parameters\":[{\"description\":\"Unique identifier of the project\",\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter assets by type\",\"in\":\"query\",\"name\":\"type\",\"schema\":{\"enum\":[\"image\",\"audio\",\"video\",\"model\",\"texture\",\"script\",\"font\",\"config\"],\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":50,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"assets\":{\"items\":{\"properties\":{\"createdAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"mimeType\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"projectId\":{\"type\":\"string\"},\"size\":{\"description\":\"File size in bytes\",\"type\":\"integer\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"type\":{\"enum\":[\"image\",\"audio\",\"video\",\"model\",\"texture\",\"script\",\"font\",\"config\"],\"type\":\"string\"},\"updatedAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication information is missing or invalid\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/projects/{projectId}/assets", "rename": { "param": { "projectId": "project_id" } }, "segments": [{ "lit": "projects" }, { "var": "project_id" }, { "lit": "assets" }], "select": { "exist": ["limit", "project_id", "type"] }, "transform": { "req": "`reqdata`", "res": "`body.assets`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "asset_id", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "param", "name": "project_id", "orig": "project_id", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /projects/{projectId}/assets/{assetId}", "json": "{\"operationId\":\"getAsset\",\"parameters\":[{\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"assetId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"createdAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"mimeType\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"projectId\":{\"type\":\"string\"},\"size\":{\"description\":\"File size in bytes\",\"type\":\"integer\"},\"tags\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"type\":{\"enum\":[\"image\",\"audio\",\"video\",\"model\",\"texture\",\"script\",\"font\",\"config\"],\"type\":\"string\"},\"updatedAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication information is missing or invalid\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"The requested resource was not found\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/projects/{projectId}/assets/{assetId}", "rename": { "param": { "assetId": "id", "projectId": "project_id" } }, "segments": [{ "lit": "projects" }, { "var": "project_id" }, { "lit": "assets" }, { "var": "id" }], "select": { "exist": ["id", "project_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "asset_id", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "param", "name": "project_id", "orig": "project_id", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "DELETE /projects/{projectId}/assets/{assetId}", "json": "{\"operationId\":\"deleteAsset\",\"parameters\":[{\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"assetId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"Asset deleted successfully\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication information is missing or invalid\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"The requested resource was not found\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "DELETE", "orig": "/projects/{projectId}/assets/{assetId}", "rename": { "param": { "assetId": "id", "projectId": "project_id" } }, "segments": [{ "lit": "projects" }, { "var": "project_id" }, { "lit": "assets" }, { "var": "id" }], "select": { "exist": ["id", "project_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["project"]] }, "key$": "asset", "name__orig": "asset", "Name": "Asset", "name_": "asset", "name-": "asset", "NAME": "ASSET", "index$": 1 }, { "active": true, "entity": "asset", "key$": "BasicAssetFlow", "kind": "basic", "name": "BasicAssetFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "asset_ref01" }, "match": { "project_id": "project01" }, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": {}, "match": { "project_id": "project01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "asset_ref01" } }], "index$": 1 }, { "active": true, "data": {}, "input": { "ref": "asset_ref01", "srcdatavar": "asset_ref01_data", "suffix": "_dt0" }, "match": { "id": "asset01", "project_id": "project01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-asset_ref01" } }], "index$": 2 }, { "active": true, "data": {}, "input": { "ref": "asset_ref01", "suffix": "_rm0" }, "match": { "id": "asset01", "project_id": "project01" }, "op": "remove", "spec": [], "valid": [], "index$": 3 }, { "active": true, "data": {}, "input": { "suffix": "_rt0" }, "match": { "project_id": "project01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemNotExists", "def": { "ref": "asset_ref01" } }], "index$": 4 }] }, 'Asset');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const asset_ref01_ent = client.Asset();
        let asset_ref01_data = setup.data.new.asset['asset_ref01'];
        asset_ref01_data['project_id'] = setup.idmap['project01'];
        asset_ref01_data = (await asset_ref01_ent.create(asset_ref01_data)).data();
        (0, node_assert_1.default)(null != asset_ref01_data.id);
        // LIST
        const asset_ref01_match = {};
        asset_ref01_match['project_id'] = setup.idmap['project01'];
        const asset_ref01_list = (await asset_ref01_ent.list(asset_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(asset_ref01_list, { id: asset_ref01_data.id })));
        // LOAD
        const asset_ref01_match_dt0 = {};
        asset_ref01_match_dt0.id = asset_ref01_data.id;
        const asset_ref01_data_dt0 = (await asset_ref01_ent.load(asset_ref01_match_dt0)).data();
        (0, node_assert_1.default)(asset_ref01_data_dt0.id === asset_ref01_data.id);
        // REMOVE
        const asset_ref01_match_rm0 = { id: asset_ref01_data.id };
        await asset_ref01_ent.remove(asset_ref01_match_rm0);
        // LIST
        const asset_ref01_match_rt0 = {};
        asset_ref01_match_rt0['project_id'] = setup.idmap['project01'];
        const asset_ref01_list_rt0 = (await asset_ref01_ent.list(asset_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(asset_ref01_list_rt0, { id: asset_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/asset/AssetTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GameDevelopmentSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['asset01', 'asset02', 'asset03', 'project01', 'project02', 'project03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GAME_DEVELOPMENT_TEST_ASSET_ENTID': idmap,
        'GAME_DEVELOPMENT_TEST_LIVE': 'FALSE',
        'GAME_DEVELOPMENT_TEST_EXPLAIN': 'FALSE',
        'GAME_DEVELOPMENT_APIKEY': '',
    });
    idmap = env['GAME_DEVELOPMENT_TEST_ASSET_ENTID'];
    const live = 'TRUE' === env.GAME_DEVELOPMENT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GAME_DEVELOPMENT_TEST_ASSET_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.GameDevelopmentSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.GAME_DEVELOPMENT_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.GAME_DEVELOPMENT_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=AssetEntity.test.js.map