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

#### `Test() *GameDevelopmentSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *GameDevelopmentSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
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
fmt.Println(analytics.GetName()) // "analytics"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No |  |
| `eventName` | `string` | Yes |  |
| `eventType` | `string` | Yes |  |
| `name` | `string` | No |  |
| `properties` | `map[string]any` | No |  |
| `timestamp` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Analytics(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Analytics(nil).Create(map[string]any{
    "project_id": "example_project_id",
    "eventName": "example_eventName",
    "eventType": "example_eventType",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(asset.GetName()) // "asset"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No |  |
| `id` | `string` | No |  |
| `mimeType` | `string` | No |  |
| `name` | `string` | No |  |
| `projectId` | `string` | No |  |
| `size` | `int` | No |  |
| `tags` | `[]any` | No |  |
| `type` | `string` | No |  |
| `updatedAt` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Asset(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Asset(nil).Load(map[string]any{"id": "asset_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Asset(nil).Create(map[string]any{
    "project_id": "example_project_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Asset(nil).Remove(map[string]any{"id": "asset_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(build.GetName()) // "build"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `configuration` | `string` | Yes |  |
| `platform` | `string` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Build(nil).Create(map[string]any{
    "project_id": "example_project_id",
    "configuration": "example_configuration",
    "platform": "example_platform",
    "version": "example_version",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(collaboration.GetName()) // "collaboration"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addedAt` | `string` | No |  |
| `email` | `string` | No |  |
| `id` | `string` | No |  |
| `lastActive` | `string` | No |  |
| `name` | `string` | No |  |
| `role` | `string` | No |  |
| `status` | `string` | No |  |
| `userId` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Collaboration(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Collaboration(nil).Remove(map[string]any{"project_id": "project_id", "user_id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(collaborator.GetName()) // "collaborator"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `role` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Collaborator(nil).Create(map[string]any{
    "project_id": "example_project_id",
    "email": "example_email",
    "role": "example_role",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(deployment.GetName()) // "deployment"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `buildVersion` | `string` | No |  |
| `completedAt` | `string` | No |  |
| `configuration` | `string` | No |  |
| `createdAt` | `string` | No |  |
| `deploymentUrl` | `string` | No |  |
| `downloadUrl` | `string` | No |  |
| `environment` | `string` | No |  |
| `id` | `string` | No |  |
| `platform` | `string` | No |  |
| `projectId` | `string` | No |  |
| `releaseNotes` | `string` | No |  |
| `size` | `int` | No |  |
| `status` | `string` | No |  |
| `version` | `string` | No |  |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `buildVersion` | - | - | Yes |
| `completedAt` | - | - | - |
| `configuration` | - | - | - |
| `createdAt` | - | - | - |
| `deploymentUrl` | - | - | - |
| `downloadUrl` | - | - | - |
| `environment` | - | - | Yes |
| `id` | - | - | - |
| `platform` | - | - | Yes |
| `projectId` | - | - | - |
| `releaseNotes` | - | - | - |
| `size` | - | - | - |
| `status` | - | - | - |
| `version` | - | - | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Deployment(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Deployment(nil).Load(map[string]any{"id": "deployment_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Deployment(nil).Create(map[string]any{
    "project_id": "example_project_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(project.GetName()) // "project"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No |  |
| `description` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `owner` | `map[string]any` | No |  |
| `settings` | `map[string]any` | No |  |
| `status` | `string` | No |  |
| `updatedAt` | `string` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `createdAt` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `name` | - | - | Yes | - | - |
| `owner` | - | - | - | - | - |
| `settings` | - | - | - | - | - |
| `status` | - | - | - | - | - |
| `updatedAt` | - | - | - | - | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Project(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Project(nil).Load(map[string]any{"id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Project(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Project(nil).Update(map[string]any{
    "id": "project_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Project(nil).Remove(map[string]any{"id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(test.GetName()) // "test"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completedAt` | `string` | No |  |
| `duration` | `float64` | No |  |
| `environment` | `string` | Yes |  |
| `failed` | `int` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | Yes |  |
| `passed` | `int` | No |  |
| `platform` | `string` | Yes |  |
| `projectId` | `string` | No |  |
| `results` | `map[string]any` | No |  |
| `skipped` | `int` | No |  |
| `startedAt` | `string` | No |  |
| `status` | `string` | No |  |
| `testSuite` | `string` | Yes |  |
| `totalTests` | `int` | No |  |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `completedAt` | - | - | - |
| `duration` | - | - | - |
| `environment` | - | Yes | - |
| `failed` | - | - | - |
| `id` | - | - | - |
| `name` | - | Yes | - |
| `passed` | - | - | - |
| `platform` | - | Yes | - |
| `projectId` | - | - | - |
| `results` | - | - | - |
| `skipped` | - | - | - |
| `startedAt` | - | - | - |
| `status` | - | - | - |
| `testSuite` | - | Yes | - |
| `totalTests` | - | - | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Test(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Test(nil).Load(map[string]any{"id": "test_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Test(nil).Create(map[string]any{
    "project_id": "example_project_id",
    "environment": "example_environment",
    "name": "example_name",
    "platform": "example_platform",
    "testSuite": "example_testSuite",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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

