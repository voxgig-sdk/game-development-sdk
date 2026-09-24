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
                "slug" => "game-development",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
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
              'title' => 'Count',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
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
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/projects/{projectId}/analytics/events',
                  'segments' => [
                    [
                      'lit' => 'projects',
                    ],
                    [
                      'var' => 'project_id',
                    ],
                    [
                      'lit' => 'analytics',
                    ],
                    [
                      'lit' => 'events',
                    ],
                  ],
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    '$action' => 'event',
                    'exist' => [
                      'project_id',
                    ],
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/projects/{projectId}/analytics',
                  'segments' => [
                    [
                      'lit' => 'projects',
                    ],
                    [
                      'var' => 'project_id',
                    ],
                    [
                      'lit' => 'analytics',
                    ],
                  ],
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'end_date',
                        'orig' => 'end_date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'metric',
                        'orig' => 'metric',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start_date',
                        'orig' => 'start_date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
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
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.project',
              ],
            ],
          ],
        ],
        'asset' => [
          'fields' => [
            [
              'name' => 'createdAt',
              'title' => 'Created At',
              'type' => '`$STRING`',
              'format' => 'date-time',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'mimeType',
              'title' => 'Mime Type',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'projectId',
              'title' => 'Project Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'size',
              'title' => 'Size',
              'type' => '`$INTEGER`',
              'short' => 'File size in bytes',
            ],
            [
              'name' => 'tags',
              'title' => 'Tags',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'type',
              'title' => 'Type',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'updatedAt',
              'title' => 'Updated At',
              'type' => '`$STRING`',
              'format' => 'date-time',
            ],
            [
              'name' => 'url',
              'title' => 'Url',
              'type' => '`$STRING`',
              'format' => 'uri',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'asset',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/projects/{projectId}/assets',
                  'segments' => [
                    [
                      'lit' => 'projects',
                    ],
                    [
                      'var' => 'project_id',
                    ],
                    [
                      'lit' => 'assets',
                    ],
                  ],
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'project_id',
                    ],
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/projects/{projectId}/assets',
                  'segments' => [
                    [
                      'lit' => 'projects',
                    ],
                    [
                      'var' => 'project_id',
                    ],
                    [
                      'lit' => 'assets',
                    ],
                  ],
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.assets`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 50,
                      ],
                      [
                        'name' => 'type',
                        'orig' => 'type',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'project_id',
                      'type',
                    ],
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/projects/{projectId}/assets/{assetId}',
                  'segments' => [
                    [
                      'lit' => 'projects',
                    ],
                    [
                      'var' => 'project_id',
                    ],
                    [
                      'lit' => 'assets',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'asset_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                      'project_id',
                    ],
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/projects/{projectId}/assets/{assetId}',
                  'segments' => [
                    [
                      'lit' => 'projects',
                    ],
                    [
                      'var' => 'project_id',
                    ],
                    [
                      'lit' => 'assets',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'asset_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                      'project_id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.project',
              ],
            ],
          ],
        ],
        'build' => [
          'fields' => [
            [
              'name' => 'configuration',
              'title' => 'Configuration',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'platform',
              'title' => 'Platform',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'version',
              'title' => 'Version',
              'type' => '`$STRING`',
              'req' => true,
            ],
          ],
          'name' => 'build',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/projects/{projectId}/builds',
                  'segments' => [
                    [
                      'lit' => 'projects',
                    ],
                    [
                      'var' => 'project_id',
                    ],
                    [
                      'lit' => 'builds',
                    ],
                  ],
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'project_id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.project',
              ],
            ],
          ],
        ],
        'collaboration' => [
          'fields' => [
            [
              'name' => 'addedAt',
              'title' => 'Added At',
              'type' => '`$STRING`',
              'format' => 'date-time',
            ],
            [
              'name' => 'email',
              'title' => 'Email',
              'type' => '`$STRING`',
              'format' => 'email',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'lastActive',
              'title' => 'Last Active',
              'type' => '`$STRING`',
              'format' => 'date-time',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'role',
              'title' => 'Role',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'status',
              'title' => 'Status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'userId',
              'title' => 'User Id',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'collaboration',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/projects/{projectId}/collaborators',
                  'segments' => [
                    [
                      'lit' => 'projects',
                    ],
                    [
                      'var' => 'project_id',
                    ],
                    [
                      'lit' => 'collaborators',
                    ],
                  ],
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.collaborators`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'project_id',
                    ],
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/projects/{projectId}/collaborators/{userId}',
                  'segments' => [
                    [
                      'lit' => 'projects',
                    ],
                    [
                      'var' => 'project_id',
                    ],
                    [
                      'lit' => 'collaborators',
                    ],
                    [
                      'var' => 'user_id',
                    ],
                  ],
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'user_id',
                        'orig' => 'user_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'project_id',
                      'user_id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.project',
              ],
              [
                '$.main.kit.entity.project',
                '$.main.kit.entity.collaborator',
              ],
            ],
          ],
        ],
        'collaborator' => [
          'fields' => [
            [
              'name' => 'email',
              'title' => 'Email',
              'type' => '`$STRING`',
              'req' => true,
              'format' => 'email',
            ],
            [
              'name' => 'role',
              'title' => 'Role',
              'type' => '`$STRING`',
              'req' => true,
            ],
          ],
          'name' => 'collaborator',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/projects/{projectId}/collaborators',
                  'segments' => [
                    [
                      'lit' => 'projects',
                    ],
                    [
                      'var' => 'project_id',
                    ],
                    [
                      'lit' => 'collaborators',
                    ],
                  ],
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'project_id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.project',
              ],
            ],
          ],
        ],
        'deployment' => [
          'fields' => [
            [
              'name' => 'buildVersion',
              'title' => 'Build Version',
              'type' => '`$STRING`',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
            ],
            [
              'name' => 'completedAt',
              'title' => 'Completed At',
              'type' => '`$STRING`',
              'format' => 'date-time',
            ],
            [
              'name' => 'configuration',
              'title' => 'Configuration',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'createdAt',
              'title' => 'Created At',
              'type' => '`$STRING`',
              'format' => 'date-time',
            ],
            [
              'name' => 'deploymentUrl',
              'title' => 'Deployment Url',
              'type' => '`$STRING`',
              'format' => 'uri',
            ],
            [
              'name' => 'downloadUrl',
              'title' => 'Download Url',
              'type' => '`$STRING`',
              'format' => 'uri',
            ],
            [
              'name' => 'environment',
              'title' => 'Environment',
              'type' => '`$STRING`',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'platform',
              'title' => 'Platform',
              'type' => '`$STRING`',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
            ],
            [
              'name' => 'projectId',
              'title' => 'Project Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'releaseNotes',
              'title' => 'Release Notes',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'size',
              'title' => 'Size',
              'type' => '`$INTEGER`',
              'short' => 'Build size in bytes',
            ],
            [
              'name' => 'status',
              'title' => 'Status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'version',
              'title' => 'Version',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'deployment',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/projects/{projectId}/deployments',
                  'segments' => [
                    [
                      'lit' => 'projects',
                    ],
                    [
                      'var' => 'project_id',
                    ],
                    [
                      'lit' => 'deployments',
                    ],
                  ],
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'project_id',
                    ],
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/projects/{projectId}/deployments',
                  'segments' => [
                    [
                      'lit' => 'projects',
                    ],
                    [
                      'var' => 'project_id',
                    ],
                    [
                      'lit' => 'deployments',
                    ],
                  ],
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.deployments`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'status',
                        'orig' => 'status',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'project_id',
                      'status',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/projects/{projectId}/builds',
                  'segments' => [
                    [
                      'lit' => 'projects',
                    ],
                    [
                      'var' => 'project_id',
                    ],
                    [
                      'lit' => 'builds',
                    ],
                  ],
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.builds`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'project_id',
                    ],
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/projects/{projectId}/deployments/{deploymentId}',
                  'segments' => [
                    [
                      'lit' => 'projects',
                    ],
                    [
                      'var' => 'project_id',
                    ],
                    [
                      'lit' => 'deployments',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'deployment_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                      'project_id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.project',
              ],
            ],
          ],
        ],
        'project' => [
          'fields' => [
            [
              'name' => 'createdAt',
              'title' => 'Created At',
              'type' => '`$STRING`',
              'format' => 'date-time',
            ],
            [
              'name' => 'description',
              'title' => 'Description',
              'type' => '`$STRING`',
              'short' => 'Detailed description of the project',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
              'short' => 'Unique identifier for the project',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'short' => 'Name of the game project',
            ],
            [
              'name' => 'owner',
              'title' => 'Owner',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'settings',
              'title' => 'Settings',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'status',
              'title' => 'Status',
              'type' => '`$STRING`',
              'short' => 'Current status of the project',
            ],
            [
              'name' => 'updatedAt',
              'title' => 'Updated At',
              'type' => '`$STRING`',
              'format' => 'date-time',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'project',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/projects',
                  'segments' => [
                    [
                      'lit' => 'projects',
                    ],
                  ],
                  'parts' => [
                    'projects',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/projects',
                  'segments' => [
                    [
                      'lit' => 'projects',
                    ],
                  ],
                  'parts' => [
                    'projects',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.projects`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 20,
                      ],
                      [
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 0,
                      ],
                      [
                        'name' => 'status',
                        'orig' => 'status',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'offset',
                      'status',
                    ],
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/projects/{projectId}',
                  'segments' => [
                    [
                      'lit' => 'projects',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'projects',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'projectId' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'project_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                ],
              ],
            ],
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/projects/{projectId}',
                  'segments' => [
                    [
                      'lit' => 'projects',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'projects',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'projectId' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'project_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                ],
              ],
            ],
            'update' => [
              'input' => 'data',
              'name' => 'update',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'PUT',
                  'orig' => '/projects/{projectId}',
                  'segments' => [
                    [
                      'lit' => 'projects',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'projects',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'projectId' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'project_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
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
              'title' => 'Completed At',
              'type' => '`$STRING`',
              'format' => 'date-time',
            ],
            [
              'name' => 'duration',
              'title' => 'Duration',
              'type' => '`$NUMBER`',
              'short' => 'Test duration in seconds',
            ],
            [
              'name' => 'environment',
              'title' => 'Environment',
              'type' => '`$STRING`',
              'req' => true,
              'op' => [
                'list' => [
                  'type' => '`$STRING`',
                ],
              ],
            ],
            [
              'name' => 'failed',
              'title' => 'Failed',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'req' => true,
              'op' => [
                'list' => [
                  'type' => '`$STRING`',
                ],
              ],
            ],
            [
              'name' => 'passed',
              'title' => 'Passed',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'platform',
              'title' => 'Platform',
              'type' => '`$STRING`',
              'req' => true,
              'op' => [
                'list' => [
                  'type' => '`$STRING`',
                ],
              ],
            ],
            [
              'name' => 'projectId',
              'title' => 'Project Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'results',
              'title' => 'Results',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'skipped',
              'title' => 'Skipped',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'startedAt',
              'title' => 'Started At',
              'type' => '`$STRING`',
              'format' => 'date-time',
            ],
            [
              'name' => 'status',
              'title' => 'Status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'testSuite',
              'title' => 'Test Suite',
              'type' => '`$STRING`',
              'req' => true,
              'op' => [
                'list' => [
                  'type' => '`$STRING`',
                ],
              ],
            ],
            [
              'name' => 'totalTests',
              'title' => 'Total Tests',
              'type' => '`$INTEGER`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'test',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/projects/{projectId}/tests',
                  'segments' => [
                    [
                      'lit' => 'projects',
                    ],
                    [
                      'var' => 'project_id',
                    ],
                    [
                      'lit' => 'tests',
                    ],
                  ],
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'project_id',
                    ],
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/projects/{projectId}/tests',
                  'segments' => [
                    [
                      'lit' => 'projects',
                    ],
                    [
                      'var' => 'project_id',
                    ],
                    [
                      'lit' => 'tests',
                    ],
                  ],
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.tests`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'status',
                        'orig' => 'status',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'project_id',
                      'status',
                    ],
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/projects/{projectId}/tests/{testId}',
                  'segments' => [
                    [
                      'lit' => 'projects',
                    ],
                    [
                      'var' => 'project_id',
                    ],
                    [
                      'lit' => 'tests',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'test_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'project_id',
                        'orig' => 'project_id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                      'project_id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                '$.main.kit.entity.project',
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
