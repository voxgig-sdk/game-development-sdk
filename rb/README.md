# GameDevelopment Ruby SDK



The Ruby SDK for the GameDevelopment API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Analytics` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/game-development-sdk/releases](https://github.com/voxgig-sdk/game-development-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "GameDevelopment_sdk"

client = GameDevelopmentSDK.new({
  "apikey" => ENV["GAME_DEVELOPMENT_APIKEY"],
})
```

### 2. List analytics records

```ruby
begin
  # list returns an Array of Analytics records — iterate directly.
  analyticss = client.Analytics.list
  analyticss.each do |item|
    puts "#{item["count"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load an asset

Asset is nested under project, so provide the `project_id`.

```ruby
begin
  # load returns the ENTITY — call data_get for the Asset record (raises on error).
  asset = client.Asset.load({ "project_id" => "example_project_id", "id" => "example_id" })
  puts asset
rescue => err
  warn "load failed: #{err}"
end
```

### 4. Create, update, and remove

```ruby
# create returns the ENTITY — call data_get for the created Analytics record.
created = client.Analytics.create({ "project_id" => "example_project_id", "eventName" => "example_eventName", "eventType" => "example_eventType" })

```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  projects = client.Project.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = GameDevelopmentSDK.test({
  "entity" => { "project" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
project = client.Project.list()
puts project
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = GameDevelopmentSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### GameDevelopmentSDK

```ruby
require_relative "GameDevelopment_sdk"
client = GameDevelopmentSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = GameDevelopmentSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### GameDevelopmentSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `GameDevelopmentError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `analytics = client.Analytics`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `Integer` |  |
| `eventName` | `String` |  |
| `eventType` | `String` |  |
| `name` | `String` |  |
| `properties` | `Hash` |  |
| `timestamp` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Analytics records (raises on error).
analyticss = client.Analytics.list
```

#### Example: Create

```ruby
analytics = client.Analytics.create({
  "project_id" => "example_project_id", # String
  "eventName" => "example_eventName", # String
  "eventType" => "example_eventType", # String
})
```


### Asset

Create an instance: `asset = client.Asset`

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
| `createdAt` | `String` |  |
| `id` | `String` |  |
| `mimeType` | `String` |  |
| `name` | `String` |  |
| `projectId` | `String` |  |
| `size` | `Integer` | File size in bytes |
| `tags` | `Array` |  |
| `type` | `String` |  |
| `updatedAt` | `String` |  |
| `url` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Asset record (raises on error).
asset = client.Asset.load({ "id" => "asset_id", "project_id" => "project_id" })
```

#### Example: List

```ruby
# list returns an Array of Asset records (raises on error).
assets = client.Asset.list
```

#### Example: Create

```ruby
asset = client.Asset.create({
  "project_id" => "example_project_id", # String
})
```


### Build

Create an instance: `build = client.Build`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configuration` | `String` |  |
| `platform` | `String` |  |
| `version` | `String` |  |

#### Example: Create

```ruby
build = client.Build.create({
  "project_id" => "example_project_id", # String
  "configuration" => "example_configuration", # String
  "platform" => "example_platform", # String
  "version" => "example_version", # String
})
```


### Collaboration

Create an instance: `collaboration = client.Collaboration`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addedAt` | `String` |  |
| `email` | `String` |  |
| `id` | `String` |  |
| `lastActive` | `String` |  |
| `name` | `String` |  |
| `role` | `String` |  |
| `status` | `String` |  |
| `userId` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Collaboration records (raises on error).
collaborations = client.Collaboration.list
```


### Collaborator

Create an instance: `collaborator = client.Collaborator`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` |  |
| `role` | `String` |  |

#### Example: Create

```ruby
collaborator = client.Collaborator.create({
  "project_id" => "example_project_id", # String
  "email" => "example_email", # String
  "role" => "example_role", # String
})
```


### Deployment

Create an instance: `deployment = client.Deployment`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `buildVersion` | `String` |  |
| `completedAt` | `String` |  |
| `configuration` | `String` |  |
| `createdAt` | `String` |  |
| `deploymentUrl` | `String` |  |
| `downloadUrl` | `String` |  |
| `environment` | `String` |  |
| `id` | `String` |  |
| `platform` | `String` |  |
| `projectId` | `String` |  |
| `releaseNotes` | `String` |  |
| `size` | `Integer` | Build size in bytes |
| `status` | `String` |  |
| `version` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Deployment record (raises on error).
deployment = client.Deployment.load({ "id" => "deployment_id", "project_id" => "project_id" })
```

#### Example: List

```ruby
# list returns an Array of Deployment records (raises on error).
deployments = client.Deployment.list
```

#### Example: Create

```ruby
deployment = client.Deployment.create({
  "project_id" => "example_project_id", # String
})
```


### Project

Create an instance: `project = client.Project`

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
| `createdAt` | `String` |  |
| `description` | `String` | Detailed description of the project |
| `id` | `String` | Unique identifier for the project |
| `name` | `String` | Name of the game project |
| `owner` | `Hash` |  |
| `settings` | `Hash` |  |
| `status` | `String` | Current status of the project |
| `updatedAt` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Project record (raises on error).
project = client.Project.load({ "id" => "project_id" })
```

#### Example: List

```ruby
# list returns an Array of Project records (raises on error).
projects = client.Project.list
```

#### Example: Create

```ruby
project = client.Project.create({
})
```


### Test

Create an instance: `test = client.Test`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completedAt` | `String` |  |
| `duration` | `Float` | Test duration in seconds |
| `environment` | `String` |  |
| `failed` | `Integer` |  |
| `id` | `String` |  |
| `name` | `String` |  |
| `passed` | `Integer` |  |
| `platform` | `String` |  |
| `projectId` | `String` |  |
| `results` | `Hash` |  |
| `skipped` | `Integer` |  |
| `startedAt` | `String` |  |
| `status` | `String` |  |
| `testSuite` | `String` |  |
| `totalTests` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Test record (raises on error).
test = client.Test.load({ "id" => "test_id", "project_id" => "project_id" })
```

#### Example: List

```ruby
# list returns an Array of Test records (raises on error).
tests = client.Test.list
```

#### Example: Create

```ruby
test = client.Test.create({
  "project_id" => "example_project_id", # String
  "environment" => "example_environment", # String
  "name" => "example_name", # String
  "platform" => "example_platform", # String
  "testSuite" => "example_testSuite", # String
})
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── GameDevelopment_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`GameDevelopment_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
project = client.Project
project.list()

# project.data_get now returns the project data from the last list
# project.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
