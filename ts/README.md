# GameDevelopment TypeScript SDK



The TypeScript SDK for the GameDevelopment API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Analytics()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/game-development-sdk/releases](https://github.com/voxgig-sdk/game-development-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { GameDevelopmentSDK } from '@voxgig-sdk/game-development'

const client = new GameDevelopmentSDK({
  apikey: process.env.GAME_DEVELOPMENT_APIKEY,
})
```

### 2. List analytics records

`list()` resolves to an array of Analytics ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const analyticss = await client.Analytics().list({ project_id: "example" })

for (const analytics of analyticss) {
  console.log(analytics)
}
```

### 3. Load an asset

Asset is nested under project, so provide the `project_id`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const asset = await client.Asset().load({
    project_id: 'example_project_id',
    id: 'example_id',
  })
  console.log(asset)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created Analytics ENTITY (.data() for the record)
const created = await client.Analytics().create({
  project_id: 'example_project_id',
  eventName: 'example_eventName',
  eventType: 'example_eventType',
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const projects = await client.Project().list()
  console.log(projects)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = GameDevelopmentSDK.test()

const project = await client.Project().list()
// project is the entity, populated with mock response data
// — call project.data() for the record itself
console.log(project)
```

You can also use the instance method:

```ts
const client = new GameDevelopmentSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Project()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new GameDevelopmentSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```


## Reference

### GameDevelopmentSDK

#### Constructor

```ts
new GameDevelopmentSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Analytics(data?)` | `AnalyticsEntity` | Create an Analytics entity instance. |
| `Asset(data?)` | `AssetEntity` | Create an Asset entity instance. |
| `Build(data?)` | `BuildEntity` | Create a Build entity instance. |
| `Collaboration(data?)` | `CollaborationEntity` | Create a Collaboration entity instance. |
| `Collaborator(data?)` | `CollaboratorEntity` | Create a Collaborator entity instance. |
| `Deployment(data?)` | `DeploymentEntity` | Create a Deployment entity instance. |
| `Project(data?)` | `ProjectEntity` | Create a Project entity instance. |
| `Test(data?)` | `TestEntity` | Create a Test entity instance. |
| `tester(testopts?, sdkopts?)` | `GameDevelopmentSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `GameDevelopmentSDK.test(testopts?, sdkopts?)` | `GameDevelopmentSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): GameDevelopmentSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: create, list.

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

Operations: create, list, load, remove.

API path: `/projects/{projectId}/assets`

#### Build

| Field | Description |
| --- | --- |
| `configuration` |  |
| `platform` |  |
| `version` |  |

Operations: create.

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

Operations: list, remove.

API path: `/projects/{projectId}/collaborators`

#### Collaborator

| Field | Description |
| --- | --- |
| `email` |  |
| `role` |  |

Operations: create.

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

Operations: create, list, load.

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

Operations: create, list, load, remove, update.

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

Operations: create, list, load.

API path: `/projects/{projectId}/tests`



## Entities


### Analytics

Create an instance: `const analytics = client.Analytics()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` |  |
| `eventName` | `string` |  |
| `eventType` | `string` |  |
| `name` | `string` |  |
| `properties` | `Record<string, any>` |  |
| `timestamp` | `string` |  |

#### Example: List

```ts
const analyticss = await client.Analytics().list({ project_id: "example" })
```

#### Example: Create

```ts
const analytics = await client.Analytics().create({
  project_id: 'example_project_id',
  eventName: 'example_eventName',
  eventType: 'example_eventType',
})
```


### Asset

Create an instance: `const asset = client.Asset()`

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
| `size` | `number` | File size in bytes |
| `tags` | `any[]` |  |
| `type` | `string` |  |
| `updatedAt` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const asset = await client.Asset().load({ id: 'asset_id', project_id: 'project_id' })
```

#### Example: List

```ts
const assets = await client.Asset().list({ project_id: "example" })
```

#### Example: Create

```ts
const asset = await client.Asset().create({
  project_id: 'example_project_id',
})
```


### Build

Create an instance: `const build = client.Build()`

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

```ts
const build = await client.Build().create({
  project_id: 'example_project_id',
  configuration: 'example_configuration',
  platform: 'example_platform',
  version: 'example_version',
})
```


### Collaboration

Create an instance: `const collaboration = client.Collaboration()`

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

```ts
const collaborations = await client.Collaboration().list({ project_id: "example" })
```


### Collaborator

Create an instance: `const collaborator = client.Collaborator()`

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

```ts
const collaborator = await client.Collaborator().create({
  project_id: 'example_project_id',
  email: 'example_email',
  role: 'example_role',
})
```


### Deployment

Create an instance: `const deployment = client.Deployment()`

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
| `size` | `number` | Build size in bytes |
| `status` | `string` |  |
| `version` | `string` |  |

#### Example: Load

```ts
const deployment = await client.Deployment().load({ id: 'deployment_id', project_id: 'project_id' })
```

#### Example: List

```ts
const deployments = await client.Deployment().list({ project_id: "example" })
```

#### Example: Create

```ts
const deployment = await client.Deployment().create({
  project_id: 'example_project_id',
})
```


### Project

Create an instance: `const project = client.Project()`

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
| `owner` | `Record<string, any>` |  |
| `settings` | `Record<string, any>` |  |
| `status` | `string` | Current status of the project |
| `updatedAt` | `string` |  |

#### Example: Load

```ts
const project = await client.Project().load({ id: 'project_id' })
```

#### Example: List

```ts
const projects = await client.Project().list()
```

#### Example: Create

```ts
const project = await client.Project().create({
})
```


### Test

Create an instance: `const test = client.Test()`

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
| `duration` | `number` | Test duration in seconds |
| `environment` | `string` |  |
| `failed` | `number` |  |
| `id` | `string` |  |
| `name` | `string` |  |
| `passed` | `number` |  |
| `platform` | `string` |  |
| `projectId` | `string` |  |
| `results` | `Record<string, any>` |  |
| `skipped` | `number` |  |
| `startedAt` | `string` |  |
| `status` | `string` |  |
| `testSuite` | `string` |  |
| `totalTests` | `number` |  |

#### Example: Load

```ts
const test = await client.Test().load({ id: 'test_id', project_id: 'project_id' })
```

#### Example: List

```ts
const tests = await client.Test().list({ project_id: "example" })
```

#### Example: Create

```ts
const test = await client.Test().create({
  project_id: 'example_project_id',
  environment: 'example_environment',
  name: 'example_name',
  platform: 'example_platform',
  testSuite: 'example_testSuite',
})
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
game-development/
├── src/
│   ├── GameDevelopmentSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { GameDevelopmentSDK } from '@voxgig-sdk/game-development'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const project = client.Project()
await project.list()

// project.data() now returns the project data from the last `list`
// project.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
