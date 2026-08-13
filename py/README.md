# GameDevelopment Python SDK



The Python SDK for the GameDevelopment API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Analytics()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/game-development-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from gamedevelopment_sdk import GameDevelopmentSDK

client = GameDevelopmentSDK({
    "apikey": os.environ.get("GAME_DEVELOPMENT_APIKEY"),
})
```

### 2. List analytics records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    analyticss = client.Analytics().list({"project_id": "example"})
    for analytics in analyticss:
        print(analytics)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load an asset

Asset is nested under project, so provide the `project_id`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    asset = client.Asset().load({"project_id": "example_project_id", "id": "example_id"})
    print(asset)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.Analytics().create({"project_id": "example_project_id", "eventName": "example_eventName", "eventType": "example_eventType"})

```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    projects = client.Project().list()
    print(projects)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = GameDevelopmentSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
project = client.Project().list()
# project contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = GameDevelopmentSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### GameDevelopmentSDK

```python
from gamedevelopment_sdk import GameDevelopmentSDK

client = GameDevelopmentSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = GameDevelopmentSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### GameDevelopmentSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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
| `size` |  |
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
| `size` |  |
| `status` |  |
| `version` |  |

Operations: Create, List, Load.

API path: `/projects/{projectId}/deployments`

#### Project

| Field | Description |
| --- | --- |
| `createdAt` |  |
| `description` |  |
| `id` |  |
| `name` |  |
| `owner` |  |
| `settings` |  |
| `status` |  |
| `updatedAt` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/projects`

#### Test

| Field | Description |
| --- | --- |
| `completedAt` |  |
| `duration` |  |
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

Create an instance: `analytics = client.Analytics()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` |  |
| `eventName` | `str` |  |
| `eventType` | `str` |  |
| `name` | `str` |  |
| `properties` | `dict` |  |
| `timestamp` | `str` |  |

#### Example: List

```python
analyticss = client.Analytics().list({"project_id": "example"})
```

#### Example: Create

```python
analytics = client.Analytics().create({
    "project_id": "example_project_id",  # str
    "eventName": "example_eventName",  # str
    "eventType": "example_eventType",  # str
})
```


### Asset

Create an instance: `asset = client.Asset()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `str` |  |
| `id` | `str` |  |
| `mimeType` | `str` |  |
| `name` | `str` |  |
| `projectId` | `str` |  |
| `size` | `int` |  |
| `tags` | `list` |  |
| `type` | `str` |  |
| `updatedAt` | `str` |  |
| `url` | `str` |  |

#### Example: Load

```python
asset = client.Asset().load({"id": "asset_id", "project_id": "project_id"})
```

#### Example: List

```python
assets = client.Asset().list({"project_id": "example"})
```

#### Example: Create

```python
asset = client.Asset().create({
    "project_id": "example_project_id",  # str
})
```


### Build

Create an instance: `build = client.Build()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `configuration` | `str` |  |
| `platform` | `str` |  |
| `version` | `str` |  |

#### Example: Create

```python
build = client.Build().create({
    "project_id": "example_project_id",  # str
    "configuration": "example_configuration",  # str
    "platform": "example_platform",  # str
    "version": "example_version",  # str
})
```


### Collaboration

Create an instance: `collaboration = client.Collaboration()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addedAt` | `str` |  |
| `email` | `str` |  |
| `id` | `str` |  |
| `lastActive` | `str` |  |
| `name` | `str` |  |
| `role` | `str` |  |
| `status` | `str` |  |
| `userId` | `str` |  |

#### Example: List

```python
collaborations = client.Collaboration().list({"project_id": "example"})
```


### Collaborator

Create an instance: `collaborator = client.Collaborator()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `str` |  |
| `role` | `str` |  |

#### Example: Create

```python
collaborator = client.Collaborator().create({
    "project_id": "example_project_id",  # str
    "email": "example_email",  # str
    "role": "example_role",  # str
})
```


### Deployment

Create an instance: `deployment = client.Deployment()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `buildVersion` | `str` |  |
| `completedAt` | `str` |  |
| `configuration` | `str` |  |
| `createdAt` | `str` |  |
| `deploymentUrl` | `str` |  |
| `downloadUrl` | `str` |  |
| `environment` | `str` |  |
| `id` | `str` |  |
| `platform` | `str` |  |
| `projectId` | `str` |  |
| `releaseNotes` | `str` |  |
| `size` | `int` |  |
| `status` | `str` |  |
| `version` | `str` |  |

#### Example: Load

```python
deployment = client.Deployment().load({"id": "deployment_id", "project_id": "project_id"})
```

#### Example: List

```python
deployments = client.Deployment().list({"project_id": "example"})
```

#### Example: Create

```python
deployment = client.Deployment().create({
    "project_id": "example_project_id",  # str
})
```


### Project

Create an instance: `project = client.Project()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `str` |  |
| `description` | `str` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `owner` | `dict` |  |
| `settings` | `dict` |  |
| `status` | `str` |  |
| `updatedAt` | `str` |  |

#### Example: Load

```python
project = client.Project().load({"id": "project_id"})
```

#### Example: List

```python
projects = client.Project().list()
```

#### Example: Create

```python
project = client.Project().create({
})
```


### Test

Create an instance: `test = client.Test()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completedAt` | `str` |  |
| `duration` | `float` |  |
| `environment` | `str` |  |
| `failed` | `int` |  |
| `id` | `str` |  |
| `name` | `str` |  |
| `passed` | `int` |  |
| `platform` | `str` |  |
| `projectId` | `str` |  |
| `results` | `dict` |  |
| `skipped` | `int` |  |
| `startedAt` | `str` |  |
| `status` | `str` |  |
| `testSuite` | `str` |  |
| `totalTests` | `int` |  |

#### Example: Load

```python
test = client.Test().load({"id": "test_id", "project_id": "project_id"})
```

#### Example: List

```python
tests = client.Test().list({"project_id": "example"})
```

#### Example: Create

```python
test = client.Test().create({
    "project_id": "example_project_id",  # str
    "environment": "example_environment",  # str
    "name": "example_name",  # str
    "platform": "example_platform",  # str
    "testSuite": "example_testSuite",  # str
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── gamedevelopment_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`gamedevelopment_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
project = client.Project()
project.list()

# project.data_get() now returns the project data from the last list
# project.match_get() returns the last match criteria
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
