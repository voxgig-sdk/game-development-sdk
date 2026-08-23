# GameDevelopment PHP SDK Reference

Complete API reference for the GameDevelopment PHP SDK.


## GameDevelopmentSDK

### Constructor

```php
require_once __DIR__ . '/gamedevelopment_sdk.php';

$client = new GameDevelopmentSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GameDevelopmentSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = GameDevelopmentSDK::test();
```


### Instance Methods

#### `Analytics($data = null)`

Create a new `AnalyticsEntity` instance. Pass `null` for no initial data.

#### `Asset($data = null)`

Create a new `AssetEntity` instance. Pass `null` for no initial data.

#### `Build($data = null)`

Create a new `BuildEntity` instance. Pass `null` for no initial data.

#### `Collaboration($data = null)`

Create a new `CollaborationEntity` instance. Pass `null` for no initial data.

#### `Collaborator($data = null)`

Create a new `CollaboratorEntity` instance. Pass `null` for no initial data.

#### `Deployment($data = null)`

Create a new `DeploymentEntity` instance. Pass `null` for no initial data.

#### `Project($data = null)`

Create a new `ProjectEntity` instance. Pass `null` for no initial data.

#### `Test($data = null)`

Create a new `TestEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): GameDevelopmentUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AnalyticsEntity

```php
$analytics = $client->Analytics();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No |  |
| `eventName` | `string` | Yes |  |
| `eventType` | `string` | Yes |  |
| `name` | `string` | No |  |
| `properties` | `array` | No |  |
| `timestamp` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Analytics()->create([
  "project_id" => null, // string
  "eventName" => null, // string
  "eventType" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Analytics()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AnalyticsEntity`

Create a new `AnalyticsEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AssetEntity

```php
$asset = $client->Asset();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No |  |
| `id` | `string` | No |  |
| `mimeType` | `string` | No |  |
| `name` | `string` | No |  |
| `projectId` | `string` | No |  |
| `size` | `int` | No | File size in bytes |
| `tags` | `array` | No |  |
| `type` | `string` | No |  |
| `updatedAt` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Asset()->create([
  "project_id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Asset()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Asset()->load(["id" => "asset_id", "project_id" => "project_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Asset()->remove(["id" => "asset_id", "project_id" => "project_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AssetEntity`

Create a new `AssetEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BuildEntity

```php
$build = $client->Build();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `configuration` | `string` | Yes |  |
| `platform` | `string` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Build()->create([
  "project_id" => null, // string
  "configuration" => null, // string
  "platform" => null, // string
  "version" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BuildEntity`

Create a new `BuildEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CollaborationEntity

```php
$collaboration = $client->Collaboration();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Collaboration()->list();
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Collaboration()->remove(["project_id" => "project_id", "user_id" => "user_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CollaborationEntity`

Create a new `CollaborationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CollaboratorEntity

```php
$collaborator = $client->Collaborator();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `role` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Collaborator()->create([
  "project_id" => null, // string
  "email" => null, // string
  "role" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CollaboratorEntity`

Create a new `CollaboratorEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DeploymentEntity

```php
$deployment = $client->Deployment();
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
| `size` | `int` | No | Build size in bytes |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Deployment()->create([
  "project_id" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Deployment()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Deployment()->load(["id" => "deployment_id", "project_id" => "project_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DeploymentEntity`

Create a new `DeploymentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProjectEntity

```php
$project = $client->Project();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No |  |
| `description` | `string` | No | Detailed description of the project |
| `id` | `string` | No | Unique identifier for the project |
| `name` | `string` | No | Name of the game project |
| `owner` | `array` | No |  |
| `settings` | `array` | No |  |
| `status` | `string` | No | Current status of the project |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Project()->create([
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Project()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Project()->load(["id" => "project_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Project()->remove(["id" => "project_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Project()->update([
  "id" => "project_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProjectEntity`

Create a new `ProjectEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TestEntity

```php
$test = $client->Test_();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completedAt` | `string` | No |  |
| `duration` | `float` | No | Test duration in seconds |
| `environment` | `string` | Yes |  |
| `failed` | `int` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | Yes |  |
| `passed` | `int` | No |  |
| `platform` | `string` | Yes |  |
| `projectId` | `string` | No |  |
| `results` | `array` | No |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Test_()->create([
  "project_id" => null, // string
  "environment" => null, // string
  "name" => null, // string
  "platform" => null, // string
  "testSuite" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Test_()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Test_()->load(["id" => "test_id", "project_id" => "project_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TestEntity`

Create a new `TestEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new GameDevelopmentSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

