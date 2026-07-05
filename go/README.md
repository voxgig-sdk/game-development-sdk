# GameDevelopment Golang SDK



The Golang SDK for the GameDevelopment API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Analytics(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
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
    created, err := client.Analytics(nil).Create(map[string]any{"project_id": "example"}, nil)
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
analyticss, err := client.Analytics(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = analyticss
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

analytics, err := client.Analytics(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(analytics) // the returned mock data
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
| `"event_name"` |  |
| `"event_type"` |  |
| `"name"` |  |
| `"property"` |  |
| `"timestamp"` |  |

Operations: Create, List.

API path: `/projects/{projectId}/analytics/events`

#### Asset

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"id"` |  |
| `"mime_type"` |  |
| `"name"` |  |
| `"project_id"` |  |
| `"size"` |  |
| `"tag"` |  |
| `"type"` |  |
| `"updated_at"` |  |
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
| `"added_at"` |  |
| `"email"` |  |
| `"id"` |  |
| `"last_active"` |  |
| `"name"` |  |
| `"role"` |  |
| `"status"` |  |
| `"user_id"` |  |

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
| `"build_version"` |  |
| `"completed_at"` |  |
| `"configuration"` |  |
| `"created_at"` |  |
| `"deployment_url"` |  |
| `"download_url"` |  |
| `"environment"` |  |
| `"id"` |  |
| `"platform"` |  |
| `"project_id"` |  |
| `"release_note"` |  |
| `"size"` |  |
| `"status"` |  |
| `"version"` |  |

Operations: Create, List, Load.

API path: `/projects/{projectId}/deployments`

#### Project

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"description"` |  |
| `"id"` |  |
| `"name"` |  |
| `"owner"` |  |
| `"setting"` |  |
| `"status"` |  |
| `"updated_at"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/projects`

#### Test

| Field | Description |
| --- | --- |
| `"completed_at"` |  |
| `"environment"` |  |
| `"id"` |  |
| `"name"` |  |
| `"platform"` |  |
| `"project_id"` |  |
| `"result"` |  |
| `"started_at"` |  |
| `"status"` |  |
| `"test_suite"` |  |

Operations: Create, List, Load.

API path: `/projects/{projectId}/tests`



## Entities


### Analytics

Create an instance: `analytics := client.Analytics(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` |  |
| `event_name` | `string` |  |
| `event_type` | `string` |  |
| `name` | `string` |  |
| `property` | `map[string]any` |  |
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
    "event_name": /* string */,
    "event_type": /* string */,
}, nil)
```


### Asset

Create an instance: `asset := client.Asset(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `id` | `string` |  |
| `mime_type` | `string` |  |
| `name` | `string` |  |
| `project_id` | `string` |  |
| `size` | `int` |  |
| `tag` | `[]any` |  |
| `type` | `string` |  |
| `updated_at` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```go
asset, err := client.Asset(nil).Load(map[string]any{"id": "asset_id"}, nil)
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
}, nil)
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
    "configuration": /* string */,
    "platform": /* string */,
    "version": /* string */,
}, nil)
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
| `added_at` | `string` |  |
| `email` | `string` |  |
| `id` | `string` |  |
| `last_active` | `string` |  |
| `name` | `string` |  |
| `role` | `string` |  |
| `status` | `string` |  |
| `user_id` | `string` |  |

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
    "email": /* string */,
    "role": /* string */,
}, nil)
```


### Deployment

Create an instance: `deployment := client.Deployment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `build_version` | `string` |  |
| `completed_at` | `string` |  |
| `configuration` | `string` |  |
| `created_at` | `string` |  |
| `deployment_url` | `string` |  |
| `download_url` | `string` |  |
| `environment` | `string` |  |
| `id` | `string` |  |
| `platform` | `string` |  |
| `project_id` | `string` |  |
| `release_note` | `string` |  |
| `size` | `int` |  |
| `status` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```go
deployment, err := client.Deployment(nil).Load(map[string]any{"id": "deployment_id"}, nil)
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
}, nil)
```


### Project

Create an instance: `project := client.Project(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `owner` | `map[string]any` |  |
| `setting` | `map[string]any` |  |
| `status` | `string` |  |
| `updated_at` | `string` |  |

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
```


### Test

Create an instance: `test := client.Test(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed_at` | `string` |  |
| `environment` | `string` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `platform` | `string` |  |
| `project_id` | `string` |  |
| `result` | `map[string]any` |  |
| `started_at` | `string` |  |
| `status` | `string` |  |
| `test_suite` | `string` |  |

#### Example: Load

```go
test, err := client.Test(nil).Load(map[string]any{"id": "test_id"}, nil)
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
}, nil)
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
analytics := client.Analytics(nil)
analytics.List(nil, nil)

// analytics.Data() now returns the analytics data from the last list
// analytics.Match() returns the last match criteria
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
