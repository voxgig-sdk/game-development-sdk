# GameDevelopment Ruby SDK Reference

Complete API reference for the GameDevelopment Ruby SDK.


## GameDevelopmentSDK

### Constructor

```ruby
require_relative 'game-development_sdk'

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

#### `direct(fetchargs = {}) -> Hash, err`

Make a direct HTTP request to any API endpoint.

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

**Returns:** `Hash, err`

#### `prepare(fetchargs = {}) -> Hash, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Hash, err`


---

## AnalyticsEntity

```ruby
analytics = client.Analytics
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | No |  |
| `event_name` | ``$STRING`` | Yes |  |
| `event_type` | ``$STRING`` | Yes |  |
| `name` | ``$STRING`` | No |  |
| `property` | ``$OBJECT`` | No |  |
| `timestamp` | ``$STRING`` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.Analytics.create({
  "event_name" => # `$STRING`,
  "event_type" => # `$STRING`,
})
```

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Analytics.list(nil)
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
| `created_at` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `mime_type` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `project_id` | ``$STRING`` | No |  |
| `size` | ``$INTEGER`` | No |  |
| `tag` | ``$ARRAY`` | No |  |
| `type` | ``$STRING`` | No |  |
| `updated_at` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.Asset.create({
})
```

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Asset.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Asset.load({ "id" => "asset_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result, err`

Remove the entity matching the given criteria.

```ruby
result, err = client.Asset.remove({ "id" => "asset_id" })
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
| `configuration` | ``$STRING`` | Yes |  |
| `platform` | ``$STRING`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.Build.create({
  "configuration" => # `$STRING`,
  "platform" => # `$STRING`,
  "version" => # `$STRING`,
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
| `added_at` | ``$STRING`` | No |  |
| `email` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `last_active` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `role` | ``$STRING`` | No |  |
| `status` | ``$STRING`` | No |  |
| `user_id` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Collaboration.list(nil)
```

#### `remove(reqmatch, ctrl = nil) -> result, err`

Remove the entity matching the given criteria.

```ruby
result, err = client.Collaboration.remove({ "id" => "collaboration_id" })
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
| `email` | ``$STRING`` | Yes |  |
| `role` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.Collaborator.create({
  "email" => # `$STRING`,
  "role" => # `$STRING`,
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
| `build_version` | ``$STRING`` | No |  |
| `completed_at` | ``$STRING`` | No |  |
| `configuration` | ``$STRING`` | No |  |
| `created_at` | ``$STRING`` | No |  |
| `deployment_url` | ``$STRING`` | No |  |
| `download_url` | ``$STRING`` | No |  |
| `environment` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `platform` | ``$STRING`` | No |  |
| `project_id` | ``$STRING`` | No |  |
| `release_note` | ``$STRING`` | No |  |
| `size` | ``$INTEGER`` | No |  |
| `status` | ``$STRING`` | No |  |
| `version` | ``$STRING`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `build_version` | - | - | Yes | - | - |
| `completed_at` | - | - | - | - | - |
| `configuration` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `deployment_url` | - | - | - | - | - |
| `download_url` | - | - | - | - | - |
| `environment` | - | - | Yes | - | - |
| `id` | - | - | - | - | - |
| `platform` | - | - | Yes | - | - |
| `project_id` | - | - | - | - | - |
| `release_note` | - | - | - | - | - |
| `size` | - | - | - | - | - |
| `status` | - | - | - | - | - |
| `version` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.Deployment.create({
})
```

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Deployment.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Deployment.load({ "id" => "deployment_id" })
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
| `created_at` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `owner` | ``$OBJECT`` | No |  |
| `setting` | ``$OBJECT`` | No |  |
| `status` | ``$STRING`` | No |  |
| `updated_at` | ``$STRING`` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.Project.create({
})
```

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Project.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Project.load({ "id" => "project_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result, err`

Remove the entity matching the given criteria.

```ruby
result, err = client.Project.remove({ "id" => "project_id" })
```

#### `update(reqdata, ctrl = nil) -> result, err`

Update an existing entity. The data must include the entity `id`.

```ruby
result, err = client.Project.update({
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
| `completed_at` | ``$STRING`` | No |  |
| `environment` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `platform` | ``$STRING`` | No |  |
| `project_id` | ``$STRING`` | No |  |
| `result` | ``$OBJECT`` | No |  |
| `started_at` | ``$STRING`` | No |  |
| `status` | ``$STRING`` | No |  |
| `test_suite` | ``$STRING`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `completed_at` | - | - | - | - | - |
| `environment` | - | - | Yes | - | - |
| `id` | - | - | - | - | - |
| `name` | - | - | Yes | - | - |
| `platform` | - | - | Yes | - | - |
| `project_id` | - | - | - | - | - |
| `result` | - | - | - | - | - |
| `started_at` | - | - | - | - | - |
| `status` | - | - | - | - | - |
| `test_suite` | - | - | Yes | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result, err`

Create a new entity with the given data.

```ruby
result, err = client.Test.create({
})
```

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Test.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Test.load({ "id" => "test_id" })
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

