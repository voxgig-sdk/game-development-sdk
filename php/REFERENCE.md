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
| `event_name` | `string` | Yes |  |
| `event_type` | `string` | Yes |  |
| `name` | `string` | No |  |
| `property` | `array` | No |  |
| `timestamp` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Analytics()->create([
  "event_name" => null, // string
  "event_type" => null, // string
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
| `created_at` | `string` | No |  |
| `id` | `string` | No |  |
| `mime_type` | `string` | No |  |
| `name` | `string` | No |  |
| `project_id` | `string` | No |  |
| `size` | `int` | No |  |
| `tag` | `array` | No |  |
| `type` | `string` | No |  |
| `updated_at` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Asset()->create([
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
$result = $client->Asset()->load(["id" => "asset_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Asset()->remove(["id" => "asset_id"]);
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
| `added_at` | `string` | No |  |
| `email` | `string` | No |  |
| `id` | `string` | No |  |
| `last_active` | `string` | No |  |
| `name` | `string` | No |  |
| `role` | `string` | No |  |
| `status` | `string` | No |  |
| `user_id` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Collaboration()->list();
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Collaboration()->remove();
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
| `build_version` | `string` | No |  |
| `completed_at` | `string` | No |  |
| `configuration` | `string` | No |  |
| `created_at` | `string` | No |  |
| `deployment_url` | `string` | No |  |
| `download_url` | `string` | No |  |
| `environment` | `string` | No |  |
| `id` | `string` | No |  |
| `platform` | `string` | No |  |
| `project_id` | `string` | No |  |
| `release_note` | `string` | No |  |
| `size` | `int` | No |  |
| `status` | `string` | No |  |
| `version` | `string` | No |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Deployment()->create([
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
$result = $client->Deployment()->load(["id" => "deployment_id"]);
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
| `created_at` | `string` | No |  |
| `description` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `owner` | `array` | No |  |
| `setting` | `array` | No |  |
| `status` | `string` | No |  |
| `updated_at` | `string` | No |  |

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
$test = $client->Test();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed_at` | `string` | No |  |
| `environment` | `string` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `platform` | `string` | No |  |
| `project_id` | `string` | No |  |
| `result` | `array` | No |  |
| `started_at` | `string` | No |  |
| `status` | `string` | No |  |
| `test_suite` | `string` | No |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Test()->create([
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Test()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Test()->load(["id" => "test_id"]);
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

