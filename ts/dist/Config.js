"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'GameDevelopment',
        slug: "game-development",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://jenil-ai.vercel.app/api",
        auth: {
            prefix: 'Bearer',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            analytics: {},
            asset: {},
            build: {},
            collaboration: {},
            collaborator: {},
            deployment: {},
            project: {},
            test: {},
        }
    };
    entity = {
        "analytics": {
            "fields": [
                {
                    "name": "count",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "name",
                    "type": "`$STRING`"
                }
            ],
            "name": "analytics",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/projects/{projectId}/analytics/events",
                            "rename": {
                                "param": {
                                    "projectId": "project_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "analytics"
                                },
                                {
                                    "lit": "events"
                                }
                            ],
                            "select": {
                                "$action": "event",
                                "exist": [
                                    "project_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "projects",
                                "{project_id}",
                                "analytics",
                                "events"
                            ]
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "metric",
                                        "orig": "metric",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/projects/{projectId}/analytics",
                            "rename": {
                                "param": {
                                    "projectId": "project_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "analytics"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "end_date",
                                    "metric",
                                    "project_id",
                                    "start_date"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "projects",
                                "{project_id}",
                                "analytics"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "project"
                    ]
                ]
            }
        },
        "asset": {
            "fields": [
                {
                    "format": "date-time",
                    "name": "createdAt",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "mimeType",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "type": "`$STRING`"
                },
                {
                    "name": "projectId",
                    "type": "`$STRING`"
                },
                {
                    "name": "size",
                    "short": "File size in bytes",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "tags",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "type",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "updatedAt",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "url",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "asset",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/projects/{projectId}/assets",
                            "rename": {
                                "param": {
                                    "projectId": "project_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "assets"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "project_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "projects",
                                "{project_id}",
                                "assets"
                            ]
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "example": 50,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "type",
                                        "orig": "type",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/projects/{projectId}/assets",
                            "rename": {
                                "param": {
                                    "projectId": "project_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "assets"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "limit",
                                    "project_id",
                                    "type"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.assets`"
                            },
                            "parts": [
                                "projects",
                                "{project_id}",
                                "assets"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "asset_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/projects/{projectId}/assets/{assetId}",
                            "rename": {
                                "param": {
                                    "assetId": "id",
                                    "projectId": "project_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "assets"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id",
                                    "project_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "projects",
                                "{project_id}",
                                "assets",
                                "{id}"
                            ]
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "asset_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/projects/{projectId}/assets/{assetId}",
                            "rename": {
                                "param": {
                                    "assetId": "id",
                                    "projectId": "project_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "assets"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id",
                                    "project_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "projects",
                                "{project_id}",
                                "assets",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "project"
                    ]
                ]
            }
        },
        "build": {
            "fields": [
                {
                    "name": "configuration",
                    "req": true,
                    "type": "`$STRING`"
                },
                {
                    "name": "platform",
                    "req": true,
                    "type": "`$STRING`"
                },
                {
                    "name": "version",
                    "req": true,
                    "type": "`$STRING`"
                }
            ],
            "name": "build",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/projects/{projectId}/builds",
                            "rename": {
                                "param": {
                                    "projectId": "project_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "builds"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "project_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "projects",
                                "{project_id}",
                                "builds"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "project"
                    ]
                ]
            }
        },
        "collaboration": {
            "fields": [
                {
                    "format": "date-time",
                    "name": "addedAt",
                    "type": "`$STRING`"
                },
                {
                    "format": "email",
                    "name": "email",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "lastActive",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "type": "`$STRING`"
                },
                {
                    "name": "role",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "type": "`$STRING`"
                },
                {
                    "name": "userId",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "collaboration",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/projects/{projectId}/collaborators",
                            "rename": {
                                "param": {
                                    "projectId": "project_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "collaborators"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "project_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.collaborators`"
                            },
                            "parts": [
                                "projects",
                                "{project_id}",
                                "collaborators"
                            ]
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "user_id",
                                        "orig": "user_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/projects/{projectId}/collaborators/{userId}",
                            "rename": {
                                "param": {
                                    "projectId": "project_id",
                                    "userId": "user_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "collaborators"
                                },
                                {
                                    "var": "user_id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "project_id",
                                    "user_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "projects",
                                "{project_id}",
                                "collaborators",
                                "{user_id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "project"
                    ],
                    [
                        "project",
                        "collaborator"
                    ]
                ]
            }
        },
        "collaborator": {
            "fields": [
                {
                    "format": "email",
                    "name": "email",
                    "req": true,
                    "type": "`$STRING`"
                },
                {
                    "name": "role",
                    "req": true,
                    "type": "`$STRING`"
                }
            ],
            "name": "collaborator",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/projects/{projectId}/collaborators",
                            "rename": {
                                "param": {
                                    "projectId": "project_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "collaborators"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "project_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "projects",
                                "{project_id}",
                                "collaborators"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "project"
                    ]
                ]
            }
        },
        "deployment": {
            "fields": [
                {
                    "name": "buildVersion",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "completedAt",
                    "type": "`$STRING`"
                },
                {
                    "name": "configuration",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "createdAt",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "deploymentUrl",
                    "type": "`$STRING`"
                },
                {
                    "format": "uri",
                    "name": "downloadUrl",
                    "type": "`$STRING`"
                },
                {
                    "name": "environment",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "platform",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "type": "`$STRING`"
                },
                {
                    "name": "projectId",
                    "type": "`$STRING`"
                },
                {
                    "name": "releaseNotes",
                    "type": "`$STRING`"
                },
                {
                    "name": "size",
                    "short": "Build size in bytes",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "status",
                    "type": "`$STRING`"
                },
                {
                    "name": "version",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "deployment",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/projects/{projectId}/deployments",
                            "rename": {
                                "param": {
                                    "projectId": "project_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "deployments"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "project_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "projects",
                                "{project_id}",
                                "deployments"
                            ]
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "status",
                                        "orig": "status",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/projects/{projectId}/deployments",
                            "rename": {
                                "param": {
                                    "projectId": "project_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "deployments"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "project_id",
                                    "status"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.deployments`"
                            },
                            "parts": [
                                "projects",
                                "{project_id}",
                                "deployments"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/projects/{projectId}/builds",
                            "rename": {
                                "param": {
                                    "projectId": "project_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "builds"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "project_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.builds`"
                            },
                            "parts": [
                                "projects",
                                "{project_id}",
                                "builds"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "deployment_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/projects/{projectId}/deployments/{deploymentId}",
                            "rename": {
                                "param": {
                                    "deploymentId": "id",
                                    "projectId": "project_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "deployments"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id",
                                    "project_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "projects",
                                "{project_id}",
                                "deployments",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "project"
                    ]
                ]
            }
        },
        "project": {
            "fields": [
                {
                    "format": "date-time",
                    "name": "createdAt",
                    "type": "`$STRING`"
                },
                {
                    "name": "description",
                    "short": "Detailed description of the project",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Unique identifier for the project",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "short": "Name of the game project",
                    "type": "`$STRING`"
                },
                {
                    "name": "owner",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "settings",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "status",
                    "short": "Current status of the project",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "updatedAt",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "project",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/projects",
                            "segments": [
                                {
                                    "lit": "projects"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "projects"
                            ]
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": 20,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "offset",
                                        "orig": "offset",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "status",
                                        "orig": "status",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/projects",
                            "segments": [
                                {
                                    "lit": "projects"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "limit",
                                    "offset",
                                    "status"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.projects`"
                            },
                            "parts": [
                                "projects"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/projects/{projectId}",
                            "rename": {
                                "param": {
                                    "projectId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "projects",
                                "{id}"
                            ]
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/projects/{projectId}",
                            "rename": {
                                "param": {
                                    "projectId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "projects",
                                "{id}"
                            ]
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/projects/{projectId}",
                            "rename": {
                                "param": {
                                    "projectId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "projects",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "test": {
            "fields": [
                {
                    "format": "date-time",
                    "name": "completedAt",
                    "type": "`$STRING`"
                },
                {
                    "name": "duration",
                    "short": "Test duration in seconds",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "environment",
                    "op": {
                        "list": {
                            "type": "`$STRING`"
                        }
                    },
                    "req": true,
                    "type": "`$STRING`"
                },
                {
                    "name": "failed",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "op": {
                        "list": {
                            "type": "`$STRING`"
                        }
                    },
                    "req": true,
                    "type": "`$STRING`"
                },
                {
                    "name": "passed",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "platform",
                    "op": {
                        "list": {
                            "type": "`$STRING`"
                        }
                    },
                    "req": true,
                    "type": "`$STRING`"
                },
                {
                    "name": "projectId",
                    "type": "`$STRING`"
                },
                {
                    "name": "results",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "skipped",
                    "type": "`$INTEGER`"
                },
                {
                    "format": "date-time",
                    "name": "startedAt",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "type": "`$STRING`"
                },
                {
                    "name": "testSuite",
                    "op": {
                        "list": {
                            "type": "`$STRING`"
                        }
                    },
                    "req": true,
                    "type": "`$STRING`"
                },
                {
                    "name": "totalTests",
                    "type": "`$INTEGER`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "test",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/projects/{projectId}/tests",
                            "rename": {
                                "param": {
                                    "projectId": "project_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "tests"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "project_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "parts": [
                                "projects",
                                "{project_id}",
                                "tests"
                            ]
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "status",
                                        "orig": "status",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/projects/{projectId}/tests",
                            "rename": {
                                "param": {
                                    "projectId": "project_id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "tests"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "project_id",
                                    "status"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.tests`"
                            },
                            "parts": [
                                "projects",
                                "{project_id}",
                                "tests"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "test_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "param",
                                        "name": "project_id",
                                        "orig": "project_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/projects/{projectId}/tests/{testId}",
                            "rename": {
                                "param": {
                                    "projectId": "project_id",
                                    "testId": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "projects"
                                },
                                {
                                    "var": "project_id"
                                },
                                {
                                    "lit": "tests"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id",
                                    "project_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "parts": [
                                "projects",
                                "{project_id}",
                                "tests",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "project"
                    ]
                ]
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map