# GameDevelopment Lua SDK Reference

Complete API reference for the GameDevelopment Lua SDK.


## GameDevelopmentSDK

### Constructor

```lua
local sdk = require("game-development_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Analytics(data)`

Create a new `Analytics` entity instance. Pass `nil` for no initial data.

#### `Asset(data)`

Create a new `Asset` entity instance. Pass `nil` for no initial data.

#### `Build(data)`

Create a new `Build` entity instance. Pass `nil` for no initial data.

#### `Collaboration(data)`

Create a new `Collaboration` entity instance. Pass `nil` for no initial data.

#### `Collaborator(data)`

Create a new `Collaborator` entity instance. Pass `nil` for no initial data.

#### `Deployment(data)`

Create a new `Deployment` entity instance. Pass `nil` for no initial data.

#### `Project(data)`

Create a new `Project` entity instance. Pass `nil` for no initial data.

#### `Test(data)`

Create a new `Test` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AnalyticsEntity

```lua
local analytics = client:Analytics(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `number` | No |  |
| `event_name` | `string` | Yes |  |
| `event_type` | `string` | Yes |  |
| `name` | `string` | No |  |
| `property` | `table` | No |  |
| `timestamp` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Analytics():create({
  event_name = --[[ string ]],
  event_type = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Analytics():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AnalyticsEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AssetEntity

```lua
local asset = client:Asset(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `id` | `string` | No |  |
| `mime_type` | `string` | No |  |
| `name` | `string` | No |  |
| `project_id` | `string` | No |  |
| `size` | `number` | No |  |
| `tag` | `table` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Asset():create({
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Asset():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Asset():load({ id = "asset_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Asset():remove({ id = "asset_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AssetEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BuildEntity

```lua
local build = client:Build(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `configuration` | `string` | Yes |  |
| `platform` | `string` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Build():create({
  configuration = --[[ string ]],
  platform = --[[ string ]],
  version = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BuildEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CollaborationEntity

```lua
local collaboration = client:Collaboration(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `string` | No |  |
| `email` | `string` | No |  |
| `id` | `string` | No |  |
| `last_active` | `string` | No |  |
| `name` | `string` | No |  |
| `role` | `string` | No |  |
| `status` | `string` | No |  |
| `user_id` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Collaboration():list()
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Collaboration():remove()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CollaborationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CollaboratorEntity

```lua
local collaborator = client:Collaborator(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `role` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Collaborator():create({
  email = --[[ string ]],
  role = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CollaboratorEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DeploymentEntity

```lua
local deployment = client:Deployment(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `build_version` | `string` | No |  |
| `completed_at` | `string` | No |  |
| `configuration` | `string` | No |  |
| `created_at` | `string` | No |  |
| `deployment_url` | `string` | No |  |
| `download_url` | `string` | No |  |
| `environment` | `string` | No |  |
| `id` | `string` | No |  |
| `platform` | `string` | No |  |
| `project_id` | `string` | No |  |
| `release_note` | `string` | No |  |
| `size` | `number` | No |  |
| `status` | `string` | No |  |
| `version` | `string` | No |  |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `build_version` | - | - | Yes |
| `completed_at` | - | - | - |
| `configuration` | - | - | - |
| `created_at` | - | - | - |
| `deployment_url` | - | - | - |
| `download_url` | - | - | - |
| `environment` | - | - | Yes |
| `id` | - | - | - |
| `platform` | - | - | Yes |
| `project_id` | - | - | - |
| `release_note` | - | - | - |
| `size` | - | - | - |
| `status` | - | - | - |
| `version` | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Deployment():create({
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Deployment():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Deployment():load({ id = "deployment_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeploymentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProjectEntity

```lua
local project = client:Project(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `description` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `owner` | `table` | No |  |
| `setting` | `table` | No |  |
| `status` | `string` | No |  |
| `updated_at` | `string` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `name` | - | - | Yes | - | - |
| `owner` | - | - | - | - | - |
| `setting` | - | - | - | - | - |
| `status` | - | - | - | - | - |
| `updated_at` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Project():create({
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Project():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Project():load({ id = "project_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Project():remove({ id = "project_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Project():update({
  id = "project_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TestEntity

```lua
local test = client:Test(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `string` | No |  |
| `environment` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `platform` | `string` | No |  |
| `project_id` | `string` | No |  |
| `result` | `table` | No |  |
| `started_at` | `string` | No |  |
| `status` | `string` | No |  |
| `test_suite` | `string` | No |  |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `completed_at` | - | - | - |
| `environment` | - | - | Yes |
| `id` | - | - | - |
| `name` | - | - | Yes |
| `platform` | - | - | Yes |
| `project_id` | - | - | - |
| `result` | - | - | - |
| `started_at` | - | - | - |
| `status` | - | - | - |
| `test_suite` | - | - | Yes |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Test():create({
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Test():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Test():load({ id = "test_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TestEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

