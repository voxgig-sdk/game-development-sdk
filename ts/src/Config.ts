
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'GameDevelopment',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'https://jenil-ai.vercel.app/api',

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      analytics: {
      },

      asset: {
      },

      build: {
      },

      collaboration: {
      },

      collaborator: {
      },

      deployment: {
      },

      project: {
      },

      test: {
      },

    }
  }


  entity = {
    "analytics": {
      "fields": [
        {
          "active": true,
          "name": "count",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "eventName",
          "req": true,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "eventType",
          "req": true,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "properties",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 4
        },
        {
          "active": true,
          "name": "timestamp",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        }
      ],
      "name": "analytics",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/projects/{projectId}/analytics/events",
              "parts": [
                "projects",
                "{project_id}",
                "analytics",
                "events"
              ],
              "rename": {
                "param": {
                  "projectId": "project_id"
                }
              },
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
              "index$": 0
            }
          ],
          "key$": "create"
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "metric",
                    "orig": "metric",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/projects/{projectId}/analytics",
              "parts": [
                "projects",
                "{project_id}",
                "analytics"
              ],
              "rename": {
                "param": {
                  "projectId": "project_id"
                }
              },
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
              "index$": 0
            }
          ],
          "key$": "list"
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
          "active": true,
          "name": "createdAt",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "mimeType",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "projectId",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "size",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 5
        },
        {
          "active": true,
          "name": "tags",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 6
        },
        {
          "active": true,
          "name": "type",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        },
        {
          "active": true,
          "name": "updatedAt",
          "req": false,
          "type": "`$STRING`",
          "index$": 8
        },
        {
          "active": true,
          "name": "url",
          "req": false,
          "type": "`$STRING`",
          "index$": 9
        }
      ],
      "name": "asset",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/projects/{projectId}/assets",
              "parts": [
                "projects",
                "{project_id}",
                "assets"
              ],
              "rename": {
                "param": {
                  "projectId": "project_id"
                }
              },
              "select": {
                "exist": [
                  "project_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "create"
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "example": 50,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "type",
                    "orig": "type",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/projects/{projectId}/assets",
              "parts": [
                "projects",
                "{project_id}",
                "assets"
              ],
              "rename": {
                "param": {
                  "projectId": "project_id"
                }
              },
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
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "asset_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/projects/{projectId}/assets/{assetId}",
              "parts": [
                "projects",
                "{project_id}",
                "assets",
                "{id}"
              ],
              "rename": {
                "param": {
                  "assetId": "id",
                  "projectId": "project_id"
                }
              },
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
              "index$": 0
            }
          ],
          "key$": "load"
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "asset_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/projects/{projectId}/assets/{assetId}",
              "parts": [
                "projects",
                "{project_id}",
                "assets",
                "{id}"
              ],
              "rename": {
                "param": {
                  "assetId": "id",
                  "projectId": "project_id"
                }
              },
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
              "index$": 0
            }
          ],
          "key$": "remove"
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
          "active": true,
          "name": "configuration",
          "req": true,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "platform",
          "req": true,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "version",
          "req": true,
          "type": "`$STRING`",
          "index$": 2
        }
      ],
      "name": "build",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/projects/{projectId}/builds",
              "parts": [
                "projects",
                "{project_id}",
                "builds"
              ],
              "rename": {
                "param": {
                  "projectId": "project_id"
                }
              },
              "select": {
                "exist": [
                  "project_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "create"
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
          "active": true,
          "name": "addedAt",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "email",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "lastActive",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "role",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "status",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "userId",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        }
      ],
      "name": "collaboration",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/projects/{projectId}/collaborators",
              "parts": [
                "projects",
                "{project_id}",
                "collaborators"
              ],
              "rename": {
                "param": {
                  "projectId": "project_id"
                }
              },
              "select": {
                "exist": [
                  "project_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.collaborators`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "user_id",
                    "orig": "user_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/projects/{projectId}/collaborators/{userId}",
              "parts": [
                "projects",
                "{project_id}",
                "collaborators",
                "{user_id}"
              ],
              "rename": {
                "param": {
                  "projectId": "project_id",
                  "userId": "user_id"
                }
              },
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
              "index$": 0
            }
          ],
          "key$": "remove"
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
          "active": true,
          "name": "email",
          "req": true,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "role",
          "req": true,
          "type": "`$STRING`",
          "index$": 1
        }
      ],
      "name": "collaborator",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/projects/{projectId}/collaborators",
              "parts": [
                "projects",
                "{project_id}",
                "collaborators"
              ],
              "rename": {
                "param": {
                  "projectId": "project_id"
                }
              },
              "select": {
                "exist": [
                  "project_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "create"
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
          "active": true,
          "name": "buildVersion",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "completedAt",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "configuration",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "createdAt",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "deploymentUrl",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "downloadUrl",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "environment",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        },
        {
          "active": true,
          "name": "platform",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "req": false,
          "type": "`$STRING`",
          "index$": 8
        },
        {
          "active": true,
          "name": "projectId",
          "req": false,
          "type": "`$STRING`",
          "index$": 9
        },
        {
          "active": true,
          "name": "releaseNotes",
          "req": false,
          "type": "`$STRING`",
          "index$": 10
        },
        {
          "active": true,
          "name": "size",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 11
        },
        {
          "active": true,
          "name": "status",
          "req": false,
          "type": "`$STRING`",
          "index$": 12
        },
        {
          "active": true,
          "name": "version",
          "req": false,
          "type": "`$STRING`",
          "index$": 13
        }
      ],
      "name": "deployment",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/projects/{projectId}/deployments",
              "parts": [
                "projects",
                "{project_id}",
                "deployments"
              ],
              "rename": {
                "param": {
                  "projectId": "project_id"
                }
              },
              "select": {
                "exist": [
                  "project_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "create"
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "status",
                    "orig": "status",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/projects/{projectId}/deployments",
              "parts": [
                "projects",
                "{project_id}",
                "deployments"
              ],
              "rename": {
                "param": {
                  "projectId": "project_id"
                }
              },
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
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/projects/{projectId}/builds",
              "parts": [
                "projects",
                "{project_id}",
                "builds"
              ],
              "rename": {
                "param": {
                  "projectId": "project_id"
                }
              },
              "select": {
                "exist": [
                  "project_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.builds`"
              },
              "index$": 1
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "deployment_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/projects/{projectId}/deployments/{deploymentId}",
              "parts": [
                "projects",
                "{project_id}",
                "deployments",
                "{id}"
              ],
              "rename": {
                "param": {
                  "deploymentId": "id",
                  "projectId": "project_id"
                }
              },
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
              "index$": 0
            }
          ],
          "key$": "load"
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
          "active": true,
          "name": "createdAt",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "name",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "owner",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 4
        },
        {
          "active": true,
          "name": "settings",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 5
        },
        {
          "active": true,
          "name": "status",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "updatedAt",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        }
      ],
      "name": "project",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/projects",
              "parts": [
                "projects"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "create"
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": 20,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "example": 0,
                    "kind": "query",
                    "name": "offset",
                    "orig": "offset",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "status",
                    "orig": "status",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/projects",
              "parts": [
                "projects"
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
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/projects/{projectId}",
              "parts": [
                "projects",
                "{id}"
              ],
              "rename": {
                "param": {
                  "projectId": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/projects/{projectId}",
              "parts": [
                "projects",
                "{id}"
              ],
              "rename": {
                "param": {
                  "projectId": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "remove"
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/projects/{projectId}",
              "parts": [
                "projects",
                "{id}"
              ],
              "rename": {
                "param": {
                  "projectId": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "update"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "test": {
      "fields": [
        {
          "active": true,
          "name": "completedAt",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "duration",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "environment",
          "op": {
            "list": {
              "req": false,
              "type": "`$STRING`"
            }
          },
          "req": true,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "failed",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "name",
          "op": {
            "list": {
              "req": false,
              "type": "`$STRING`"
            }
          },
          "req": true,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "passed",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 6
        },
        {
          "active": true,
          "name": "platform",
          "op": {
            "list": {
              "req": false,
              "type": "`$STRING`"
            }
          },
          "req": true,
          "type": "`$STRING`",
          "index$": 7
        },
        {
          "active": true,
          "name": "projectId",
          "req": false,
          "type": "`$STRING`",
          "index$": 8
        },
        {
          "active": true,
          "name": "results",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 9
        },
        {
          "active": true,
          "name": "skipped",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 10
        },
        {
          "active": true,
          "name": "startedAt",
          "req": false,
          "type": "`$STRING`",
          "index$": 11
        },
        {
          "active": true,
          "name": "status",
          "req": false,
          "type": "`$STRING`",
          "index$": 12
        },
        {
          "active": true,
          "name": "testSuite",
          "op": {
            "list": {
              "req": false,
              "type": "`$STRING`"
            }
          },
          "req": true,
          "type": "`$STRING`",
          "index$": 13
        },
        {
          "active": true,
          "name": "totalTests",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 14
        }
      ],
      "name": "test",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/projects/{projectId}/tests",
              "parts": [
                "projects",
                "{project_id}",
                "tests"
              ],
              "rename": {
                "param": {
                  "projectId": "project_id"
                }
              },
              "select": {
                "exist": [
                  "project_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              },
              "index$": 0
            }
          ],
          "key$": "create"
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "status",
                    "orig": "status",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/projects/{projectId}/tests",
              "parts": [
                "projects",
                "{project_id}",
                "tests"
              ],
              "rename": {
                "param": {
                  "projectId": "project_id"
                }
              },
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
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "test_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "project_id",
                    "orig": "project_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/projects/{projectId}/tests/{testId}",
              "parts": [
                "projects",
                "{project_id}",
                "tests",
                "{id}"
              ],
              "rename": {
                "param": {
                  "projectId": "project_id",
                  "testId": "id"
                }
              },
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
              "index$": 0
            }
          ],
          "key$": "load"
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
  }
}


const config = new Config()

export {
  config
}

