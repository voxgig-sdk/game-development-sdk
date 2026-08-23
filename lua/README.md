# GameDevelopment Lua SDK



The Lua SDK for the GameDevelopment API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Analytics()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/game-development-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("game-development_sdk")

local client = sdk.new({
  apikey = os.getenv("GAME_DEVELOPMENT_APIKEY"),
})
```

### 2. List analytics records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local analyticss, err = client:Analytics():list()
if err then error(err) end

for _, item in ipairs(analyticss) do
  print(item["eventName"])
end
```

### 3. Load an asset

Asset is nested under project, so provide the `project_id`.

```lua
local asset, err = client:Asset():load({ project_id = "example_project_id", id = "example_id" })
if err then error(err) end
print(asset)
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:Analytics():create({ project_id = "example_project_id", eventName = "example_eventName", eventType = "example_eventType" })
if err then error(err) end

```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local projects, err = client:Project():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Project():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
GAME_DEVELOPMENT_TEST_LIVE=TRUE
GAME_DEVELOPMENT_APIKEY=<your-key>
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### GameDevelopmentSDK

```lua
local sdk = require("game-development_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### GameDevelopmentSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Analytics` | `(data) -> AnalyticsEntity` | Create an Analytics entity instance. |
| `Asset` | `(data) -> AssetEntity` | Create an Asset entity instance. |
| `Build` | `(data) -> BuildEntity` | Create a Build entity instance. |
| `Collaboration` | `(data) -> CollaborationEntity` | Create a Collaboration entity instance. |
| `Collaborator` | `(data) -> CollaboratorEntity` | Create a Collaborator entity instance. |
| `Deployment` | `(data) -> DeploymentEntity` | Create a Deployment entity instance. |
| `Project` | `(data) -> ProjectEntity` | Create a Project entity instance. |
| `Test` | `(data) -> TestEntity` | Create a Test entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `remove` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local asset, err = client:Asset():load({ id = "example_id" })
    if err then error(err) end
    -- asset is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Analytics

| Field | Description |
| --- | --- |
| `count` |  |
| `eventName` |  |
| `eventType` |  |
| `name` |  |
| `properties` |  |
| `timestamp` |  |

Operations: Create, List.

API path: `/projects/{projectId}/analytics/events`

#### Asset

| Field | Description |
| --- | --- |
| `createdAt` |  |
| `id` |  |
| `mimeType` |  |
| `name` |  |
| `projectId` |  |
| `size` | File size in bytes |
| `tags` |  |
| `type` |  |
| `updatedAt` |  |
| `url` |  |

Operations: Create, List, Load, Remove.

API path: `/projects/{projectId}/assets`

#### Build

| Field | Description |
| --- | --- |
| `configuration` |  |
| `platform` |  |
| `version` |  |

Operations: Create.

API path: `/projects/{projectId}/builds`

#### Collaboration

| Field | Description |
| --- | --- |
| `addedAt` |  |
| `email` |  |
| `id` |  |
| `lastActive` |  |
| `name` |  |
| `role` |  |
| `status` |  |
| `userId` |  |

Operations: List, Remove.

API path: `/projects/{projectId}/collaborators`

#### Collaborator

| Field | Description |
| --- | --- |
| `email` |  |
| `role` |  |

Operations: Create.

API path: `/projects/{projectId}/collaborators`

#### Deployment

| Field | Description |
| --- | --- |
| `buildVersion` |  |
| `completedAt` |  |
| `configuration` |  |
| `createdAt` |  |
| `deploymentUrl` |  |
| `downloadUrl` |  |
| `environment` |  |
| `id` |  |
| `platform` |  |
| `projectId` |  |
| `releaseNotes` |  |
| `size` | Build size in bytes |
| `status` |  |
| `version` |  |

Operations: Create, List, Load.

API path: `/projects/{projectId}/deployments`

#### Project

| Field | Description |
| --- | --- |
| `createdAt` |  |
| `description` | Detailed description of the project |
| `id` | Unique identifier for the project |
| `name` | Name of the game project |
| `owner` |  |
| `settings` |  |
| `status` | Current status of the project |
| `updatedAt` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/projects`

#### Test

| Field | Description |
| --- | --- |
| `completedAt` |  |
| `duration` | Test duration in seconds |
| `environment` |  |
| `failed` |  |
| `id` |  |
| `name` |  |
| `passed` |  |
| `platform` |  |
| `projectId` |  |
| `results` |  |
| `skipped` |  |
| `startedAt` |  |
| `status` |  |
| `testSuite` |  |
| `totalTests` |  |

Operations: Create, List, Load.

API path: `/projects/{projectId}/tests`



## Entities


### Analytics

Create an instance: `local analytics = client:Analytics(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` |  |
| `eventName` | `string` |  |
| `eventType` | `string` |  |
| `name` | `string` |  |
| `properties` | `table` |  |
| `timestamp` | `string` |  |

#### Example: List

```lua
local analyticss, err = client:Analytics():list()
```

#### Example: Create

```lua
local analytics, err = client:Analytics():create({
  project_id = "example_project_id", -- string
  eventName = "example_eventName", -- string
  eventType = "example_eventType", -- string
})
```


### Asset

Create an instance: `local asset = client:Asset(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` |  |
| `id` | `string` |  |
| `mimeType` | `string` |  |
| `name` | `string` |  |
| `projectId` | `string` |  |
| `size` | `number` | File size in bytes |
| `tags` | `table` |  |
| `type` | `string` |  |
| `updatedAt` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```lua
local asset, err = client:Asset():load({ id = "asset_id", project_id = "project_id" })
```

#### Example: List

```lua
local assets, err = client:Asset():list()
```

#### Example: Create

```lua
local asset, err = client:Asset():create({
  project_id = "example_project_id", -- string
})
```


### Build

Create an instance: `local build = client:Build(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configuration` | `string` |  |
| `platform` | `string` |  |
| `version` | `string` |  |

#### Example: Create

```lua
local build, err = client:Build():create({
  project_id = "example_project_id", -- string
  configuration = "example_configuration", -- string
  platform = "example_platform", -- string
  version = "example_version", -- string
})
```


### Collaboration

Create an instance: `local collaboration = client:Collaboration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addedAt` | `string` |  |
| `email` | `string` |  |
| `id` | `string` |  |
| `lastActive` | `string` |  |
| `name` | `string` |  |
| `role` | `string` |  |
| `status` | `string` |  |
| `userId` | `string` |  |

#### Example: List

```lua
local collaborations, err = client:Collaboration():list()
```


### Collaborator

Create an instance: `local collaborator = client:Collaborator(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `role` | `string` |  |

#### Example: Create

```lua
local collaborator, err = client:Collaborator():create({
  project_id = "example_project_id", -- string
  email = "example_email", -- string
  role = "example_role", -- string
})
```


### Deployment

Create an instance: `local deployment = client:Deployment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `buildVersion` | `string` |  |
| `completedAt` | `string` |  |
| `configuration` | `string` |  |
| `createdAt` | `string` |  |
| `deploymentUrl` | `string` |  |
| `downloadUrl` | `string` |  |
| `environment` | `string` |  |
| `id` | `string` |  |
| `platform` | `string` |  |
| `projectId` | `string` |  |
| `releaseNotes` | `string` |  |
| `size` | `number` | Build size in bytes |
| `status` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```lua
local deployment, err = client:Deployment():load({ id = "deployment_id", project_id = "project_id" })
```

#### Example: List

```lua
local deployments, err = client:Deployment():list()
```

#### Example: Create

```lua
local deployment, err = client:Deployment():create({
  project_id = "example_project_id", -- string
})
```


### Project

Create an instance: `local project = client:Project(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` |  |
| `description` | `string` | Detailed description of the project |
| `id` | `string` | Unique identifier for the project |
| `name` | `string` | Name of the game project |
| `owner` | `table` |  |
| `settings` | `table` |  |
| `status` | `string` | Current status of the project |
| `updatedAt` | `string` |  |

#### Example: Load

```lua
local project, err = client:Project():load({ id = "project_id" })
```

#### Example: List

```lua
local projects, err = client:Project():list()
```

#### Example: Create

```lua
local project, err = client:Project():create({
})
```


### Test

Create an instance: `local test = client:Test(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completedAt` | `string` |  |
| `duration` | `number` | Test duration in seconds |
| `environment` | `string` |  |
| `failed` | `number` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `passed` | `number` |  |
| `platform` | `string` |  |
| `projectId` | `string` |  |
| `results` | `table` |  |
| `skipped` | `number` |  |
| `startedAt` | `string` |  |
| `status` | `string` |  |
| `testSuite` | `string` |  |
| `totalTests` | `number` |  |

#### Example: Load

```lua
local test, err = client:Test():load({ id = "test_id", project_id = "project_id" })
```

#### Example: List

```lua
local tests, err = client:Test():list()
```

#### Example: Create

```lua
local test, err = client:Test():create({
  project_id = "example_project_id", -- string
  environment = "example_environment", -- string
  name = "example_name", -- string
  platform = "example_platform", -- string
  testSuite = "example_testSuite", -- string
})
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── game-development_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`game-development_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local project = client:Project()
project:list()

-- project:data_get() now returns the project data from the last list
-- project:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
