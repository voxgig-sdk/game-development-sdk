# GameDevelopment Lua SDK

The Lua SDK for the GameDevelopment API. Provides an entity-oriented interface using Lua conventions.


## Install
```bash
luarocks install game-development-sdk
```

If the module is not yet published, add the source directory to
your `LUA_PATH`:

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
  apikey = os.getenv("GAME-DEVELOPMENT_APIKEY"),
})
```

### 2. List analyticss

```lua
local result, err = client:Analytics(nil):list(nil, nil)
if err then error(err) end

if type(result) == "table" then
  for _, item in ipairs(result) do
    local d = item:data_get()
    print(d["id"], d["name"])
  end
end
```

### 4. Create, update, and remove

```lua
-- Create
local created, _ = client:Analytics(nil):create({ name = "Example" }, nil)

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
local client = sdk.test(nil, nil)

local result, err = client:GameDevelopment(nil):load(
  { id = "test01" }, nil
)
-- result contains mock response data
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
GAME-DEVELOPMENT_TEST_LIVE=TRUE
GAME-DEVELOPMENT_APIKEY=<your-key>
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
| `Analytics` | `(data) -> AnalyticsEntity` | Create a Analytics entity instance. |
| `Asset` | `(data) -> AssetEntity` | Create a Asset entity instance. |
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

Entity operations return `(any, err)`. The first value is a
`table` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `boolean` | `true` if the HTTP status is 2xx. |
| `status` | `number` | HTTP status code. |
| `headers` | `table` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `false` and `err` contains the error value.

### Entities

#### Analytics

| Field | Description |
| --- | --- |
| `count` |  |
| `event_name` |  |
| `event_type` |  |
| `name` |  |
| `property` |  |
| `timestamp` |  |

Operations: Create, List.

API path: `/projects/{projectId}/analytics/events`

#### Asset

| Field | Description |
| --- | --- |
| `created_at` |  |
| `id` |  |
| `mime_type` |  |
| `name` |  |
| `project_id` |  |
| `size` |  |
| `tag` |  |
| `type` |  |
| `updated_at` |  |
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
| `added_at` |  |
| `email` |  |
| `id` |  |
| `last_active` |  |
| `name` |  |
| `role` |  |
| `status` |  |
| `user_id` |  |

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
| `build_version` |  |
| `completed_at` |  |
| `configuration` |  |
| `created_at` |  |
| `deployment_url` |  |
| `download_url` |  |
| `environment` |  |
| `id` |  |
| `platform` |  |
| `project_id` |  |
| `release_note` |  |
| `size` |  |
| `status` |  |
| `version` |  |

Operations: Create, List, Load.

API path: `/projects/{projectId}/deployments`

#### Project

| Field | Description |
| --- | --- |
| `created_at` |  |
| `description` |  |
| `id` |  |
| `name` |  |
| `owner` |  |
| `setting` |  |
| `status` |  |
| `updated_at` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/projects`

#### Test

| Field | Description |
| --- | --- |
| `completed_at` |  |
| `environment` |  |
| `id` |  |
| `name` |  |
| `platform` |  |
| `project_id` |  |
| `result` |  |
| `started_at` |  |
| `status` |  |
| `test_suite` |  |

Operations: Create, List, Load.

API path: `/projects/{projectId}/tests`



## Entities


### Analytics

Create an instance: `const analytics = client.Analytics()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `event_name` | ``$STRING`` |  |
| `event_type` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `property` | ``$OBJECT`` |  |
| `timestamp` | ``$STRING`` |  |

#### Example: List

```ts
const analyticss = await client.Analytics().list()
```

#### Example: Create

```ts
const analytics = await client.Analytics().create({
  event_name: /* `$STRING` */,
  event_type: /* `$STRING` */,
})
```


### Asset

Create an instance: `const asset = client.Asset()`

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
| `created_at` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `mime_type` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `project_id` | ``$STRING`` |  |
| `size` | ``$INTEGER`` |  |
| `tag` | ``$ARRAY`` |  |
| `type` | ``$STRING`` |  |
| `updated_at` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const asset = await client.Asset().load({ id: 'asset_id' })
```

#### Example: List

```ts
const assets = await client.Asset().list()
```

#### Example: Create

```ts
const asset = await client.Asset().create({
})
```


### Build

Create an instance: `const build = client.Build()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configuration` | ``$STRING`` |  |
| `platform` | ``$STRING`` |  |
| `version` | ``$STRING`` |  |

#### Example: Create

```ts
const build = await client.Build().create({
  configuration: /* `$STRING` */,
  platform: /* `$STRING` */,
  version: /* `$STRING` */,
})
```


### Collaboration

Create an instance: `const collaboration = client.Collaboration()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_at` | ``$STRING`` |  |
| `email` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `last_active` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `role` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |
| `user_id` | ``$STRING`` |  |

#### Example: List

```ts
const collaborations = await client.Collaboration().list()
```


### Collaborator

Create an instance: `const collaborator = client.Collaborator()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | ``$STRING`` |  |
| `role` | ``$STRING`` |  |

#### Example: Create

```ts
const collaborator = await client.Collaborator().create({
  email: /* `$STRING` */,
  role: /* `$STRING` */,
})
```


### Deployment

Create an instance: `const deployment = client.Deployment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `build_version` | ``$STRING`` |  |
| `completed_at` | ``$STRING`` |  |
| `configuration` | ``$STRING`` |  |
| `created_at` | ``$STRING`` |  |
| `deployment_url` | ``$STRING`` |  |
| `download_url` | ``$STRING`` |  |
| `environment` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `platform` | ``$STRING`` |  |
| `project_id` | ``$STRING`` |  |
| `release_note` | ``$STRING`` |  |
| `size` | ``$INTEGER`` |  |
| `status` | ``$STRING`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```ts
const deployment = await client.Deployment().load({ id: 'deployment_id' })
```

#### Example: List

```ts
const deployments = await client.Deployment().list()
```

#### Example: Create

```ts
const deployment = await client.Deployment().create({
})
```


### Project

Create an instance: `const project = client.Project()`

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
| `created_at` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `owner` | ``$OBJECT`` |  |
| `setting` | ``$OBJECT`` |  |
| `status` | ``$STRING`` |  |
| `updated_at` | ``$STRING`` |  |

#### Example: Load

```ts
const project = await client.Project().load({ id: 'project_id' })
```

#### Example: List

```ts
const projects = await client.Project().list()
```

#### Example: Create

```ts
const project = await client.Project().create({
})
```


### Test

Create an instance: `const test = client.Test()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_at` | ``$STRING`` |  |
| `environment` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `platform` | ``$STRING`` |  |
| `project_id` | ``$STRING`` |  |
| `result` | ``$OBJECT`` |  |
| `started_at` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |
| `test_suite` | ``$STRING`` |  |

#### Example: Load

```ts
const test = await client.Test().load({ id: 'test_id' })
```

#### Example: List

```ts
const tests = await client.Test().list()
```

#### Example: Create

```ts
const test = await client.Test().create({
})
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as a second return value.

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local moon = client:Moon(nil)
moon:load({ planet_id = "earth", id = "luna" }, nil)

-- moon:data_get() now returns the loaded moon data
-- moon:match_get() returns the last match criteria
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
