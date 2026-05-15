# GameDevelopment TypeScript SDK

The TypeScript SDK for the GameDevelopment API. Provides a type-safe, entity-oriented interface with full async/await support.


## Install
```bash
npm install game-development
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { GameDevelopmentSDK } from 'game-development'

const client = new GameDevelopmentSDK({
  apikey: process.env.GAME-DEVELOPMENT_APIKEY,
})
```

### 2. List analyticss

```ts
const result = await client.Analytics().list()

if (result.ok) {
  for (const item of result.data) {
    console.log(item.id, item.name)
  }
}
```

### 4. Create, update, and remove

```ts
// Create
const created = await client.Analytics().create({
  name: 'Example',
})

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

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new GameDevelopmentSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
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
GAME-DEVELOPMENT_TEST_LIVE=TRUE
GAME-DEVELOPMENT_APIKEY=<your-key>
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
| `Analytics(data?)` | `AnalyticsEntity` | Create a Analytics entity instance. |
| `Asset(data?)` | `AssetEntity` | Create a Asset entity instance. |
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
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): GameDevelopmentSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

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
| `event_name` |  |
| `event_type` |  |
| `name` |  |
| `property` |  |
| `timestamp` |  |

Operations: create, list.

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
| `added_at` |  |
| `email` |  |
| `id` |  |
| `last_active` |  |
| `name` |  |
| `role` |  |
| `status` |  |
| `user_id` |  |

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

Operations: create, list, load.

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

Operations: create, list, load, remove, update.

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
| `count` | ``$INTEGER`` |  |
| `event_name` | ``$STRING`` |  |
| `event_type` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `property` | ``$OBJECT`` |  |
| `timestamp` | ``$STRING`` |  |

#### Example: List

```ts
const analyticss = await client.Analytics().list()
```

#### Example: Create

```ts
const analytics = await client.Analytics().create({
  event_name: /* `$STRING` */,
  event_type: /* `$STRING` */,
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
const asset = await client.Asset().load({ id: 'asset_id' })
```

#### Example: List

```ts
const assets = await client.Asset().list()
```

#### Example: Create

```ts
const asset = await client.Asset().create({
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
| `configuration` | ``$STRING`` |  |
| `platform` | ``$STRING`` |  |
| `version` | ``$STRING`` |  |

#### Example: Create

```ts
const build = await client.Build().create({
  configuration: /* `$STRING` */,
  platform: /* `$STRING` */,
  version: /* `$STRING` */,
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
const collaborations = await client.Collaboration().list()
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
| `email` | ``$STRING`` |  |
| `role` | ``$STRING`` |  |

#### Example: Create

```ts
const collaborator = await client.Collaborator().create({
  email: /* `$STRING` */,
  role: /* `$STRING` */,
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
const deployment = await client.Deployment().load({ id: 'deployment_id' })
```

#### Example: List

```ts
const deployments = await client.Deployment().list()
```

#### Example: Create

```ts
const deployment = await client.Deployment().create({
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
const test = await client.Test().load({ id: 'test_id' })
```

#### Example: List

```ts
const tests = await client.Test().list()
```

#### Example: Create

```ts
const test = await client.Test().create({
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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

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
import { GameDevelopmentSDK } from 'game-development'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
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
