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
(0, node_test_1.describe)('CollaborationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GAME_DEVELOPMENT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GAME_DEVELOPMENT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GameDevelopmentSDK.test();
        const ent = testsdk.Collaboration();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GAME_DEVELOPMENT_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'collaboration.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "date-time", "name": "addedAt", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "format": "email", "name": "email", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "format": "date-time", "name": "lastActive", "req": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "name", "req": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "role", "req": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "status", "req": false, "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "userId", "req": false, "type": "`$STRING`", "index$": 7 }], "id": { "field": "id", "name": "id" }, "name": "collaboration", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "project_id", "orig": "project_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /projects/{projectId}/collaborators", "json": "{\"operationId\":\"listCollaborators\",\"parameters\":[{\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"collaborators\":{\"items\":{\"properties\":{\"addedAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"format\":\"email\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"lastActive\":{\"format\":\"date-time\",\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"role\":{\"enum\":[\"owner\",\"editor\",\"viewer\"],\"type\":\"string\"},\"status\":{\"enum\":[\"active\",\"pending\",\"inactive\"],\"type\":\"string\"},\"userId\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication information is missing or invalid\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/projects/{projectId}/collaborators", "rename": { "param": { "projectId": "project_id" } }, "segments": [{ "lit": "projects" }, { "var": "project_id" }, { "lit": "collaborators" }], "select": { "exist": ["project_id"] }, "transform": { "req": "`reqdata`", "res": "`body.collaborators`" }, "index$": 0 }], "key$": "list" }, "remove": { "input": "data", "name": "remove", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "project_id", "orig": "project_id", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "param", "name": "user_id", "orig": "user_id", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "DELETE /projects/{projectId}/collaborators/{userId}", "json": "{\"operationId\":\"removeCollaborator\",\"parameters\":[{\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"userId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"Collaborator removed successfully\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication information is missing or invalid\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"The requested resource was not found\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "DELETE", "orig": "/projects/{projectId}/collaborators/{userId}", "rename": { "param": { "projectId": "project_id", "userId": "user_id" } }, "segments": [{ "lit": "projects" }, { "var": "project_id" }, { "lit": "collaborators" }, { "var": "user_id" }], "select": { "exist": ["project_id", "user_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["project"], ["project", "collaborator"]] }, "key$": "collaboration", "name__orig": "collaboration", "Name": "Collaboration", "name_": "collaboration", "name-": "collaboration", "NAME": "COLLABORATION", "index$": 3 }, { "active": true, "entity": "collaboration", "key$": "BasicCollaborationFlow", "kind": "basic", "name": "BasicCollaborationFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": { "project_id": "project01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "collaboration_ref01" } }], "index$": 0 }] }, 'Collaboration');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let collaboration_ref01_data = Object.values(setup.data.existing.collaboration)[0];
        // LIST
        const collaboration_ref01_ent = client.Collaboration();
        const collaboration_ref01_match = {};
        collaboration_ref01_match['project_id'] = setup.idmap['project01'];
        const collaboration_ref01_list = (await collaboration_ref01_ent.list(collaboration_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/collaboration/CollaborationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GameDevelopmentSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['collaboration01', 'collaboration02', 'collaboration03', 'project01', 'project02', 'project03', 'project01', 'project02', 'project03', 'collaborator01', 'collaborator02', 'collaborator03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GAME_DEVELOPMENT_TEST_COLLABORATION_ENTID': idmap,
        'GAME_DEVELOPMENT_TEST_LIVE': 'FALSE',
        'GAME_DEVELOPMENT_TEST_EXPLAIN': 'FALSE',
        'GAME_DEVELOPMENT_APIKEY': '',
    });
    idmap = env['GAME_DEVELOPMENT_TEST_COLLABORATION_ENTID'];
    const live = 'TRUE' === env.GAME_DEVELOPMENT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GAME_DEVELOPMENT_TEST_COLLABORATION_ENTID'];
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
//# sourceMappingURL=CollaborationEntity.test.js.map