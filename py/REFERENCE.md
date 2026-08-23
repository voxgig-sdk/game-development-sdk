# GameDevelopment Python SDK Reference

Complete API reference for the GameDevelopment Python SDK.


## GameDevelopmentSDK

### Constructor

```python
from gamedevelopment_sdk import GameDevelopmentSDK

client = GameDevelopmentSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GameDevelopmentSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = GameDevelopmentSDK.test()
```


### Instance Methods

#### `Analytics(data=None)`

Create a new `AnalyticsEntity` instance. Pass `None` for no initial data.

#### `Asset(data=None)`

Create a new `AssetEntity` instance. Pass `None` for no initial data.

#### `Build(data=None)`

Create a new `BuildEntity` instance. Pass `None` for no initial data.

#### `Collaboration(data=None)`

Create a new `CollaborationEntity` instance. Pass `None` for no initial data.

#### `Collaborator(data=None)`

Create a new `CollaboratorEntity` instance. Pass `None` for no initial data.

#### `Deployment(data=None)`

Create a new `DeploymentEntity` instance. Pass `None` for no initial data.

#### `Project(data=None)`

Create a new `ProjectEntity` instance. Pass `None` for no initial data.

#### `Test(data=None)`

Create a new `TestEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AnalyticsEntity

```python
analytics = client.Analytics()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No |  |
| `eventName` | `str` | Yes |  |
| `eventType` | `str` | Yes |  |
| `name` | `str` | No |  |
| `properties` | `dict` | No |  |
| `timestamp` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Analytics().create({
    "project_id": "example_project_id",  # str
    "eventName": "example_eventName",  # str
    "eventType": "example_eventType",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Analytics().list({"project_id": "example"})
for analytics in results:
    print(analytics)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AnalyticsEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AssetEntity

```python
asset = client.Asset()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `str` | No |  |
| `id` | `str` | No |  |
| `mimeType` | `str` | No |  |
| `name` | `str` | No |  |
| `projectId` | `str` | No |  |
| `size` | `int` | No | File size in bytes |
| `tags` | `list` | No |  |
| `type` | `str` | No |  |
| `updatedAt` | `str` | No |  |
| `url` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Asset().create({
    "project_id": "example_project_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Asset().list({"project_id": "example"})
for asset in results:
    print(asset)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Asset().load({"id": "asset_id", "project_id": "project_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Asset().remove({"id": "asset_id", "project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AssetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BuildEntity

```python
build = client.Build()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `configuration` | `str` | Yes |  |
| `platform` | `str` | Yes |  |
| `version` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Build().create({
    "project_id": "example_project_id",  # str
    "configuration": "example_configuration",  # str
    "platform": "example_platform",  # str
    "version": "example_version",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BuildEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CollaborationEntity

```python
collaboration = client.Collaboration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addedAt` | `str` | No |  |
| `email` | `str` | No |  |
| `id` | `str` | No |  |
| `lastActive` | `str` | No |  |
| `name` | `str` | No |  |
| `role` | `str` | No |  |
| `status` | `str` | No |  |
| `userId` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Collaboration().list({"project_id": "example"})
for collaboration in results:
    print(collaboration)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Collaboration().remove({"project_id": "project_id", "user_id": "user_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CollaborationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CollaboratorEntity

```python
collaborator = client.Collaborator()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `str` | Yes |  |
| `role` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Collaborator().create({
    "project_id": "example_project_id",  # str
    "email": "example_email",  # str
    "role": "example_role",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CollaboratorEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DeploymentEntity

```python
deployment = client.Deployment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `buildVersion` | `str` | No |  |
| `completedAt` | `str` | No |  |
| `configuration` | `str` | No |  |
| `createdAt` | `str` | No |  |
| `deploymentUrl` | `str` | No |  |
| `downloadUrl` | `str` | No |  |
| `environment` | `str` | No |  |
| `id` | `str` | No |  |
| `platform` | `str` | No |  |
| `projectId` | `str` | No |  |
| `releaseNotes` | `str` | No |  |
| `size` | `int` | No | Build size in bytes |
| `status` | `str` | No |  |
| `version` | `str` | No |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Deployment().create({
    "project_id": "example_project_id",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Deployment().list({"project_id": "example"})
for deployment in results:
    print(deployment)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Deployment().load({"id": "deployment_id", "project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeploymentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProjectEntity

```python
project = client.Project()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `str` | No |  |
| `description` | `str` | No | Detailed description of the project |
| `id` | `str` | No | Unique identifier for the project |
| `name` | `str` | No | Name of the game project |
| `owner` | `dict` | No |  |
| `settings` | `dict` | No |  |
| `status` | `str` | No | Current status of the project |
| `updatedAt` | `str` | No |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Project().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Project().list()
for project in results:
    print(project)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Project().load({"id": "project_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Project().remove({"id": "project_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Project().update({
    "id": "project_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProjectEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TestEntity

```python
test = client.Test()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completedAt` | `str` | No |  |
| `duration` | `float` | No | Test duration in seconds |
| `environment` | `str` | Yes |  |
| `failed` | `int` | No |  |
| `id` | `str` | No |  |
| `name` | `str` | Yes |  |
| `passed` | `int` | No |  |
| `platform` | `str` | Yes |  |
| `projectId` | `str` | No |  |
| `results` | `dict` | No |  |
| `skipped` | `int` | No |  |
| `startedAt` | `str` | No |  |
| `status` | `str` | No |  |
| `testSuite` | `str` | Yes |  |
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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Test().create({
    "project_id": "example_project_id",  # str
    "environment": "example_environment",  # str
    "name": "example_name",  # str
    "platform": "example_platform",  # str
    "testSuite": "example_testSuite",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Test().list({"project_id": "example"})
for test in results:
    print(test)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Test().load({"id": "test_id", "project_id": "project_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TestEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = GameDevelopmentSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

