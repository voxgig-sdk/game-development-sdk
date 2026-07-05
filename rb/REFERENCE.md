# GameDevelopment Ruby SDK Reference

Complete API reference for the GameDevelopment Ruby SDK.


## GameDevelopmentSDK

### Constructor

```ruby
require_relative 'GameDevelopment_sdk'

client = GameDevelopmentSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GameDevelopmentSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = GameDevelopmentSDK.test
```


### Instance Methods

#### `Analytics(data = nil)`

Create a new `Analytics` entity instance. Pass `nil` for no initial data.

#### `Asset(data = nil)`

Create a new `Asset` entity instance. Pass `nil` for no initial data.

#### `Build(data = nil)`

Create a new `Build` entity instance. Pass `nil` for no initial data.

#### `Collaboration(data = nil)`

Create a new `Collaboration` entity instance. Pass `nil` for no initial data.

#### `Collaborator(data = nil)`

Create a new `Collaborator` entity instance. Pass `nil` for no initial data.

#### `Deployment(data = nil)`

Create a new `Deployment` entity instance. Pass `nil` for no initial data.

#### `Project(data = nil)`

Create a new `Project` entity instance. Pass `nil` for no initial data.

#### `Test(data = nil)`

Create a new `Test` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AnalyticsEntity

```ruby
analytics = client.Analytics
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `Integer` | No |  |
| `event_name` | `String` | Yes |  |
| `event_type` | `String` | Yes |  |
| `name` | `String` | No |  |
| `property` | `Hash` | No |  |
| `timestamp` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Analytics.create({
  "event_name" => "example", # String
  "event_type" => "example", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Analytics.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AnalyticsEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AssetEntity

```ruby
asset = client.Asset
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | No |  |
| `id` | `String` | No |  |
| `mime_type` | `String` | No |  |
| `name` | `String` | No |  |
| `project_id` | `String` | No |  |
| `size` | `Integer` | No |  |
| `tag` | `Array` | No |  |
| `type` | `String` | No |  |
| `updated_at` | `String` | No |  |
| `url` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Asset.create({
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Asset.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Asset.load({ "id" => "asset_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Asset.remove({ "id" => "asset_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AssetEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BuildEntity

```ruby
build = client.Build
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `configuration` | `String` | Yes |  |
| `platform` | `String` | Yes |  |
| `version` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Build.create({
  "configuration" => "example", # String
  "platform" => "example", # String
  "version" => "example", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BuildEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CollaborationEntity

```ruby
collaboration = client.Collaboration
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `String` | No |  |
| `email` | `String` | No |  |
| `id` | `String` | No |  |
| `last_active` | `String` | No |  |
| `name` | `String` | No |  |
| `role` | `String` | No |  |
| `status` | `String` | No |  |
| `user_id` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Collaboration.list
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Collaboration.remove()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CollaborationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CollaboratorEntity

```ruby
collaborator = client.Collaborator
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `String` | Yes |  |
| `role` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Collaborator.create({
  "email" => "example", # String
  "role" => "example", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CollaboratorEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DeploymentEntity

```ruby
deployment = client.Deployment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `build_version` | `String` | No |  |
| `completed_at` | `String` | No |  |
| `configuration` | `String` | No |  |
| `created_at` | `String` | No |  |
| `deployment_url` | `String` | No |  |
| `download_url` | `String` | No |  |
| `environment` | `String` | No |  |
| `id` | `String` | No |  |
| `platform` | `String` | No |  |
| `project_id` | `String` | No |  |
| `release_note` | `String` | No |  |
| `size` | `Integer` | No |  |
| `status` | `String` | No |  |
| `version` | `String` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Deployment.create({
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Deployment.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Deployment.load({ "id" => "deployment_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DeploymentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProjectEntity

```ruby
project = client.Project
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `String` | No |  |
| `description` | `String` | No |  |
| `id` | `String` | No |  |
| `name` | `String` | No |  |
| `owner` | `Hash` | No |  |
| `setting` | `Hash` | No |  |
| `status` | `String` | No |  |
| `updated_at` | `String` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Project.create({
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Project.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Project.load({ "id" => "project_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Project.remove({ "id" => "project_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Project.update({
  "id" => "project_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProjectEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TestEntity

```ruby
test = client.Test
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `String` | No |  |
| `environment` | `String` | No |  |
| `id` | `String` | No |  |
| `name` | `String` | No |  |
| `platform` | `String` | No |  |
| `project_id` | `String` | No |  |
| `result` | `Hash` | No |  |
| `started_at` | `String` | No |  |
| `status` | `String` | No |  |
| `test_suite` | `String` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Test.create({
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Test.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Test.load({ "id" => "test_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TestEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = GameDevelopmentSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

