-- ProjectName SDK configuration

local function make_config()
  return {
    main = {
      name = "GameDevelopment",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://jenil-ai.vercel.app/api",
      auth = {
        prefix = "Bearer",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["analytics"] = {},
        ["asset"] = {},
        ["build"] = {},
        ["collaboration"] = {},
        ["collaborator"] = {},
        ["deployment"] = {},
        ["project"] = {},
        ["test"] = {},
      },
    },
    entity = {
      ["analytics"] = {
        ["fields"] = {
          {
            ["name"] = "count",
            ["req"] = false,
            ["type"] = "`$INTEGER`",
            ["active"] = true,
            ["index$"] = 0,
          },
          {
            ["name"] = "event_name",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 1,
          },
          {
            ["name"] = "event_type",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 2,
          },
          {
            ["name"] = "name",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 3,
          },
          {
            ["name"] = "property",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["active"] = true,
            ["index$"] = 4,
          },
          {
            ["name"] = "timestamp",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 5,
          },
        },
        ["name"] = "analytics",
        ["op"] = {
          ["create"] = {
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                },
                ["method"] = "POST",
                ["orig"] = "/projects/{projectId}/analytics/events",
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "analytics",
                  "events",
                },
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "project_id",
                  },
                },
                ["select"] = {
                  ["$action"] = "event",
                  ["exist"] = {
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "create",
          },
          ["list"] = {
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "end_date",
                      ["orig"] = "end_date",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "metric",
                      ["orig"] = "metric",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "start_date",
                      ["orig"] = "start_date",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/projects/{projectId}/analytics",
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "analytics",
                },
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "project_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "end_date",
                    "metric",
                    "project_id",
                    "start_date",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "list",
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "project",
            },
          },
        },
      },
      ["asset"] = {
        ["fields"] = {
          {
            ["name"] = "created_at",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 0,
          },
          {
            ["name"] = "id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 1,
          },
          {
            ["name"] = "mime_type",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 2,
          },
          {
            ["name"] = "name",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 3,
          },
          {
            ["name"] = "project_id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 4,
          },
          {
            ["name"] = "size",
            ["req"] = false,
            ["type"] = "`$INTEGER`",
            ["active"] = true,
            ["index$"] = 5,
          },
          {
            ["name"] = "tag",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["active"] = true,
            ["index$"] = 6,
          },
          {
            ["name"] = "type",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 7,
          },
          {
            ["name"] = "updated_at",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 8,
          },
          {
            ["name"] = "url",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 9,
          },
        },
        ["name"] = "asset",
        ["op"] = {
          ["create"] = {
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                },
                ["method"] = "POST",
                ["orig"] = "/projects/{projectId}/assets",
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "assets",
                },
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "project_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "create",
          },
          ["list"] = {
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = 50,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["reqd"] = false,
                      ["type"] = "`$INTEGER`",
                      ["active"] = true,
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/projects/{projectId}/assets",
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "assets",
                },
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "project_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "limit",
                    "project_id",
                    "type",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "list",
          },
          ["load"] = {
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "asset_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/projects/{projectId}/assets/{assetId}",
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "assets",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["assetId"] = "id",
                    ["projectId"] = "project_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "load",
          },
          ["remove"] = {
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "asset_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                },
                ["method"] = "DELETE",
                ["orig"] = "/projects/{projectId}/assets/{assetId}",
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "assets",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["assetId"] = "id",
                    ["projectId"] = "project_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "remove",
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "project",
            },
          },
        },
      },
      ["build"] = {
        ["fields"] = {
          {
            ["name"] = "configuration",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 0,
          },
          {
            ["name"] = "platform",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 1,
          },
          {
            ["name"] = "version",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 2,
          },
        },
        ["name"] = "build",
        ["op"] = {
          ["create"] = {
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                },
                ["method"] = "POST",
                ["orig"] = "/projects/{projectId}/builds",
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "builds",
                },
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "project_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "create",
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "project",
            },
          },
        },
      },
      ["collaboration"] = {
        ["fields"] = {
          {
            ["name"] = "added_at",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 0,
          },
          {
            ["name"] = "email",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 1,
          },
          {
            ["name"] = "id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 2,
          },
          {
            ["name"] = "last_active",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 3,
          },
          {
            ["name"] = "name",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 4,
          },
          {
            ["name"] = "role",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 5,
          },
          {
            ["name"] = "status",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 6,
          },
          {
            ["name"] = "user_id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 7,
          },
        },
        ["name"] = "collaboration",
        ["op"] = {
          ["list"] = {
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/projects/{projectId}/collaborators",
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "collaborators",
                },
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "project_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "list",
          },
          ["remove"] = {
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "user_id",
                      ["orig"] = "user_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                },
                ["method"] = "DELETE",
                ["orig"] = "/projects/{projectId}/collaborators/{userId}",
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "collaborators",
                  "{user_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "project_id",
                    ["userId"] = "user_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "project_id",
                    "user_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "remove",
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "project",
            },
            {
              "project",
              "collaborator",
            },
          },
        },
      },
      ["collaborator"] = {
        ["fields"] = {
          {
            ["name"] = "email",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 0,
          },
          {
            ["name"] = "role",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 1,
          },
        },
        ["name"] = "collaborator",
        ["op"] = {
          ["create"] = {
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                },
                ["method"] = "POST",
                ["orig"] = "/projects/{projectId}/collaborators",
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "collaborators",
                },
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "project_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "create",
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "project",
            },
          },
        },
      },
      ["deployment"] = {
        ["fields"] = {
          {
            ["name"] = "build_version",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 0,
          },
          {
            ["name"] = "completed_at",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 1,
          },
          {
            ["name"] = "configuration",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 2,
          },
          {
            ["name"] = "created_at",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 3,
          },
          {
            ["name"] = "deployment_url",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 4,
          },
          {
            ["name"] = "download_url",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 5,
          },
          {
            ["name"] = "environment",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 6,
          },
          {
            ["name"] = "id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 7,
          },
          {
            ["name"] = "platform",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 8,
          },
          {
            ["name"] = "project_id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 9,
          },
          {
            ["name"] = "release_note",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 10,
          },
          {
            ["name"] = "size",
            ["req"] = false,
            ["type"] = "`$INTEGER`",
            ["active"] = true,
            ["index$"] = 11,
          },
          {
            ["name"] = "status",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 12,
          },
          {
            ["name"] = "version",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 13,
          },
        },
        ["name"] = "deployment",
        ["op"] = {
          ["create"] = {
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                },
                ["method"] = "POST",
                ["orig"] = "/projects/{projectId}/deployments",
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "deployments",
                },
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "project_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "create",
          },
          ["list"] = {
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "status",
                      ["orig"] = "status",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/projects/{projectId}/deployments",
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "deployments",
                },
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "project_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "project_id",
                    "status",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/projects/{projectId}/builds",
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "builds",
                },
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "project_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 1,
              },
            },
            ["input"] = "data",
            ["key$"] = "list",
          },
          ["load"] = {
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "deployment_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/projects/{projectId}/deployments/{deploymentId}",
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "deployments",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["deploymentId"] = "id",
                    ["projectId"] = "project_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "project",
            },
          },
        },
      },
      ["project"] = {
        ["fields"] = {
          {
            ["name"] = "created_at",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 0,
          },
          {
            ["name"] = "description",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 1,
          },
          {
            ["name"] = "id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 2,
          },
          {
            ["name"] = "name",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 3,
          },
          {
            ["name"] = "owner",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["active"] = true,
            ["index$"] = 4,
          },
          {
            ["name"] = "setting",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["active"] = true,
            ["index$"] = 5,
          },
          {
            ["name"] = "status",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 6,
          },
          {
            ["name"] = "updated_at",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 7,
          },
        },
        ["name"] = "project",
        ["op"] = {
          ["create"] = {
            ["name"] = "create",
            ["points"] = {
              {
                ["method"] = "POST",
                ["orig"] = "/projects",
                ["parts"] = {
                  "projects",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["args"] = {},
                ["select"] = {},
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "create",
          },
          ["list"] = {
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 20,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["reqd"] = false,
                      ["type"] = "`$INTEGER`",
                      ["active"] = true,
                    },
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["reqd"] = false,
                      ["type"] = "`$INTEGER`",
                      ["active"] = true,
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "status",
                      ["orig"] = "status",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/projects",
                ["parts"] = {
                  "projects",
                },
                ["select"] = {
                  ["exist"] = {
                    "limit",
                    "offset",
                    "status",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "list",
          },
          ["load"] = {
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/projects/{projectId}",
                ["parts"] = {
                  "projects",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "load",
          },
          ["remove"] = {
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                },
                ["method"] = "DELETE",
                ["orig"] = "/projects/{projectId}",
                ["parts"] = {
                  "projects",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "remove",
          },
          ["update"] = {
            ["name"] = "update",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                },
                ["method"] = "PUT",
                ["orig"] = "/projects/{projectId}",
                ["parts"] = {
                  "projects",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "update",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["test"] = {
        ["fields"] = {
          {
            ["name"] = "completed_at",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 0,
          },
          {
            ["name"] = "environment",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 1,
          },
          {
            ["name"] = "id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 2,
          },
          {
            ["name"] = "name",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 3,
          },
          {
            ["name"] = "platform",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 4,
          },
          {
            ["name"] = "project_id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 5,
          },
          {
            ["name"] = "result",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["active"] = true,
            ["index$"] = 6,
          },
          {
            ["name"] = "started_at",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 7,
          },
          {
            ["name"] = "status",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 8,
          },
          {
            ["name"] = "test_suite",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["active"] = true,
            ["index$"] = 9,
          },
        },
        ["name"] = "test",
        ["op"] = {
          ["create"] = {
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                },
                ["method"] = "POST",
                ["orig"] = "/projects/{projectId}/tests",
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "tests",
                },
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "project_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "create",
          },
          ["list"] = {
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "status",
                      ["orig"] = "status",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/projects/{projectId}/tests",
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "tests",
                },
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "project_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "project_id",
                    "status",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "list",
          },
          ["load"] = {
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "test_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "project_id",
                      ["orig"] = "project_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["active"] = true,
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/projects/{projectId}/tests/{testId}",
                ["parts"] = {
                  "projects",
                  "{project_id}",
                  "tests",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["projectId"] = "project_id",
                    ["testId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "project_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["active"] = true,
                ["index$"] = 0,
              },
            },
            ["input"] = "data",
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "project",
            },
          },
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
