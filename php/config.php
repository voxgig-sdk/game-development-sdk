<?php
declare(strict_types=1);

// GameDevelopment SDK configuration

class GameDevelopmentConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "GameDevelopment",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://jenil-ai.vercel.app/api",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "analytics" => [],
                    "asset" => [],
                    "build" => [],
                    "collaboration" => [],
                    "collaborator" => [],
                    "deployment" => [],
                    "project" => [],
                    "test" => [],
                ],
            ],
            "entity" => [
        'analytics' => [
          'fields' => [
            [
              'name' => 'count',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'eventName',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'eventType',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'properties',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'timestamp',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'analytics',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/projects/{projectId}/analytics/events',
                  'parts' => [
                    'projects',
                    '{project_id}',
                    'analytics',
                    'events',
                  ],
                  'rename' => [
                    'param' => [
                      'projectId' => 'project_id',
                    ],
                  ],
                  'select' => [
                    '$action' => 'event',
                    'exist' => [
                      'project_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'end_date',
                        'orig' => 'end_date',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'metric',
                        'orig' => 'metric',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'start_date',
                        'orig' => 'start_date',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/projects/{projectId}/analytics',
                  'parts' => [
                    'projects',
                    '{project_id}',
                    'analytics',
                  ],
                  'rename' => [
                    'param' => [
                      'projectId' => 'project_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'end_date',
                      'metric',
                      'project_id',
                      'start_date',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'project',
              ],
            ],
          ],
        ],
        'asset' => [
          'fields' => [
            [
              'name' => 'createdAt',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'mimeType',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'projectId',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'size',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'tags',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'type',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'updatedAt',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'asset',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/projects/{projectId}/assets',
                  'parts' => [
                    'projects',
                    '{project_id}',
                    'assets',
                  ],
                  'rename' => [
                    'param' => [
                      'projectId' => 'project_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'project_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 50,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'type',
                        'orig' => 'type',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/projects/{projectId}/assets',
                  'parts' => [
                    'projects',
                    '{project_id}',
                    'assets',
                  ],
                  'rename' => [
                    'param' => [
                      'projectId' => 'project_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'project_id',
                      'type',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.assets`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'asset_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/projects/{projectId}/assets/{assetId}',
                  'parts' => [
                    'projects',
                    '{project_id}',
                    'assets',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'assetId' => 'id',
                      'projectId' => 'project_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                      'project_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'asset_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/projects/{projectId}/assets/{assetId}',
                  'parts' => [
                    'projects',
                    '{project_id}',
                    'assets',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'assetId' => 'id',
                      'projectId' => 'project_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                      'project_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'project',
              ],
            ],
          ],
        ],
        'build' => [
          'fields' => [
            [
              'name' => 'configuration',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'platform',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'version',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'build',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/projects/{projectId}/builds',
                  'parts' => [
                    'projects',
                    '{project_id}',
                    'builds',
                  ],
                  'rename' => [
                    'param' => [
                      'projectId' => 'project_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'project_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'project',
              ],
            ],
          ],
        ],
        'collaboration' => [
          'fields' => [
            [
              'name' => 'addedAt',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'email',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'lastActive',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'role',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'userId',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'collaboration',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/projects/{projectId}/collaborators',
                  'parts' => [
                    'projects',
                    '{project_id}',
                    'collaborators',
                  ],
                  'rename' => [
                    'param' => [
                      'projectId' => 'project_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'project_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.collaborators`',
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'user_id',
                        'orig' => 'user_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/projects/{projectId}/collaborators/{userId}',
                  'parts' => [
                    'projects',
                    '{project_id}',
                    'collaborators',
                    '{user_id}',
                  ],
                  'rename' => [
                    'param' => [
                      'projectId' => 'project_id',
                      'userId' => 'user_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'project_id',
                      'user_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'project',
              ],
              [
                'project',
                'collaborator',
              ],
            ],
          ],
        ],
        'collaborator' => [
          'fields' => [
            [
              'name' => 'email',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'role',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'collaborator',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/projects/{projectId}/collaborators',
                  'parts' => [
                    'projects',
                    '{project_id}',
                    'collaborators',
                  ],
                  'rename' => [
                    'param' => [
                      'projectId' => 'project_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'project_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'project',
              ],
            ],
          ],
        ],
        'deployment' => [
          'fields' => [
            [
              'name' => 'buildVersion',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'type' => '`$STRING`',
            ],
            [
              'name' => 'completedAt',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'configuration',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'createdAt',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'deploymentUrl',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'downloadUrl',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'environment',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'platform',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'type' => '`$STRING`',
            ],
            [
              'name' => 'projectId',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'releaseNotes',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'size',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'version',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'deployment',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/projects/{projectId}/deployments',
                  'parts' => [
                    'projects',
                    '{project_id}',
                    'deployments',
                  ],
                  'rename' => [
                    'param' => [
                      'projectId' => 'project_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'project_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'status',
                        'orig' => 'status',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/projects/{projectId}/deployments',
                  'parts' => [
                    'projects',
                    '{project_id}',
                    'deployments',
                  ],
                  'rename' => [
                    'param' => [
                      'projectId' => 'project_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'project_id',
                      'status',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.deployments`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/projects/{projectId}/builds',
                  'parts' => [
                    'projects',
                    '{project_id}',
                    'builds',
                  ],
                  'rename' => [
                    'param' => [
                      'projectId' => 'project_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'project_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.builds`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'deployment_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/projects/{projectId}/deployments/{deploymentId}',
                  'parts' => [
                    'projects',
                    '{project_id}',
                    'deployments',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'deploymentId' => 'id',
                      'projectId' => 'project_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                      'project_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'project',
              ],
            ],
          ],
        ],
        'project' => [
          'fields' => [
            [
              'name' => 'createdAt',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'type' => '`$STRING`',
            ],
            [
              'name' => 'owner',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'settings',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'updatedAt',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'project',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/projects',
                  'parts' => [
                    'projects',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'status',
                        'orig' => 'status',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/projects',
                  'parts' => [
                    'projects',
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'offset',
                      'status',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.projects`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'project_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/projects/{projectId}',
                  'parts' => [
                    'projects',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'projectId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'project_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/projects/{projectId}',
                  'parts' => [
                    'projects',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'projectId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'project_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'PUT',
                  'orig' => '/projects/{projectId}',
                  'parts' => [
                    'projects',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'projectId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'test' => [
          'fields' => [
            [
              'name' => 'completedAt',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'duration',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'environment',
              'op' => [
                'list' => [
                  'type' => '`$STRING`',
                ],
              ],
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'failed',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'op' => [
                'list' => [
                  'type' => '`$STRING`',
                ],
              ],
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'passed',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'platform',
              'op' => [
                'list' => [
                  'type' => '`$STRING`',
                ],
              ],
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'projectId',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'results',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'skipped',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'startedAt',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'testSuite',
              'op' => [
                'list' => [
                  'type' => '`$STRING`',
                ],
              ],
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'totalTests',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'test',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/projects/{projectId}/tests',
                  'parts' => [
                    'projects',
                    '{project_id}',
                    'tests',
                  ],
                  'rename' => [
                    'param' => [
                      'projectId' => 'project_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'project_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'status',
                        'orig' => 'status',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/projects/{projectId}/tests',
                  'parts' => [
                    'projects',
                    '{project_id}',
                    'tests',
                  ],
                  'rename' => [
                    'param' => [
                      'projectId' => 'project_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'project_id',
                      'status',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.tests`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'test_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/projects/{projectId}/tests/{testId}',
                  'parts' => [
                    'projects',
                    '{project_id}',
                    'tests',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'projectId' => 'project_id',
                      'testId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                      'project_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'project',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return GameDevelopmentFeatures::make_feature($name);
    }
}
