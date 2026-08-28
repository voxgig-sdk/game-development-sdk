# GameDevelopment PHP SDK



The PHP SDK for the GameDevelopment API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Analytics()` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/game-development-sdk/releases](https://github.com/voxgig-sdk/game-development-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'gamedevelopment_sdk.php';

$client = new GameDevelopmentSDK([
    "apikey" => getenv("GAME_DEVELOPMENT_APIKEY"),
]);
```

### 2. List analytics records

```php
try {
    // list() returns an array of Analytics records — iterate directly.
    $analyticss = $client->Analytics()->list();
    foreach ($analyticss as $item) {
        echo $item["count"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load an asset

Asset is nested under project, so provide the `project_id`.

```php
try {
    // load() returns the ENTITY — call data_get() for the Asset record (throws on error).
    $asset = $client->Asset()->load(["project_id" => "example_project_id", "id" => "example_id"]);
    print_r($asset);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created Analytics record.
$created = $client->Analytics()->create(["project_id" => "example_project_id", "eventName" => "example_eventName", "eventType" => "example_eventType"]);

```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $projects = $client->Project()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = GameDevelopmentSDK::test([
    "entity" => ["project" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$project = $client->Project()->list();
print_r($project);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new GameDevelopmentSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
GAME_DEVELOPMENT_TEST_LIVE=TRUE
GAME_DEVELOPMENT_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### GameDevelopmentSDK

```php
require_once 'gamedevelopment_sdk.php';
$client = new GameDevelopmentSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = GameDevelopmentSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### GameDevelopmentSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Analytics` | `($data): AnalyticsEntity` | Create an Analytics entity instance. |
| `Asset` | `($data): AssetEntity` | Create an Asset entity instance. |
| `Build` | `($data): BuildEntity` | Create a Build entity instance. |
| `Collaboration` | `($data): CollaborationEntity` | Create a Collaboration entity instance. |
| `Collaborator` | `($data): CollaboratorEntity` | Create a Collaborator entity instance. |
| `Deployment` | `($data): DeploymentEntity` | Create a Deployment entity instance. |
| `Project` | `($data): ProjectEntity` | Create a Project entity instance. |
| `Test` | `($data): TestEntity` | Create a Test entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$analytics = $client->Analytics();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` |  |
| `eventName` | `string` |  |
| `eventType` | `string` |  |
| `name` | `string` |  |
| `properties` | `array` |  |
| `timestamp` | `string` |  |

#### Example: List

```php
// list() returns an array of Analytics records (throws on error).
$analyticss = $client->Analytics()->list();
```

#### Example: Create

```php
$analytics = $client->Analytics()->create([
    "project_id" => null, // string
    "eventName" => null, // string
    "eventType" => null, // string
]);
```


### Asset

Create an instance: `$asset = $client->Asset();`

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
| `size` | `int` | File size in bytes |
| `tags` | `array` |  |
| `type` | `string` |  |
| `updatedAt` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Asset record (throws on error).
$asset = $client->Asset()->load(["id" => "asset_id", "project_id" => "project_id"]);
```

#### Example: List

```php
// list() returns an array of Asset records (throws on error).
$assets = $client->Asset()->list();
```

#### Example: Create

```php
$asset = $client->Asset()->create([
    "project_id" => null, // string
]);
```


### Build

Create an instance: `$build = $client->Build();`

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

```php
$build = $client->Build()->create([
    "project_id" => null, // string
    "configuration" => null, // string
    "platform" => null, // string
    "version" => null, // string
]);
```


### Collaboration

Create an instance: `$collaboration = $client->Collaboration();`

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

```php
// list() returns an array of Collaboration records (throws on error).
$collaborations = $client->Collaboration()->list();
```


### Collaborator

Create an instance: `$collaborator = $client->Collaborator();`

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

```php
$collaborator = $client->Collaborator()->create([
    "project_id" => null, // string
    "email" => null, // string
    "role" => null, // string
]);
```


### Deployment

Create an instance: `$deployment = $client->Deployment();`

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
| `size` | `int` | Build size in bytes |
| `status` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Deployment record (throws on error).
$deployment = $client->Deployment()->load(["id" => "deployment_id", "project_id" => "project_id"]);
```

#### Example: List

```php
// list() returns an array of Deployment records (throws on error).
$deployments = $client->Deployment()->list();
```

#### Example: Create

```php
$deployment = $client->Deployment()->create([
    "project_id" => null, // string
]);
```


### Project

Create an instance: `$project = $client->Project();`

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
| `owner` | `array` |  |
| `settings` | `array` |  |
| `status` | `string` | Current status of the project |
| `updatedAt` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Project record (throws on error).
$project = $client->Project()->load(["id" => "project_id"]);
```

#### Example: List

```php
// list() returns an array of Project records (throws on error).
$projects = $client->Project()->list();
```

#### Example: Create

```php
$project = $client->Project()->create([
]);
```


### Test

Create an instance: `$test = $client->Test_();`

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
| `duration` | `float` | Test duration in seconds |
| `environment` | `string` |  |
| `failed` | `int` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `passed` | `int` |  |
| `platform` | `string` |  |
| `projectId` | `string` |  |
| `results` | `array` |  |
| `skipped` | `int` |  |
| `startedAt` | `string` |  |
| `status` | `string` |  |
| `testSuite` | `string` |  |
| `totalTests` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Test record (throws on error).
$test = $client->Test_()->load(["id" => "test_id", "project_id" => "project_id"]);
```

#### Example: List

```php
// list() returns an array of Test records (throws on error).
$tests = $client->Test_()->list();
```

#### Example: Create

```php
$test = $client->Test_()->create([
    "project_id" => null, // string
    "environment" => null, // string
    "name" => null, // string
    "platform" => null, // string
    "testSuite" => null, // string
]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── gamedevelopment_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`gamedevelopment_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$project = $client->Project();
$project->list();

// $project->data_get() now returns the project data from the last list
// $project->match_get() returns the last match criteria
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
