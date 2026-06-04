# GameDevelopment SDK

Build, test, and deploy games with project, asset, and collaboration endpoints

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Game Development API

The Game Development API at `https://jenil-ai.vercel.app/api` exposes a set of endpoints aimed at the game-building workflow: managing projects and their assets, coordinating collaborators, running tests, producing builds, and tracking deployments and analytics.

The SDK is generated from the API's OpenAPI description, which groups operations around game projects and the resources attached to them — assets, builds, deployments, tests, collaborators, collaboration activity, and analytics events.

The upstream API does not publish a separate documentation page or licence statement that this SDK can mirror, so authentication, rate limits, and terms of use should be confirmed directly with the API host before relying on it in production.

## Try it

**TypeScript**
```bash
npm install game-development
```

**Python**
```bash
pip install game-development-sdk
```

**PHP**
```bash
composer require voxgig/game-development-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/game-development-sdk/go
```

**Ruby**
```bash
gem install game-development-sdk
```

**Lua**
```bash
luarocks install game-development-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { GameDevelopmentSDK } from 'game-development'

const client = new GameDevelopmentSDK({})

// List all analyticss
const analyticss = await client.Analytics().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o game-development-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "game-development": {
      "command": "/abs/path/to/game-development-mcp"
    }
  }
}
```

## Entities

The API exposes 8 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Analytics** | Analytics data captured for a game project, such as usage or performance metrics surfaced by the API. | `/projects/{projectId}/analytics/events` |
| **Asset** | A game asset (art, audio, data, or other content) associated with a project. | `/projects/{projectId}/assets` |
| **Build** | A build artefact produced from a project's source and assets. | `/projects/{projectId}/builds` |
| **Collaboration** | A collaboration record or activity stream tracking shared work on a project. | `/projects/{projectId}/collaborators` |
| **Collaborator** | A user who has access to contribute to a project. | `/projects/{projectId}/collaborators` |
| **Deployment** | A deployment of a build to a target environment. | `/projects/{projectId}/deployments` |
| **Project** | A game project, the top-level container that owns assets, builds, collaborators, tests, deployments, and analytics. | `/projects` |
| **Test** | A test run or test definition associated with a project's build. | `/projects/{projectId}/tests` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from gamedevelopment_sdk import GameDevelopmentSDK

client = GameDevelopmentSDK({})

# List all analyticss
analyticss, err = client.Analytics(None).list(None, None)
```

### PHP

```php
<?php
require_once 'gamedevelopment_sdk.php';

$client = new GameDevelopmentSDK([]);

// List all analyticss
[$analyticss, $err] = $client->Analytics(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/game-development-sdk/go"

client := sdk.NewGameDevelopmentSDK(map[string]any{})

// List all analyticss
analyticss, err := client.Analytics(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "GameDevelopment_sdk"

client = GameDevelopmentSDK.new({})

# List all analyticss
analyticss, err = client.Analytics(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("game-development_sdk")

local client = sdk.new({})

-- List all analyticss
local analyticss, err = client:Analytics(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = GameDevelopmentSDK.test()
const result = await client.Analytics().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = GameDevelopmentSDK.test(None, None)
result, err = client.Analytics(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = GameDevelopmentSDK::test(null, null);
[$result, $err] = $client->Analytics(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Analytics(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = GameDevelopmentSDK.test(nil, nil)
result, err = client.Analytics(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Analytics(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Game Development API

- Upstream: [https://jenil-ai.vercel.app/api](https://jenil-ai.vercel.app/api)

---

Generated from the Game Development API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
