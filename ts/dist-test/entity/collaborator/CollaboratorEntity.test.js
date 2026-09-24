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
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CollaboratorEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GAME_DEVELOPMENT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GAME_DEVELOPMENT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GameDevelopmentSDK.test();
        const ent = testsdk.Collaborator();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GAME_DEVELOPMENT_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'collaborator.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "email": { "a": true, "fo": "email", "h": "Email", "n": "email", "r": true, "t": "`$STRING`", "key$": "email", "index$": 0 }, "role": { "a": true, "h": "Role", "n": "role", "r": true, "t": "`$STRING`", "key$": "role", "index$": 1 } }, "name": "collaborator", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /projects/{projectId}/collaborators", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/projects/{projectId}/collaborators", "q": { "exist": ["project_id"] }, "r": { "param": { "projectId": "project_id" } }, "s": [{ "lit": "projects" }, { "var": "project_id" }, { "lit": "collaborators" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.project"]] }, "key$": "collaborator", "name__orig": "collaborator", "Name": "Collaborator", "name_": "collaborator", "name-": "collaborator", "NAME": "COLLABORATOR", "index$": 4 }, { "active": true, "entity": "collaborator", "key$": "BasicCollaboratorFlow", "kind": "basic", "name": "BasicCollaboratorFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "collaborator_ref01" }, "m": { "project_id": "project01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'Collaborator', { "POST /projects/{projectId}/collaborators": { "protocol": "http", "operationId": "addCollaborator", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "email": { "type": "string", "format": "email", "key$": "email" }, "role": { "type": "string", "enum": ["owner", "editor", "viewer"], "key$": "role" } }, "required": ["email", "role"], "index$": 1 } } } }, "responses": { "201": { "description": "Collaborator added successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "string" }, "userId": { "type": "string" }, "email": { "format": "email", "type": "string" }, "name": { "type": "string" }, "role": { "enum": ["owner", "editor", "viewer"], "type": "string" }, "status": { "enum": ["active", "pending", "inactive"], "type": "string" }, "addedAt": { "format": "date-time", "type": "string" }, "lastActive": { "format": "date-time", "type": "string" } }, "x-ref": "#/components/schemas/Collaborator" } } } }, "400": { "description": "The request was malformed or contains invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string" }, "message": { "type": "string" }, "details": { "type": "array", "items": { "type": "object" } } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/BadRequestError" }, "401": { "description": "Authentication information is missing or invalid", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string" }, "message": { "type": "string" }, "details": { "type": "array", "items": { "type": "object" } } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/UnauthorizedError" } }, "parameters": [{ "name": "projectId", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }], "security": [{ "bearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "bearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const collaborator_ref01_ent = client.Collaborator();
        let collaborator_ref01_data = setup.data.new.collaborator['collaborator_ref01'];
        collaborator_ref01_data['project_id'] = setup.idmap['project01'];
        collaborator_ref01_data = (await collaborator_ref01_ent.create(collaborator_ref01_data)).data();
        (0, node_assert_1.default)(null != collaborator_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/collaborator/CollaboratorTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GameDevelopmentSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['collaborator01', 'collaborator02', 'collaborator03', 'project01', 'project02', 'project03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GAME_DEVELOPMENT_TEST_COLLABORATOR_ENTID': idmap,
        'GAME_DEVELOPMENT_TEST_LIVE': 'FALSE',
        'GAME_DEVELOPMENT_TEST_EXPLAIN': 'FALSE',
        'GAME_DEVELOPMENT_APIKEY': '',
    });
    idmap = env['GAME_DEVELOPMENT_TEST_COLLABORATOR_ENTID'];
    const live = 'TRUE' === env.GAME_DEVELOPMENT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GAME_DEVELOPMENT_TEST_COLLABORATOR_ENTID'];
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
//# sourceMappingURL=CollaboratorEntity.test.js.map