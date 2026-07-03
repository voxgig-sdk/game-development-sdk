# GameDevelopment SDK

Game Development API client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

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

## Quickstart

### TypeScript

```ts
import { GameDevelopmentSDK } from 'game-development'

const client = new GameDevelopmentSDK({
  apikey: process.env.GAME-DEVELOPMENT_APIKEY,
})

// List all analyticss
const analyticss = await client.Analytics().list()
console.log(analyticss.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

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
| **Analytics** |  | `/projects/{projectId}/analytics/events` |
| **Asset** |  | `/projects/{projectId}/assets` |
| **Build** |  | `/projects/{projectId}/builds` |
| **Collaboration** |  | `/projects/{projectId}/collaborators` |
| **Collaborator** |  | `/projects/{projectId}/collaborators` |
| **Deployment** |  | `/projects/{projectId}/deployments` |
| **Project** |  | `/projects` |
| **Test** |  | `/projects/{projectId}/tests` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from gamedevelopment_sdk import GameDevelopmentSDK

client = GameDevelopmentSDK({
    "apikey": os.environ.get("GAME-DEVELOPMENT_APIKEY"),
})

# List all analyticss
analyticss, err = client.Analytics().list()
print(analyticss)
```

### PHP

```php
<?php
require_once 'gamedevelopment_sdk.php';

$client = new GameDevelopmentSDK([
    "apikey" => getenv("GAME-DEVELOPMENT_APIKEY"),
]);

// List all analyticss
[$analyticss, $err] = $client->Analytics()->list();
print_r($analyticss);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/game-development-sdk/go"

client := sdk.NewGameDevelopmentSDK(map[string]any{
    "apikey": os.Getenv("GAME-DEVELOPMENT_APIKEY"),
})

// List all analyticss
analyticss, err := client.Analytics(nil).List(nil, nil)
fmt.Println(analyticss)
```

### Ruby

```ruby
require_relative "GameDevelopment_sdk"

client = GameDevelopmentSDK.new({
  "apikey" => ENV["GAME-DEVELOPMENT_APIKEY"],
})

# List all analyticss
analyticss, err = client.Analytics().list
puts analyticss
```

### Lua

```lua
local sdk = require("game-development_sdk")

local client = sdk.new({
  apikey = os.getenv("GAME-DEVELOPMENT_APIKEY"),
})

-- List all analyticss
local analyticss, err = client:Analytics():list()
print(analyticss)
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
client = GameDevelopmentSDK.test()
result, err = client.Analytics().load({"id": "test01"})
```

### PHP

```php
$client = GameDevelopmentSDK::test();
[$result, $err] = $client->Analytics()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Analytics(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = GameDevelopmentSDK.test
result, err = client.Analytics().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Analytics():load({ id = "test01" })
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

---

Generated from the Game Development API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
