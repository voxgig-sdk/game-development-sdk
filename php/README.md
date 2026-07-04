# GameDevelopment PHP SDK



The PHP SDK for the GameDevelopment API — an entity-oriented client using PHP conventions.

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

### 2. List analyticss

```php
try {
    $result = $client->analytics()->list();
    if (is_array($result)) {
        foreach ($result as $item) {
            $d = $item->data_get();
            echo $d["id"] . " " . $d["name"] . "\n";
        }
    }
} catch (\Exception $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// Create
$created = $client->analytics()->create(["name" => "Example"]);

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
    echo "Error: " . $result["err"]->getMessage();
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

Create a mock client for unit testing — no server required:

```php
$client = GameDevelopmentSDK::test();

$result = $client->analytics()->load(["id" => "test01"]);
// $result contains mock response data
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
| `Analytics` | `($data): AnalyticsEntity` | Create a Analytics entity instance. |
| `Asset` | `($data): AssetEntity` | Create a Asset entity instance. |
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
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
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

Entity operations return the bare result data (an `array` for single-entity
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

Create an instance: `const analytics = client.analytics`

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
const analyticss = await client.analytics.list()
```

#### Example: Create

```ts
const analytics = await client.analytics.create({
  event_name: /* `$STRING` */,
  event_type: /* `$STRING` */,
})
```


### Asset

Create an instance: `const asset = client.asset`

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
const asset = await client.asset.load({ id: 'asset_id' })
```

#### Example: List

```ts
const assets = await client.asset.list()
```

#### Example: Create

```ts
const asset = await client.asset.create({
})
```


### Build

Create an instance: `const build = client.build`

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
const build = await client.build.create({
  configuration: /* `$STRING` */,
  platform: /* `$STRING` */,
  version: /* `$STRING` */,
})
```


### Collaboration

Create an instance: `const collaboration = client.collaboration`

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
const collaborations = await client.collaboration.list()
```


### Collaborator

Create an instance: `const collaborator = client.collaborator`

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
const collaborator = await client.collaborator.create({
  email: /* `$STRING` */,
  role: /* `$STRING` */,
})
```


### Deployment

Create an instance: `const deployment = client.deployment`

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
const deployment = await client.deployment.load({ id: 'deployment_id' })
```

#### Example: List

```ts
const deployments = await client.deployment.list()
```

#### Example: Create

```ts
const deployment = await client.deployment.create({
})
```


### Project

Create an instance: `const project = client.project`

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
const project = await client.project.load({ id: 'project_id' })
```

#### Example: List

```ts
const projects = await client.project.list()
```

#### Example: Create

```ts
const project = await client.project.create({
})
```


### Test

Create an instance: `const test = client.test`

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
const test = await client.test.load({ id: 'test_id' })
```

#### Example: List

```ts
const tests = await client.test.list()
```

#### Example: Create

```ts
const test = await client.test.create({
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
error is returned to the caller as the second element in the return array.

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$analytics = $client->analytics();
$analytics->load(["id" => "example_id"]);

// $analytics->dataGet() now returns the loaded analytics data
// $analytics->matchGet() returns the last match criteria
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
