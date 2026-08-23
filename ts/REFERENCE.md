# GameDevelopment TypeScript SDK Reference

Complete API reference for the GameDevelopment TypeScript SDK.


## GameDevelopmentSDK

### Constructor

```ts
new GameDevelopmentSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GameDevelopmentSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = GameDevelopmentSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `GameDevelopmentSDK` instance in test mode.


### Instance Methods

#### `Analytics(data?: object)`

Create a new `Analytics` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AnalyticsEntity` instance.

#### `Asset(data?: object)`

Create a new `Asset` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AssetEntity` instance.

#### `Build(data?: object)`

Create a new `Build` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BuildEntity` instance.

#### `Collaboration(data?: object)`

Create a new `Collaboration` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CollaborationEntity` instance.

#### `Collaborator(data?: object)`

Create a new `Collaborator` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CollaboratorEntity` instance.

#### `Deployment(data?: object)`

Create a new `Deployment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DeploymentEntity` instance.

#### `Project(data?: object)`

Create a new `Project` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProjectEntity` instance.

#### `Test(data?: object)`

Create a new `Test` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TestEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `GameDevelopmentSDK.test()`.

**Returns:** `GameDevelopmentSDK` instance in test mode.


---

## AnalyticsEntity

```ts
const analytics = client.Analytics()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `number` | No |  |
| `eventName` | `string` | Yes |  |
| `eventType` | `string` | Yes |  |
| `name` | `string` | No |  |
| `properties` | `Record<string, any>` | No |  |
| `timestamp` | `string` | No |  |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `event` | `/projects/{projectId}/analytics/events` | `client.Analytics().create({ $action: 'event', ... })` |

An action returns that action's OWN response, which is not necessarily a
Analytics record — check the API definition for its shape.

```ts
const result = await client.Analytics().create({
  $action: 'event',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Analytics().create({
  project_id: 'example_project_id',
  eventName: 'example_eventName',
  eventType: 'example_eventType',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Analytics().list({ project_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AnalyticsEntity` instance with the same client and
options.

#### `client()`

Return the parent `GameDevelopmentSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AssetEntity

```ts
const asset = client.Asset()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No |  |
| `id` | `string` | No |  |
| `mimeType` | `string` | No |  |
| `name` | `string` | No |  |
| `projectId` | `string` | No |  |
| `size` | `number` | No | File size in bytes |
| `tags` | `any[]` | No |  |
| `type` | `string` | No |  |
| `updatedAt` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Asset().create({
  project_id: 'example_project_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Asset().list({ project_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Asset().load({ id: 'asset_id', project_id: 'project_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Asset().remove({ id: 'asset_id', project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AssetEntity` instance with the same client and
options.

#### `client()`

Return the parent `GameDevelopmentSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BuildEntity

```ts
const build = client.Build()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `configuration` | `string` | Yes |  |
| `platform` | `string` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Build().create({
  project_id: 'example_project_id',
  configuration: 'example_configuration',
  platform: 'example_platform',
  version: 'example_version',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BuildEntity` instance with the same client and
options.

#### `client()`

Return the parent `GameDevelopmentSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CollaborationEntity

```ts
const collaboration = client.Collaboration()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Collaboration().list({ project_id: "example" })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Collaboration().remove({ project_id: 'project_id', user_id: 'user_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CollaborationEntity` instance with the same client and
options.

#### `client()`

Return the parent `GameDevelopmentSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CollaboratorEntity

```ts
const collaborator = client.Collaborator()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | Yes |  |
| `role` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Collaborator().create({
  project_id: 'example_project_id',
  email: 'example_email',
  role: 'example_role',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CollaboratorEntity` instance with the same client and
options.

#### `client()`

Return the parent `GameDevelopmentSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DeploymentEntity

```ts
const deployment = client.Deployment()
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
| `size` | `number` | No | Build size in bytes |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Deployment().create({
  project_id: 'example_project_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Deployment().list({ project_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Deployment().load({ id: 'deployment_id', project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DeploymentEntity` instance with the same client and
options.

#### `client()`

Return the parent `GameDevelopmentSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProjectEntity

```ts
const project = client.Project()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No |  |
| `description` | `string` | No | Detailed description of the project |
| `id` | `string` | No | Unique identifier for the project |
| `name` | `string` | No | Name of the game project |
| `owner` | `Record<string, any>` | No |  |
| `settings` | `Record<string, any>` | No |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Project().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Project().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Project().load({ id: 'project_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Project().remove({ id: 'project_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Project().update({
  id: 'project_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProjectEntity` instance with the same client and
options.

#### `client()`

Return the parent `GameDevelopmentSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TestEntity

```ts
const test = client.Test()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completedAt` | `string` | No |  |
| `duration` | `number` | No | Test duration in seconds |
| `environment` | `string` | Yes |  |
| `failed` | `number` | No |  |
| `id` | `string` | No |  |
| `name` | `string` | Yes |  |
| `passed` | `number` | No |  |
| `platform` | `string` | Yes |  |
| `projectId` | `string` | No |  |
| `results` | `Record<string, any>` | No |  |
| `skipped` | `number` | No |  |
| `startedAt` | `string` | No |  |
| `status` | `string` | No |  |
| `testSuite` | `string` | Yes |  |
| `totalTests` | `number` | No |  |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Test().create({
  project_id: 'example_project_id',
  environment: 'example_environment',
  name: 'example_name',
  platform: 'example_platform',
  testSuite: 'example_testSuite',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Test().list({ project_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Test().load({ id: 'test_id', project_id: 'project_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TestEntity` instance with the same client and
options.

#### `client()`

Return the parent `GameDevelopmentSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new GameDevelopmentSDK({
  feature: {
    test: { active: true },
  }
})
```

