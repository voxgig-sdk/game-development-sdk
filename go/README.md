# GameDevelopment Golang SDK



The Golang SDK for the GameDevelopment API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Analytics(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/game-development-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/game-development-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/game-development-sdk/go=../game-development-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/game-development-sdk/go"
)

func main() {
    client := sdk.NewGameDevelopmentSDK(map[string]any{
        "apikey": os.Getenv("GAME_DEVELOPMENT_APIKEY"),
    })

    // List analytics records — the value is the array of records itself.
    analyticss, err := client.Analytics(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range analyticss.([]any) {
        fmt.Println(item)
    }

    // Create a analytics.
    created, err := client.Analytics(nil).Create(map[string]any{"project_id": "example_project_id", "eventName": "example_eventName", "eventType": "example_eventType"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
projects, err := client.Project(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = projects
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

project, err := client.Project(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(project) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewGameDevelopmentSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewGameDevelopmentSDK

```go
func NewGameDevelopmentSDK(options map[string]any) *GameDevelopmentSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *GameDevelopmentSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### GameDevelopmentSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Analytics` | `(data map[string]any) GameDevelopmentEntity` | Create an Analytics entity instance. |
| `Asset` | `(data map[string]any) GameDevelopmentEntity` | Create an Asset entity instance. |
| `Build` | `(data map[string]any) GameDevelopmentEntity` | Create a Build entity instance. |
| `Collaboration` | `(data map[string]any) GameDevelopmentEntity` | Create a Collaboration entity instance. |
| `Collaborator` | `(data map[string]any) GameDevelopmentEntity` | Create a Collaborator entity instance. |
| `Deployment` | `(data map[string]any) GameDevelopmentEntity` | Create a Deployment entity instance. |
| `Project` | `(data map[string]any) GameDevelopmentEntity` | Create a Project entity instance. |
| `Test` | `(data map[string]any) GameDevelopmentEntity` | Create a Test entity instance. |

### Entity interface (GameDevelopmentEntity)

All entities implement the `GameDevelopmentEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    analytics, err := client.Analytics(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // analytics is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Analytics

| Field | Description |
| --- | --- |
| `"count"` |  |
| `"eventName"` |  |
| `"eventType"` |  |
| `"name"` |  |
| `"properties"` |  |
| `"timestamp"` |  |

Operations: Create, List.

API path: `/projects/{projectId}/analytics/events`

#### Asset

| Field | Description |
| --- | --- |
| `"createdAt"` |  |
| `"id"` |  |
| `"mimeType"` |  |
| `"name"` |  |
| `"projectId"` |  |
| `"size"` | File size in bytes |
| `"tags"` |  |
| `"type"` |  |
| `"updatedAt"` |  |
| `"url"` |  |

Operations: Create, List, Load, Remove.

API path: `/projects/{projectId}/assets`

#### Build

| Field | Description |
| --- | --- |
| `"configuration"` |  |
| `"platform"` |  |
| `"version"` |  |

Operations: Create.

API path: `/projects/{projectId}/builds`

#### Collaboration

| Field | Description |
| --- | --- |
| `"addedAt"` |  |
| `"email"` |  |
| `"id"` |  |
| `"lastActive"` |  |
| `"name"` |  |
| `"role"` |  |
| `"status"` |  |
| `"userId"` |  |

Operations: List, Remove.

API path: `/projects/{projectId}/collaborators`

#### Collaborator

| Field | Description |
| --- | --- |
| `"email"` |  |
| `"role"` |  |

Operations: Create.

API path: `/projects/{projectId}/collaborators`

#### Deployment

| Field | Description |
| --- | --- |
| `"buildVersion"` |  |
| `"completedAt"` |  |
| `"configuration"` |  |
| `"createdAt"` |  |
| `"deploymentUrl"` |  |
| `"downloadUrl"` |  |
| `"environment"` |  |
| `"id"` |  |
| `"platform"` |  |
| `"projectId"` |  |
| `"releaseNotes"` |  |
| `"size"` | Build size in bytes |
| `"status"` |  |
| `"version"` |  |

Operations: Create, List, Load.

API path: `/projects/{projectId}/deployments`

#### Project

| Field | Description |
| --- | --- |
| `"createdAt"` |  |
| `"description"` | Detailed description of the project |
| `"id"` | Unique identifier for the project |
| `"name"` | Name of the game project |
| `"owner"` |  |
| `"settings"` |  |
| `"status"` | Current status of the project |
| `"updatedAt"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/projects`

#### Test

| Field | Description |
| --- | --- |
| `"completedAt"` |  |
| `"duration"` | Test duration in seconds |
| `"environment"` |  |
| `"failed"` |  |
| `"id"` |  |
| `"name"` |  |
| `"passed"` |  |
| `"platform"` |  |
| `"projectId"` |  |
| `"results"` |  |
| `"skipped"` |  |
| `"startedAt"` |  |
| `"status"` |  |
| `"testSuite"` |  |
| `"totalTests"` |  |

Operations: Create, List, Load.

API path: `/projects/{projectId}/tests`



## Entities


### Analytics

Create an instance: `analytics := client.Analytics(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` |  |
| `eventName` | `string` |  |
| `eventType` | `string` |  |
| `name` | `string` |  |
| `properties` | `map[string]any` |  |
| `timestamp` | `string` |  |

#### Example: List

```go
analyticss, err := client.Analytics(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(analyticss) // the array of records
```

#### Example: Create

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


### Asset

Create an instance: `asset := client.Asset(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` |  |
| `id` | `string` |  |
| `mimeType` | `string` |  |
| `name` | `string` |  |
| `projectId` | `string` |  |
| `size` | `int` | File size in bytes |
| `tags` | `[]any` |  |
| `type` | `string` |  |
| `updatedAt` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```go
asset, err := client.Asset(nil).Load(map[string]any{"id": "asset_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(asset) // the loaded record
```

#### Example: List

```go
assets, err := client.Asset(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(assets) // the array of records
```

#### Example: Create

```go
result, err := client.Asset(nil).Create(map[string]any{
    "project_id": "example_project_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Build

Create an instance: `build := client.Build(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configuration` | `string` |  |
| `platform` | `string` |  |
| `version` | `string` |  |

#### Example: Create

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


### Collaboration

Create an instance: `collaboration := client.Collaboration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |

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

```go
collaborations, err := client.Collaboration(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(collaborations) // the array of records
```


### Collaborator

Create an instance: `collaborator := client.Collaborator(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `role` | `string` |  |

#### Example: Create

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


### Deployment

Create an instance: `deployment := client.Deployment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

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
| `size` | `int` | Build size in bytes |
| `status` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```go
deployment, err := client.Deployment(nil).Load(map[string]any{"id": "deployment_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(deployment) // the loaded record
```

#### Example: List

```go
deployments, err := client.Deployment(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(deployments) // the array of records
```

#### Example: Create

```go
result, err := client.Deployment(nil).Create(map[string]any{
    "project_id": "example_project_id",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Project

Create an instance: `project := client.Project(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` |  |
| `description` | `string` | Detailed description of the project |
| `id` | `string` | Unique identifier for the project |
| `name` | `string` | Name of the game project |
| `owner` | `map[string]any` |  |
| `settings` | `map[string]any` |  |
| `status` | `string` | Current status of the project |
| `updatedAt` | `string` |  |

#### Example: Load

```go
project, err := client.Project(nil).Load(map[string]any{"id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(project) // the loaded record
```

#### Example: List

```go
projects, err := client.Project(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(projects) // the array of records
```

#### Example: Create

```go
result, err := client.Project(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Test

Create an instance: `test := client.Test(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completedAt` | `string` |  |
| `duration` | `float64` | Test duration in seconds |
| `environment` | `string` |  |
| `failed` | `int` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `passed` | `int` |  |
| `platform` | `string` |  |
| `projectId` | `string` |  |
| `results` | `map[string]any` |  |
| `skipped` | `int` |  |
| `startedAt` | `string` |  |
| `status` | `string` |  |
| `testSuite` | `string` |  |
| `totalTests` | `int` |  |

#### Example: Load

```go
test, err := client.Test(nil).Load(map[string]any{"id": "test_id", "project_id": "project_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(test) // the loaded record
```

#### Example: List

```go
tests, err := client.Test(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(tests) // the array of records
```

#### Example: Create

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

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/game-development-sdk/go/
├── game-development.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/game-development-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
project := client.Project(nil)
project.List(nil, nil)

// project.Data() now returns the project data from the last list
// project.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
