package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "GameDevelopment",
			"slug": "game-development",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://jenil-ai.vercel.app/api",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"analytics": map[string]any{},
				"asset": map[string]any{},
				"build": map[string]any{},
				"collaboration": map[string]any{},
				"collaborator": map[string]any{},
				"deployment": map[string]any{},
				"project": map[string]any{},
				"test": map[string]any{},
			},
		},
		"entity": map[string]any{
			"analytics": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "count",
						"title": "Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
				},
				"name": "analytics",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/projects/{projectId}/analytics/events",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "analytics",
									},
									map[string]any{
										"lit": "events",
									},
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"analytics",
									"events",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"projectId": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "event",
									"exist": []any{
										"project_id",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/projects/{projectId}/analytics",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "analytics",
									},
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"analytics",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"projectId": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "end_date",
											"orig": "end_date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "metric",
											"orig": "metric",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "start_date",
											"orig": "start_date",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"end_date",
										"metric",
										"project_id",
										"start_date",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.project",
						},
					},
				},
			},
			"asset": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mimeType",
						"title": "Mime Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "projectId",
						"title": "Project Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "size",
						"title": "Size",
						"type": "`$INTEGER`",
						"short": "File size in bytes",
					},
					map[string]any{
						"name": "tags",
						"title": "Tags",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updatedAt",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"format": "uri",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "asset",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/projects/{projectId}/assets",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "assets",
									},
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"assets",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"projectId": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"project_id",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/projects/{projectId}/assets",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "assets",
									},
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"assets",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"projectId": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.assets`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"project_id",
										"type",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/projects/{projectId}/assets/{assetId}",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "assets",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"assets",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"assetId": "id",
										"projectId": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "asset_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"project_id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/projects/{projectId}/assets/{assetId}",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "assets",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"assets",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"assetId": "id",
										"projectId": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "asset_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"project_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.project",
						},
					},
				},
			},
			"build": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "configuration",
						"title": "Configuration",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "platform",
						"title": "Platform",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "build",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/projects/{projectId}/builds",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "builds",
									},
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"builds",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"projectId": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"project_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.project",
						},
					},
				},
			},
			"collaboration": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "addedAt",
						"title": "Added At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"format": "email",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lastActive",
						"title": "Last Active",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "role",
						"title": "Role",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "userId",
						"title": "User Id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "collaboration",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/projects/{projectId}/collaborators",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "collaborators",
									},
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"collaborators",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"projectId": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.collaborators`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"project_id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/projects/{projectId}/collaborators/{userId}",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "collaborators",
									},
									map[string]any{
										"var": "user_id",
									},
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"collaborators",
									"{user_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"projectId": "project_id",
										"userId": "user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"project_id",
										"user_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.project",
						},
						[]any{
							"$.main.kit.entity.project",
							"$.main.kit.entity.collaborator",
						},
					},
				},
			},
			"collaborator": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"req": true,
						"format": "email",
					},
					map[string]any{
						"name": "role",
						"title": "Role",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "collaborator",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/projects/{projectId}/collaborators",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "collaborators",
									},
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"collaborators",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"projectId": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"project_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.project",
						},
					},
				},
			},
			"deployment": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "buildVersion",
						"title": "Build Version",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "completedAt",
						"title": "Completed At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "configuration",
						"title": "Configuration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "deploymentUrl",
						"title": "Deployment Url",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "downloadUrl",
						"title": "Download Url",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "environment",
						"title": "Environment",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "platform",
						"title": "Platform",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "projectId",
						"title": "Project Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "releaseNotes",
						"title": "Release Notes",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "size",
						"title": "Size",
						"type": "`$INTEGER`",
						"short": "Build size in bytes",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "deployment",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/projects/{projectId}/deployments",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "deployments",
									},
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"deployments",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"projectId": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"project_id",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/projects/{projectId}/deployments",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "deployments",
									},
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"deployments",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"projectId": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.deployments`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"project_id",
										"status",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/projects/{projectId}/builds",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "builds",
									},
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"builds",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"projectId": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.builds`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"project_id",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/projects/{projectId}/deployments/{deploymentId}",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "deployments",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"deployments",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"deploymentId": "id",
										"projectId": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "deployment_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"project_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.project",
						},
					},
				},
			},
			"project": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Detailed description of the project",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique identifier for the project",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "Name of the game project",
					},
					map[string]any{
						"name": "owner",
						"title": "Owner",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "settings",
						"title": "Settings",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Current status of the project",
					},
					map[string]any{
						"name": "updatedAt",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "project",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/projects",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
								},
								"parts": []any{
									"projects",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/projects",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
								},
								"parts": []any{
									"projects",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.projects`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
										"status",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/projects/{projectId}",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"projects",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"projectId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/projects/{projectId}",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"projects",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"projectId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/projects/{projectId}",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"projects",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"projectId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"test": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "completedAt",
						"title": "Completed At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "duration",
						"title": "Duration",
						"type": "`$NUMBER`",
						"short": "Test duration in seconds",
					},
					map[string]any{
						"name": "environment",
						"title": "Environment",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "failed",
						"title": "Failed",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "passed",
						"title": "Passed",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "platform",
						"title": "Platform",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "projectId",
						"title": "Project Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "results",
						"title": "Results",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "skipped",
						"title": "Skipped",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "startedAt",
						"title": "Started At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "testSuite",
						"title": "Test Suite",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
					map[string]any{
						"name": "totalTests",
						"title": "Total Tests",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "test",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/projects/{projectId}/tests",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "tests",
									},
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"tests",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"projectId": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"project_id",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/projects/{projectId}/tests",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "tests",
									},
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"tests",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"projectId": "project_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.tests`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"project_id",
										"status",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/projects/{projectId}/tests/{testId}",
								"segments": []any{
									map[string]any{
										"lit": "projects",
									},
									map[string]any{
										"var": "project_id",
									},
									map[string]any{
										"lit": "tests",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"projects",
									"{project_id}",
									"tests",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"projectId": "project_id",
										"testId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "test_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "project_id",
											"orig": "project_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"project_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.project",
						},
					},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
