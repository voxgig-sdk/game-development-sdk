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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "createdAt": { "a": true, "fo": "date-time", "h": "Created At", "n": "createdAt", "r": false, "t": "`$STRING`", "key$": "createdAt", "index$": 0 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Detailed description of the project", "t": "`$STRING`", "key$": "description", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier for the project", "t": "`$STRING`", "key$": "id", "index$": 2 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Name of the game project", "t": "`$STRING`", "key$": "name", "index$": 3 }, "owner": { "a": true, "h": "Owner", "n": "owner", "r": false, "t": "`$OBJECT`", "key$": "owner", "index$": 4 }, "settings": { "a": true, "h": "Settings", "n": "settings", "r": false, "t": "`$OBJECT`", "key$": "settings", "index$": 5 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "Current status of the project", "t": "`$STRING`", "key$": "status", "index$": 6 }, "updatedAt": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updatedAt", "r": false, "t": "`$STRING`", "key$": "updatedAt", "index$": 7 } }, "id": { "field": "id", "name": "id" }, "name": "project", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /projects", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/projects", "q": {}, "r": {}, "s": [{ "lit": "projects" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /projects", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "status", "or": "status", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/projects", "q": { "exist": ["limit", "offset", "status"] }, "r": {}, "s": [{ "lit": "projects" }], "t": { "req": "`reqdata`", "res": "`body.projects`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /projects/{projectId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/projects/{projectId}", "q": { "exist": ["id"] }, "r": { "param": { "projectId": "id" } }, "s": [{ "lit": "projects" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /projects/{projectId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/projects/{projectId}", "q": { "exist": ["id"] }, "r": { "param": { "projectId": "id" } }, "s": [{ "lit": "projects" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /projects/{projectId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/projects/{projectId}", "q": { "exist": ["id"] }, "r": { "param": { "projectId": "id" } }, "s": [{ "lit": "projects" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "project", "name__orig": "project", "Name": "Project", "name_": "project", "name-": "project", "NAME": "PROJECT", "index$": 6 }, { "active": true, "entity": "project", "key$": "BasicProjectFlow", "kind": "basic", "name": "BasicProjectFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "project_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "project_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "project_ref01", "srcdatavar": "project_ref01_data", "suffix": "_up0", "textfield": "createdAt" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-project_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "project_ref01", "srcdatavar": "project_ref01_data", "suffix": "_dt0" }, "m": { "id": "project01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-project_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "project_ref01", "suffix": "_rm0" }, "m": { "id": "project01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "project_ref01" } }], "index$": 5 }] }, 'Project', { "POST /projects": { "protocol": "http", "operationId": "createProject", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["name"], "properties": { "name": { "type": "string", "minLength": 1, "maxLength": 255, "key$": "name" }, "description": { "type": "string", "maxLength": 2000, "key$": "description" }, "settings": { "type": "object", "properties": { "gameEngine": { "type": "string" }, "targetPlatforms": { "type": "array", "items": { "type": "string" } } }, "key$": "settings" } }, "x-ref": "#/components/schemas/ProjectCreate", "index$": 1 } } } }, "responses": { "201": { "description": "Project created successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "description": "Unique identifier for the project", "type": "string", "key$": "id" }, "name": { "description": "Name of the game project", "type": "string", "key$": "name" }, "description": { "description": "Detailed description of the project", "type": "string", "key$": "description" }, "status": { "description": "Current status of the project", "enum": ["active", "archived", "in_development", "deployed"], "type": "string", "key$": "status" }, "createdAt": { "format": "date-time", "type": "string", "key$": "createdAt" }, "updatedAt": { "format": "date-time", "type": "string", "key$": "updatedAt" }, "owner": { "properties": { "email": { "format": "email", "type": "string" }, "id": { "type": "string" }, "name": { "type": "string" } }, "type": "object", "key$": "owner" }, "settings": { "properties": { "gameEngine": { "type": "string" }, "targetPlatforms": { "items": { "type": "string" }, "type": "array" } }, "type": "object", "key$": "settings" } }, "x-ref": "#/components/schemas/Project" } } } }, "400": { "description": "The request was malformed or contains invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string" }, "message": { "type": "string" }, "details": { "type": "array", "items": { "type": "object" } } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/BadRequestError" }, "401": { "description": "Authentication information is missing or invalid", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string" }, "message": { "type": "string" }, "details": { "type": "array", "items": { "type": "object" } } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/UnauthorizedError" } }, "parameters": [], "security": [{ "bearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "bearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT" } } }, "GET /projects": { "protocol": "http", "operationId": "listProjects", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "projects": { "items": { "properties": { "createdAt": { "format": "date-time", "type": "string", "key$": "createdAt" }, "description": { "description": "Detailed description of the project", "type": "string", "key$": "description" }, "id": { "description": "Unique identifier for the project", "type": "string", "key$": "id" }, "name": { "description": "Name of the game project", "type": "string", "key$": "name" }, "owner": { "properties": { "email": { "format": "email", "type": "string" }, "id": { "type": "string" }, "name": { "type": "string" } }, "type": "object", "key$": "owner" }, "settings": { "properties": { "gameEngine": { "type": "string" }, "targetPlatforms": { "items": { "type": "string" }, "type": "array" } }, "type": "object", "key$": "settings" }, "status": { "description": "Current status of the project", "enum": ["active", "archived", "in_development", "deployed"], "type": "string", "key$": "status" }, "updatedAt": { "format": "date-time", "type": "string", "key$": "updatedAt" } }, "type": "object", "x-ref": "#/components/schemas/Project", "index$": 0 }, "key$": "projects", "type": "array" }, "total": { "key$": "total", "type": "integer" }, "limit": { "key$": "limit", "type": "integer" }, "offset": { "key$": "offset", "type": "integer" } } } } } }, "401": { "description": "Authentication information is missing or invalid", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string" }, "message": { "type": "string" }, "details": { "type": "array", "items": { "type": "object" } } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/UnauthorizedError" } }, "parameters": [{ "name": "limit", "in": "query", "description": "Maximum number of projects to return", "schema": { "type": "integer", "default": 20, "minimum": 1, "maximum": 100 }, "index$": 0 }, { "name": "offset", "in": "query", "description": "Number of projects to skip", "schema": { "type": "integer", "default": 0, "minimum": 0 }, "index$": 1 }, { "name": "status", "in": "query", "description": "Filter projects by status", "schema": { "type": "string", "enum": ["active", "archived", "in_development", "deployed"] }, "index$": 2 }], "security": [{ "bearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "bearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT" } } }, "GET /projects/{projectId}": { "protocol": "http", "operationId": "getProject", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "description": "Unique identifier for the project", "type": "string", "key$": "id" }, "name": { "description": "Name of the game project", "type": "string", "key$": "name" }, "description": { "description": "Detailed description of the project", "type": "string", "key$": "description" }, "status": { "description": "Current status of the project", "enum": ["active", "archived", "in_development", "deployed"], "type": "string", "key$": "status" }, "createdAt": { "format": "date-time", "type": "string", "key$": "createdAt" }, "updatedAt": { "format": "date-time", "type": "string", "key$": "updatedAt" }, "owner": { "properties": { "email": { "format": "email", "type": "string" }, "id": { "type": "string" }, "name": { "type": "string" } }, "type": "object", "key$": "owner" }, "settings": { "properties": { "gameEngine": { "type": "string" }, "targetPlatforms": { "items": { "type": "string" }, "type": "array" } }, "type": "object", "key$": "settings" } }, "x-ref": "#/components/schemas/Project", "index$": 0 } } } }, "401": { "description": "Authentication information is missing or invalid", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string" }, "message": { "type": "string" }, "details": { "type": "array", "items": { "type": "object" } } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/UnauthorizedError" }, "404": { "description": "The requested resource was not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string" }, "message": { "type": "string" }, "details": { "type": "array", "items": { "type": "object" } } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/NotFoundError" } }, "parameters": [{ "name": "projectId", "in": "path", "required": true, "description": "Unique identifier of the project", "schema": { "type": "string" }, "index$": 0 }], "security": [{ "bearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "bearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT" } } }, "DELETE /projects/{projectId}": { "protocol": "http", "operationId": "deleteProject", "responses": { "204": { "description": "Project deleted successfully" }, "401": { "description": "Authentication information is missing or invalid", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string" }, "message": { "type": "string" }, "details": { "type": "array", "items": { "type": "object" } } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/UnauthorizedError" }, "404": { "description": "The requested resource was not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string" }, "message": { "type": "string" }, "details": { "type": "array", "items": { "type": "object" } } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/NotFoundError" } }, "parameters": [{ "name": "projectId", "in": "path", "required": true, "description": "Unique identifier of the project", "schema": { "type": "string" }, "index$": 0 }], "security": [{ "bearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "bearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT" } } }, "PUT /projects/{projectId}": { "protocol": "http", "operationId": "updateProject", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "key$": "name" }, "description": { "type": "string", "key$": "description" }, "status": { "type": "string", "enum": ["active", "archived", "in_development", "deployed"], "key$": "status" }, "settings": { "type": "object", "key$": "settings" } }, "x-ref": "#/components/schemas/ProjectUpdate", "index$": 1 } } } }, "responses": { "200": { "description": "Project updated successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "description": "Unique identifier for the project", "type": "string", "key$": "id" }, "name": { "description": "Name of the game project", "type": "string", "key$": "name" }, "description": { "description": "Detailed description of the project", "type": "string", "key$": "description" }, "status": { "description": "Current status of the project", "enum": ["active", "archived", "in_development", "deployed"], "type": "string", "key$": "status" }, "createdAt": { "format": "date-time", "type": "string", "key$": "createdAt" }, "updatedAt": { "format": "date-time", "type": "string", "key$": "updatedAt" }, "owner": { "properties": { "email": { "format": "email", "type": "string" }, "id": { "type": "string" }, "name": { "type": "string" } }, "type": "object", "key$": "owner" }, "settings": { "properties": { "gameEngine": { "type": "string" }, "targetPlatforms": { "items": { "type": "string" }, "type": "array" } }, "type": "object", "key$": "settings" } }, "x-ref": "#/components/schemas/Project", "index$": 0 } } } }, "400": { "description": "The request was malformed or contains invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string" }, "message": { "type": "string" }, "details": { "type": "array", "items": { "type": "object" } } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/BadRequestError" }, "401": { "description": "Authentication information is missing or invalid", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string" }, "message": { "type": "string" }, "details": { "type": "array", "items": { "type": "object" } } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/UnauthorizedError" }, "404": { "description": "The requested resource was not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "code": { "type": "string" }, "message": { "type": "string" }, "details": { "type": "array", "items": { "type": "object" } } } } }, "x-ref": "#/components/schemas/Error" } } }, "x-ref": "#/components/responses/NotFoundError" } }, "parameters": [{ "name": "projectId", "in": "path", "required": true, "description": "Unique identifier of the project", "schema": { "type": "string" }, "index$": 0 }], "security": [{ "bearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "bearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT" } } } });
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