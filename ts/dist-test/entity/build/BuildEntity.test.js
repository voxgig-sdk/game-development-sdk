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
(0, node_test_1.describe)('BuildEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GAME_DEVELOPMENT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GAME_DEVELOPMENT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GameDevelopmentSDK.test();
        const ent = testsdk.Build();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GAME_DEVELOPMENT_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'build.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "configuration": { "a": true, "h": "Configuration", "n": "configuration", "r": true, "t": "`$STRING`", "key$": "configuration", "index$": 0 }, "platform": { "a": true, "h": "Platform", "n": "platform", "r": true, "t": "`$STRING`", "key$": "platform", "index$": 1 }, "version": { "a": true, "h": "Version", "n": "version", "r": true, "t": "`$STRING`", "key$": "version", "index$": 2 } }, "name": "build", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /projects/{projectId}/builds", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/projects/{projectId}/builds", "q": { "exist": ["project_id"] }, "r": { "param": { "projectId": "project_id" } }, "s": [{ "lit": "projects" }, { "var": "project_id" }, { "lit": "builds" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.project"]] }, "key$": "build", "name__orig": "build", "Name": "Build", "name_": "build", "name-": "build", "NAME": "BUILD", "index$": 2 }, { "active": true, "entity": "build", "key$": "BasicBuildFlow", "kind": "basic", "name": "BasicBuildFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "build_ref01" }, "m": { "project_id": "project01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'Build', { "POST /projects/{projectId}/builds": { "protocol": "http", "operationId": "createBuild", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "version": { "type": "string", "key$": "version" }, "platform": { "type": "string", "enum": ["windows", "macos", "linux", "android", "ios", "web", "console"], "key$": "platform" }, "configuration": { "type": "string", "enum": ["debug", "release"], "key$": "configuration" } }, "required": ["version", "platform", "configuration"], "index$": 1 } } } }, "responses": { "201": { "description": "Build created successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "string" }, "projectId": { "type": "string" }, "version": { "type": "string" }, "platform": { "enum": ["windows", "macos", "linux", "android", "ios", "web", "console"], "type": "string" }, "configuration": { "enum": ["debug", "release"], "type": "string" }, "status": { "enum": ["pending", "building", "success", "failed"], "type": "string" }, "size": { "description": "Build size in bytes", "type": "integer" }, "downloadUrl": { "format": "uri", "type": "string" }, "createdAt": { "format": "date-time", "type": "string" }, "completedAt": { "format": "date-time", "type": "string" } }, "x-ref": "#/components/schemas/Build" } } } }, "400": { "description": "The request was malformed or contains invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string" }, "message": { "type": "string" }, "details": { "type": "array", "items": { "type": "object" } } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/BadRequestError" }, "401": { "description": "Authentication information is missing or invalid", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string" }, "message": { "type": "string" }, "details": { "type": "array", "items": { "type": "object" } } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/UnauthorizedError" } }, "parameters": [{ "name": "projectId", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }], "security": [{ "bearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "bearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const build_ref01_ent = client.Build();
        let build_ref01_data = setup.data.new.build['build_ref01'];
        build_ref01_data['project_id'] = setup.idmap['project01'];
        build_ref01_data = (await build_ref01_ent.create(build_ref01_data)).data();
        (0, node_assert_1.default)(null != build_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/build/BuildTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GameDevelopmentSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['build01', 'build02', 'build03', 'project01', 'project02', 'project03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GAME_DEVELOPMENT_TEST_BUILD_ENTID': idmap,
        'GAME_DEVELOPMENT_TEST_LIVE': 'FALSE',
        'GAME_DEVELOPMENT_TEST_EXPLAIN': 'FALSE',
        'GAME_DEVELOPMENT_APIKEY': '',
    });
    idmap = env['GAME_DEVELOPMENT_TEST_BUILD_ENTID'];
    const live = 'TRUE' === env.GAME_DEVELOPMENT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GAME_DEVELOPMENT_TEST_BUILD_ENTID'];
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
//# sourceMappingURL=BuildEntity.test.js.map