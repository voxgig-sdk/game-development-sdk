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
(0, node_test_1.describe)('ProjectEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GAME_DEVELOPMENT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GAME_DEVELOPMENT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GameDevelopmentSDK.test();
        const ent = testsdk.Project();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GAME_DEVELOPMENT_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'project.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "date-time", "name": "createdAt", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "description", "req": false, "short": "Detailed description of the project", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "id", "req": false, "short": "Unique identifier for the project", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "name", "op": { "create": { "req": true, "type": "`$STRING`" } }, "req": false, "short": "Name of the game project", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "owner", "req": false, "type": "`$OBJECT`", "index$": 4 }, { "active": true, "name": "settings", "req": false, "type": "`$OBJECT`", "index$": 5 }, { "active": true, "name": "status", "req": false, "short": "Current status of the project", "type": "`$STRING`", "index$": 6 }, { "active": true, "format": "date-time", "name": "updatedAt", "req": false, "type": "`$STRING`", "index$": 7 }], "id": { "field": "id", "name": "id" }, "name": "project", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /projects", "json": "{\"operationId\":\"createProject\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"description\":{\"maxLength\":2000,\"type\":\"string\"},\"name\":{\"maxLength\":255,\"minLength\":1,\"type\":\"string\"},\"settings\":{\"properties\":{\"gameEngine\":{\"type\":\"string\"},\"targetPlatforms\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}},\"required\":[\"name\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"createdAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"Detailed description of the project\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the project\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the game project\",\"type\":\"string\"},\"owner\":{\"properties\":{\"email\":{\"format\":\"email\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"settings\":{\"properties\":{\"gameEngine\":{\"type\":\"string\"},\"targetPlatforms\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"status\":{\"description\":\"Current status of the project\",\"enum\":[\"active\",\"archived\",\"in_development\",\"deployed\"],\"type\":\"string\"},\"updatedAt\":{\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Project created successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"The request was malformed or contains invalid parameters\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication information is missing or invalid\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/projects", "segments": [{ "lit": "projects" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 20, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "example": 0, "kind": "query", "name": "offset", "orig": "offset", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "kind": "query", "name": "status", "orig": "status", "reqd": false, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /projects", "json": "{\"operationId\":\"listProjects\",\"parameters\":[{\"description\":\"Maximum number of projects to return\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":20,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of projects to skip\",\"in\":\"query\",\"name\":\"offset\",\"schema\":{\"default\":0,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Filter projects by status\",\"in\":\"query\",\"name\":\"status\",\"schema\":{\"enum\":[\"active\",\"archived\",\"in_development\",\"deployed\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"limit\":{\"type\":\"integer\"},\"offset\":{\"type\":\"integer\"},\"projects\":{\"items\":{\"properties\":{\"createdAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"Detailed description of the project\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the project\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the game project\",\"type\":\"string\"},\"owner\":{\"properties\":{\"email\":{\"format\":\"email\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"settings\":{\"properties\":{\"gameEngine\":{\"type\":\"string\"},\"targetPlatforms\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"status\":{\"description\":\"Current status of the project\",\"enum\":[\"active\",\"archived\",\"in_development\",\"deployed\"],\"type\":\"string\"},\"updatedAt\":{\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication information is missing or invalid\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/projects", "segments": [{ "lit": "projects" }], "select": { "exist": ["limit", "offset", "status"] }, "transform": { "req": "`reqdata`", "res": "`body.projects`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "project_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /projects/{projectId}", "json": "{\"operationId\":\"getProject\",\"parameters\":[{\"description\":\"Unique identifier of the project\",\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"createdAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"Detailed description of the project\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the project\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the game project\",\"type\":\"string\"},\"owner\":{\"properties\":{\"email\":{\"format\":\"email\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"settings\":{\"properties\":{\"gameEngine\":{\"type\":\"string\"},\"targetPlatforms\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"status\":{\"description\":\"Current status of the project\",\"enum\":[\"active\",\"archived\",\"in_development\",\"deployed\"],\"type\":\"string\"},\"updatedAt\":{\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication information is missing or invalid\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"The requested resource was not found\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/projects/{projectId}", "rename": { "param": { "projectId": "id" } }, "segments": [{ "lit": "projects" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "project_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "DELETE /projects/{projectId}", "json": "{\"operationId\":\"deleteProject\",\"parameters\":[{\"description\":\"Unique identifier of the project\",\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"Project deleted successfully\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication information is missing or invalid\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"The requested resource was not found\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "DELETE", "orig": "/projects/{projectId}", "rename": { "param": { "projectId": "id" } }, "segments": [{ "lit": "projects" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "project_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "PUT /projects/{projectId}", "json": "{\"operationId\":\"updateProject\",\"parameters\":[{\"description\":\"Unique identifier of the project\",\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"description\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"settings\":{\"type\":\"object\"},\"status\":{\"enum\":[\"active\",\"archived\",\"in_development\",\"deployed\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"createdAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"Detailed description of the project\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the project\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the game project\",\"type\":\"string\"},\"owner\":{\"properties\":{\"email\":{\"format\":\"email\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"settings\":{\"properties\":{\"gameEngine\":{\"type\":\"string\"},\"targetPlatforms\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"status\":{\"description\":\"Current status of the project\",\"enum\":[\"active\",\"archived\",\"in_development\",\"deployed\"],\"type\":\"string\"},\"updatedAt\":{\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Project updated successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"The request was malformed or contains invalid parameters\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication information is missing or invalid\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"The requested resource was not found\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "PUT", "orig": "/projects/{projectId}", "rename": { "param": { "projectId": "id" } }, "segments": [{ "lit": "projects" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "project", "name__orig": "project", "Name": "Project", "name_": "project", "name-": "project", "NAME": "PROJECT", "index$": 6 }, { "active": true, "entity": "project", "key$": "BasicProjectFlow", "kind": "basic", "name": "BasicProjectFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "project_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "project_ref01" } }], "index$": 1 }, { "active": true, "data": {}, "input": { "ref": "project_ref01", "srcdatavar": "project_ref01_data", "suffix": "_up0", "textfield": "createdAt" }, "match": {}, "op": "update", "spec": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-project_ref01" } }], "valid": [], "index$": 2 }, { "active": true, "data": {}, "input": { "ref": "project_ref01", "srcdatavar": "project_ref01_data", "suffix": "_dt0" }, "match": { "id": "project01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-project_ref01" } }], "index$": 3 }, { "active": true, "data": {}, "input": { "ref": "project_ref01", "suffix": "_rm0" }, "match": { "id": "project01" }, "op": "remove", "spec": [], "valid": [], "index$": 4 }, { "active": true, "data": {}, "input": { "suffix": "_rt0" }, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemNotExists", "def": { "ref": "project_ref01" } }], "index$": 5 }] }, 'Project');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const project_ref01_ent = client.Project();
        let project_ref01_data = setup.data.new.project['project_ref01'];
        project_ref01_data = (await project_ref01_ent.create(project_ref01_data)).data();
        (0, node_assert_1.default)(null != project_ref01_data.id);
        // LIST
        const project_ref01_match = {};
        const project_ref01_list = (await project_ref01_ent.list(project_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(project_ref01_list, { id: project_ref01_data.id })));
        // UPDATE
        const project_ref01_data_up0 = {};
        project_ref01_data_up0.id = project_ref01_data.id;
        const project_ref01_markdef_up0 = { name: 'createdAt', value: 'Mark01-project_ref01_' + setup.now };
        project_ref01_data_up0[project_ref01_markdef_up0.name] = project_ref01_markdef_up0.value;
        const project_ref01_resdata_up0 = (await project_ref01_ent.update(project_ref01_data_up0)).data();
        (0, node_assert_1.default)(project_ref01_resdata_up0.id === project_ref01_data_up0.id);
        (0, node_assert_1.default)(project_ref01_resdata_up0[project_ref01_markdef_up0.name] === project_ref01_markdef_up0.value);
        // LOAD
        const project_ref01_match_dt0 = {};
        project_ref01_match_dt0.id = project_ref01_data.id;
        const project_ref01_data_dt0 = (await project_ref01_ent.load(project_ref01_match_dt0)).data();
        (0, node_assert_1.default)(project_ref01_data_dt0.id === project_ref01_data.id);
        // REMOVE
        const project_ref01_match_rm0 = { id: project_ref01_data.id };
        await project_ref01_ent.remove(project_ref01_match_rm0);
        // LIST
        const project_ref01_match_rt0 = {};
        const project_ref01_list_rt0 = (await project_ref01_ent.list(project_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(project_ref01_list_rt0, { id: project_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/project/ProjectTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GameDevelopmentSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['project01', 'project02', 'project03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GAME_DEVELOPMENT_TEST_PROJECT_ENTID': idmap,
        'GAME_DEVELOPMENT_TEST_LIVE': 'FALSE',
        'GAME_DEVELOPMENT_TEST_EXPLAIN': 'FALSE',
        'GAME_DEVELOPMENT_APIKEY': '',
    });
    idmap = env['GAME_DEVELOPMENT_TEST_PROJECT_ENTID'];
    const live = 'TRUE' === env.GAME_DEVELOPMENT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GAME_DEVELOPMENT_TEST_PROJECT_ENTID'];
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
//# sourceMappingURL=ProjectEntity.test.js.map