# GameDevelopment Golang SDK Reference

Complete API reference for the GameDevelopment Golang SDK.


## GameDevelopmentSDK

### Constructor

```go
func NewGameDevelopmentSDK(options map[string]any) *GameDevelopmentSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TestSDK(testopts, sdkopts map[string]any) *GameDevelopmentSDK`

Create a test client with mock features active. Both arguments may be `nil`.

```go
client := sdk.TestSDK(nil, nil)
```


### Instance Methods

#### `Analytics(data map[string]any) GameDevelopmentEntity`

Create a new `Analytics` entity instance. Pass `nil` for no initial data.

#### `Asset(data map[string]any) GameDevelopmentEntity`

Create a new `Asset` entity instance. Pass `nil` for no initial data.

#### `Build(data map[string]any) GameDevelopmentEntity`

Create a new `Build` entity instance. Pass `nil` for no initial data.

#### `Collaboration(data map[string]any) GameDevelopmentEntity`

Create a new `Collaboration` entity instance. Pass `nil` for no initial data.

#### `Collaborator(data map[string]any) GameDevelopmentEntity`

Create a new `Collaborator` entity instance. Pass `nil` for no initial data.

#### `Deployment(data map[string]any) GameDevelopmentEntity`

Create a new `Deployment` entity instance. Pass `nil` for no initial data.

#### `Project(data map[string]any) GameDevelopmentEntity`

Create a new `Project` entity instance. Pass `nil` for no initial data.

#### `Test(data map[string]any) GameDevelopmentEntity`

Create a new `Test` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AnalyticsEntity

```go
analytics := client.Analytics(nil)
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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Analytics(nil).Create(map[string]any{
    "event_name": /* `$STRING` */,
    "event_type": /* `$STRING` */,
}, nil)
```

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Analytics(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AnalyticsEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AssetEntity

```go
asset := client.Asset(nil)
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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Asset(nil).Create(map[string]any{
}, nil)
```

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Asset(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Asset(nil).Load(map[string]any{"id": "asset_id"}, nil)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Asset(nil).Remove(map[string]any{"id": "asset_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AssetEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## BuildEntity

```go
build := client.Build(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `configuration` | ``$STRING`` | Yes |  |
| `platform` | ``$STRING`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Build(nil).Create(map[string]any{
    "configuration": /* `$STRING` */,
    "platform": /* `$STRING` */,
    "version": /* `$STRING` */,
}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BuildEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CollaborationEntity

```go
collaboration := client.Collaboration(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Collaboration(nil).List(nil, nil)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Collaboration(nil).Remove(map[string]any{"id": "collaboration_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CollaborationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CollaboratorEntity

```go
collaborator := client.Collaborator(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | ``$STRING`` | Yes |  |
| `role` | ``$STRING`` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Collaborator(nil).Create(map[string]any{
    "email": /* `$STRING` */,
    "role": /* `$STRING` */,
}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CollaboratorEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DeploymentEntity

```go
deployment := client.Deployment(nil)
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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Deployment(nil).Create(map[string]any{
}, nil)
```

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Deployment(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Deployment(nil).Load(map[string]any{"id": "deployment_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DeploymentEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ProjectEntity

```go
project := client.Project(nil)
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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Project(nil).Create(map[string]any{
}, nil)
```

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Project(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Project(nil).Load(map[string]any{"id": "project_id"}, nil)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Project(nil).Remove(map[string]any{"id": "project_id"}, nil)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Project(nil).Update(map[string]any{
    "id": "project_id",
    // Fields to update
}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProjectEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TestEntity

```go
test := client.Test(nil)
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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Test(nil).Create(map[string]any{
}, nil)
```

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Test(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Test(nil).Load(map[string]any{"id": "test_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TestEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewGameDevelopmentSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

