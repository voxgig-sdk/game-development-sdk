<?php
declare(strict_types=1);

// Typed models for the GameDevelopment SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Analytics entity data model. */
class Analytics
{
    public ?int $count = null;
    public string $eventName;
    public string $eventType;
    public ?string $name = null;
    public ?array $properties = null;
    public ?string $timestamp = null;
}

/** Request payload for Analytics#list. */
class AnalyticsListMatch
{
    public string $project_id;
}

/** Request payload for Analytics#create. */
class AnalyticsCreateData
{
    public string $project_id;
    public ?int $count = null;
    public string $eventName;
    public string $eventType;
    public ?string $name = null;
    public ?array $properties = null;
    public ?string $timestamp = null;
}

/** Asset entity data model. */
class Asset
{
    public ?string $createdAt = null;
    public ?string $id = null;
    public ?string $mimeType = null;
    public ?string $name = null;
    public ?string $projectId = null;
    public ?int $size = null;
    public ?array $tags = null;
    public ?string $type = null;
    public ?string $updatedAt = null;
    public ?string $url = null;
}

/** Request payload for Asset#load. */
class AssetLoadMatch
{
    public string $id;
    public string $project_id;
}

/** Request payload for Asset#list. */
class AssetListMatch
{
    public string $project_id;
}

/** Request payload for Asset#create. */
class AssetCreateData
{
    public string $project_id;
    public ?string $createdAt = null;
    public ?string $id = null;
    public ?string $mimeType = null;
    public ?string $name = null;
    public ?string $projectId = null;
    public ?int $size = null;
    public ?array $tags = null;
    public ?string $type = null;
    public ?string $updatedAt = null;
    public ?string $url = null;
}

/** Request payload for Asset#remove. */
class AssetRemoveMatch
{
    public string $id;
    public string $project_id;
}

/** Build entity data model. */
class Build
{
    public string $configuration;
    public string $platform;
    public string $version;
}

/** Request payload for Build#create. */
class BuildCreateData
{
    public string $project_id;
    public string $configuration;
    public string $platform;
    public string $version;
}

/** Collaboration entity data model. */
class Collaboration
{
    public ?string $addedAt = null;
    public ?string $email = null;
    public ?string $id = null;
    public ?string $lastActive = null;
    public ?string $name = null;
    public ?string $role = null;
    public ?string $status = null;
    public ?string $userId = null;
}

/** Request payload for Collaboration#list. */
class CollaborationListMatch
{
    public string $project_id;
}

/** Request payload for Collaboration#remove. */
class CollaborationRemoveMatch
{
    public string $project_id;
    public string $user_id;
}

/** Collaborator entity data model. */
class Collaborator
{
    public string $email;
    public string $role;
}

/** Request payload for Collaborator#create. */
class CollaboratorCreateData
{
    public string $project_id;
    public string $email;
    public string $role;
}

/** Deployment entity data model. */
class Deployment
{
    public ?string $buildVersion = null;
    public ?string $completedAt = null;
    public ?string $configuration = null;
    public ?string $createdAt = null;
    public ?string $deploymentUrl = null;
    public ?string $downloadUrl = null;
    public ?string $environment = null;
    public ?string $id = null;
    public ?string $platform = null;
    public ?string $projectId = null;
    public ?string $releaseNotes = null;
    public ?int $size = null;
    public ?string $status = null;
    public ?string $version = null;
}

/** Request payload for Deployment#load. */
class DeploymentLoadMatch
{
    public string $id;
    public string $project_id;
}

/** Request payload for Deployment#list. */
class DeploymentListMatch
{
    public string $project_id;
}

/** Request payload for Deployment#create. */
class DeploymentCreateData
{
    public string $project_id;
    public ?string $buildVersion = null;
    public ?string $completedAt = null;
    public ?string $configuration = null;
    public ?string $createdAt = null;
    public ?string $deploymentUrl = null;
    public ?string $downloadUrl = null;
    public ?string $environment = null;
    public ?string $id = null;
    public ?string $platform = null;
    public ?string $projectId = null;
    public ?string $releaseNotes = null;
    public ?int $size = null;
    public ?string $status = null;
    public ?string $version = null;
}

/** Project entity data model. */
class Project
{
    public ?string $createdAt = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?array $owner = null;
    public ?array $settings = null;
    public ?string $status = null;
    public ?string $updatedAt = null;
}

/** Request payload for Project#load. */
class ProjectLoadMatch
{
    public string $id;
}

/** Request payload for Project#list. */
class ProjectListMatch
{
    public ?string $createdAt = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?array $owner = null;
    public ?array $settings = null;
    public ?string $status = null;
    public ?string $updatedAt = null;
}

/** Request payload for Project#create. */
class ProjectCreateData
{
    public ?string $createdAt = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?array $owner = null;
    public ?array $settings = null;
    public ?string $status = null;
    public ?string $updatedAt = null;
}

/** Request payload for Project#update. */
class ProjectUpdateData
{
    public string $id;
    public ?string $createdAt = null;
    public ?string $description = null;
    public ?string $name = null;
    public ?array $owner = null;
    public ?array $settings = null;
    public ?string $status = null;
    public ?string $updatedAt = null;
}

/** Request payload for Project#remove. */
class ProjectRemoveMatch
{
    public string $id;
}

/** Test entity data model. */
class Test
{
    public ?string $completedAt = null;
    public ?float $duration = null;
    public string $environment;
    public ?int $failed = null;
    public ?string $id = null;
    public string $name;
    public ?int $passed = null;
    public string $platform;
    public ?string $projectId = null;
    public ?array $results = null;
    public ?int $skipped = null;
    public ?string $startedAt = null;
    public ?string $status = null;
    public string $testSuite;
    public ?int $totalTests = null;
}

/** Request payload for Test#load. */
class TestLoadMatch
{
    public string $id;
    public string $project_id;
}

/** Request payload for Test#list. */
class TestListMatch
{
    public string $project_id;
}

/** Request payload for Test#create. */
class TestCreateData
{
    public string $project_id;
    public ?string $completedAt = null;
    public ?float $duration = null;
    public string $environment;
    public ?int $failed = null;
    public ?string $id = null;
    public string $name;
    public ?int $passed = null;
    public string $platform;
    public ?string $projectId = null;
    public ?array $results = null;
    public ?int $skipped = null;
    public ?string $startedAt = null;
    public ?string $status = null;
    public string $testSuite;
    public ?int $totalTests = null;
}

