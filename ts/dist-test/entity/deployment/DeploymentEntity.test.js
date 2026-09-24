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
(0, node_test_1.describe)('DeploymentEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GAME_DEVELOPMENT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GAME_DEVELOPMENT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GameDevelopmentSDK.test();
        const ent = testsdk.Deployment();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GAME_DEVELOPMENT_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'deployment.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "buildVersion": { "a": true, "h": "Build Version", "n": "buildVersion", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "t": "`$STRING`", "key$": "buildVersion", "index$": 0 }, "completedAt": { "a": true, "fo": "date-time", "h": "Completed At", "n": "completedAt", "r": false, "t": "`$STRING`", "key$": "completedAt", "index$": 1 }, "configuration": { "a": true, "h": "Configuration", "n": "configuration", "r": false, "t": "`$STRING`", "key$": "configuration", "index$": 2 }, "createdAt": { "a": true, "fo": "date-time", "h": "Created At", "n": "createdAt", "r": false, "t": "`$STRING`", "key$": "createdAt", "index$": 3 }, "deploymentUrl": { "a": true, "fo": "uri", "h": "Deployment Url", "n": "deploymentUrl", "r": false, "t": "`$STRING`", "key$": "deploymentUrl", "index$": 4 }, "downloadUrl": { "a": true, "fo": "uri", "h": "Download Url", "n": "downloadUrl", "r": false, "t": "`$STRING`", "key$": "downloadUrl", "index$": 5 }, "environment": { "a": true, "h": "Environment", "n": "environment", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "t": "`$STRING`", "key$": "environment", "index$": 6 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 7 }, "platform": { "a": true, "h": "Platform", "n": "platform", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "t": "`$STRING`", "key$": "platform", "index$": 8 }, "projectId": { "a": true, "h": "Project Id", "n": "projectId", "r": false, "t": "`$STRING`", "key$": "projectId", "index$": 9 }, "releaseNotes": { "a": true, "h": "Release Notes", "n": "releaseNotes", "r": false, "t": "`$STRING`", "key$": "releaseNotes", "index$": 10 }, "size": { "a": true, "h": "Size", "n": "size", "r": false, "sh": "Build size in bytes", "t": "`$INTEGER`", "key$": "size", "index$": 11 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "t": "`$STRING`", "key$": "status", "index$": 12 }, "version": { "a": true, "h": "Version", "n": "version", "r": false, "t": "`$STRING`", "key$": "version", "index$": 13 } }, "id": { "field": "id", "name": "id" }, "name": "deployment", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /projects/{projectId}/deployments", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/projects/{projectId}/deployments", "q": { "exist": ["project_id"] }, "r": { "param": { "projectId": "project_id" } }, "s": [{ "lit": "projects" }, { "var": "project_id" }, { "lit": "deployments" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /projects/{projectId}/deployments", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "status", "or": "status", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/projects/{projectId}/deployments", "q": { "exist": ["project_id", "status"] }, "r": { "param": { "projectId": "project_id" } }, "s": [{ "lit": "projects" }, { "var": "project_id" }, { "lit": "deployments" }], "t": { "req": "`reqdata`", "res": "`body.deployments`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /projects/{projectId}/builds", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/projects/{projectId}/builds", "q": { "exist": ["project_id"] }, "r": { "param": { "projectId": "project_id" } }, "s": [{ "lit": "projects" }, { "var": "project_id" }, { "lit": "builds" }], "t": { "req": "`reqdata`", "res": "`body.builds`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /projects/{projectId}/deployments/{deploymentId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "deployment_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/projects/{projectId}/deployments/{deploymentId}", "q": { "exist": ["id", "project_id"] }, "r": { "param": { "deploymentId": "id", "projectId": "project_id" } }, "s": [{ "lit": "projects" }, { "var": "project_id" }, { "lit": "deployments" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.project"]] }, "key$": "deployment", "name__orig": "deployment", "Name": "Deployment", "name_": "deployment", "name-": "deployment", "NAME": "DEPLOYMENT", "index$": 5 }, { "active": true, "entity": "deployment", "key$": "BasicDeploymentFlow", "kind": "basic", "name": "BasicDeploymentFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "deployment_ref01" }, "m": { "project_id": "project01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "project_id": "project01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "deployment_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "deployment_ref01", "srcdatavar": "deployment_ref01_data", "suffix": "_dt0" }, "m": { "id": "deployment01", "project_id": "project01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-deployment_ref01" } }], "index$": 2 }] }, 'Deployment', { "POST /projects/{projectId}/deployments": { "protocol": "http", "operationId": "createDeployment", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "environment": { "type": "string", "enum": ["development", "staging", "production"], "key$": "environment" }, "platform": { "type": "string", "enum": ["windows", "macos", "linux", "android", "ios", "web", "console"], "key$": "platform" }, "buildVersion": { "type": "string", "key$": "buildVersion" }, "releaseNotes": { "type": "string", "key$": "releaseNotes" } }, "required": ["environment", "platform", "buildVersion"], "index$": 1 } } } }, "responses": { "201": { "description": "Deployment created successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "string", "key$": "id" }, "projectId": { "type": "string", "key$": "projectId" }, "environment": { "enum": ["development", "staging", "production"], "type": "string", "key$": "environment" }, "platform": { "enum": ["windows", "macos", "linux", "android", "ios", "web", "console"], "type": "string", "key$": "platform" }, "buildVersion": { "type": "string", "key$": "buildVersion" }, "status": { "enum": ["pending", "building", "deploying", "success", "failed", "cancelled"], "type": "string", "key$": "status" }, "releaseNotes": { "type": "string", "key$": "releaseNotes" }, "deploymentUrl": { "format": "uri", "type": "string", "key$": "deploymentUrl" }, "createdAt": { "format": "date-time", "type": "string", "key$": "createdAt" }, "completedAt": { "format": "date-time", "type": "string", "key$": "completedAt" } }, "x-ref": "#/components/schemas/Deployment" } } } }, "400": { "description": "The request was malformed or contains invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string" }, "message": { "type": "string" }, "details": { "type": "array", "items": { "type": "object" } } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/BadRequestError" }, "401": { "description": "Authentication information is missing or invalid", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string" }, "message": { "type": "string" }, "details": { "type": "array", "items": { "type": "object" } } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/UnauthorizedError" } }, "parameters": [{ "name": "projectId", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }], "security": [{ "bearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "bearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT" } } }, "GET /projects/{projectId}/deployments": { "protocol": "http", "operationId": "listDeployments", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "deployments": { "items": { "properties": { "buildVersion": { "type": "string", "key$": "buildVersion" }, "completedAt": { "format": "date-time", "type": "string", "key$": "completedAt" }, "createdAt": { "format": "date-time", "type": "string", "key$": "createdAt" }, "deploymentUrl": { "format": "uri", "type": "string", "key$": "deploymentUrl" }, "environment": { "enum": ["development", "staging", "production"], "type": "string", "key$": "environment" }, "id": { "type": "string", "key$": "id" }, "platform": { "enum": ["windows", "macos", "linux", "android", "ios", "web", "console"], "type": "string", "key$": "platform" }, "projectId": { "type": "string", "key$": "projectId" }, "releaseNotes": { "type": "string", "key$": "releaseNotes" }, "status": { "enum": ["pending", "building", "deploying", "success", "failed", "cancelled"], "type": "string", "key$": "status" } }, "type": "object", "x-ref": "#/components/schemas/Deployment", "index$": 0 }, "key$": "deployments", "type": "array" } } } } } }, "401": { "description": "Authentication information is missing or invalid", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string" }, "message": { "type": "string" }, "details": { "type": "array", "items": { "type": "object" } } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/UnauthorizedError" } }, "parameters": [{ "name": "projectId", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "status", "in": "query", "schema": { "type": "string", "enum": ["pending", "building", "deploying", "success", "failed", "cancelled"] }, "index$": 1 }], "security": [{ "bearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "bearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT" } } }, "GET /projects/{projectId}/builds": { "protocol": "http", "operationId": "listBuilds", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "builds": { "items": { "properties": { "completedAt": { "format": "date-time", "type": "string", "key$": "completedAt" }, "configuration": { "enum": ["debug", "release"], "type": "string", "key$": "configuration" }, "createdAt": { "format": "date-time", "type": "string", "key$": "createdAt" }, "downloadUrl": { "format": "uri", "type": "string", "key$": "downloadUrl" }, "id": { "type": "string", "key$": "id" }, "platform": { "enum": ["windows", "macos", "linux", "android", "ios", "web", "console"], "type": "string", "key$": "platform" }, "projectId": { "type": "string", "key$": "projectId" }, "size": { "description": "Build size in bytes", "type": "integer", "key$": "size" }, "status": { "enum": ["pending", "building", "success", "failed"], "type": "string", "key$": "status" }, "version": { "type": "string", "key$": "version" } }, "type": "object", "x-ref": "#/components/schemas/Build", "index$": 0 }, "key$": "builds", "type": "array" } } } } } }, "401": { "description": "Authentication information is missing or invalid", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string" }, "message": { "type": "string" }, "details": { "type": "array", "items": { "type": "object" } } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/UnauthorizedError" } }, "parameters": [{ "name": "projectId", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }], "security": [{ "bearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "bearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT" } } }, "GET /projects/{projectId}/deployments/{deploymentId}": { "protocol": "http", "operationId": "getDeployment", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "string", "key$": "id" }, "projectId": { "type": "string", "key$": "projectId" }, "environment": { "enum": ["development", "staging", "production"], "type": "string", "key$": "environment" }, "platform": { "enum": ["windows", "macos", "linux", "android", "ios", "web", "console"], "type": "string", "key$": "platform" }, "buildVersion": { "type": "string", "key$": "buildVersion" }, "status": { "enum": ["pending", "building", "deploying", "success", "failed", "cancelled"], "type": "string", "key$": "status" }, "releaseNotes": { "type": "string", "key$": "releaseNotes" }, "deploymentUrl": { "format": "uri", "type": "string", "key$": "deploymentUrl" }, "createdAt": { "format": "date-time", "type": "string", "key$": "createdAt" }, "completedAt": { "format": "date-time", "type": "string", "key$": "completedAt" } }, "x-ref": "#/components/schemas/Deployment", "index$": 0 } } } }, "401": { "description": "Authentication information is missing or invalid", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string" }, "message": { "type": "string" }, "details": { "type": "array", "items": { "type": "object" } } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/UnauthorizedError" }, "404": { "description": "The requested resource was not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string" }, "message": { "type": "string" }, "details": { "type": "array", "items": { "type": "object" } } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/NotFoundError" } }, "parameters": [{ "name": "projectId", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "deploymentId", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }], "security": [{ "bearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "bearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const deployment_ref01_ent = client.Deployment();
        let deployment_ref01_data = setup.data.new.deployment['deployment_ref01'];
        deployment_ref01_data['project_id'] = setup.idmap['project01'];
        deployment_ref01_data = (await deployment_ref01_ent.create(deployment_ref01_data)).data();
        (0, node_assert_1.default)(null != deployment_ref01_data.id);
        // LIST
        const deployment_ref01_match = {};
        deployment_ref01_match['project_id'] = setup.idmap['project01'];
        const deployment_ref01_list = (await deployment_ref01_ent.list(deployment_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(deployment_ref01_list, { id: deployment_ref01_data.id })));
        // LOAD
        const deployment_ref01_match_dt0 = {};
        deployment_ref01_match_dt0.id = deployment_ref01_data.id;
        const deployment_ref01_data_dt0 = (await deployment_ref01_ent.load(deployment_ref01_match_dt0)).data();
        (0, node_assert_1.default)(deployment_ref01_data_dt0.id === deployment_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/deployment/DeploymentTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GameDevelopmentSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['deployment01', 'deployment02', 'deployment03', 'project01', 'project02', 'project03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GAME_DEVELOPMENT_TEST_DEPLOYMENT_ENTID': idmap,
        'GAME_DEVELOPMENT_TEST_LIVE': 'FALSE',
        'GAME_DEVELOPMENT_TEST_EXPLAIN': 'FALSE',
        'GAME_DEVELOPMENT_APIKEY': '',
    });
    idmap = env['GAME_DEVELOPMENT_TEST_DEPLOYMENT_ENTID'];
    const live = 'TRUE' === env.GAME_DEVELOPMENT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GAME_DEVELOPMENT_TEST_DEPLOYMENT_ENTID'];
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
//# sourceMappingURL=DeploymentEntity.test.js.map