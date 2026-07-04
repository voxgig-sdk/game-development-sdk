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
    public string $event_name;
    public string $event_type;
    public ?string $name = null;
    public ?array $property = null;
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
}

/** Asset entity data model. */
class Asset
{
    public ?string $created_at = null;
    public ?string $id = null;
    public ?string $mime_type = null;
    public ?string $name = null;
    public ?string $project_id = null;
    public ?int $size = null;
    public ?array $tag = null;
    public ?string $type = null;
    public ?string $updated_at = null;
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
}

/** Collaboration entity data model. */
class Collaboration
{
    public ?string $added_at = null;
    public ?string $email = null;
    public ?string $id = null;
    public ?string $last_active = null;
    public ?string $name = null;
    public ?string $role = null;
    public ?string $status = null;
    public ?string $user_id = null;
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
}

/** Deployment entity data model. */
class Deployment
{
    public ?string $build_version = null;
    public ?string $completed_at = null;
    public ?string $configuration = null;
    public ?string $created_at = null;
    public ?string $deployment_url = null;
    public ?string $download_url = null;
    public ?string $environment = null;
    public ?string $id = null;
    public ?string $platform = null;
    public ?string $project_id = null;
    public ?string $release_note = null;
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
}

/** Project entity data model. */
class Project
{
    public ?string $created_at = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?array $owner = null;
    public ?array $setting = null;
    public ?string $status = null;
    public ?string $updated_at = null;
}

/** Request payload for Project#load. */
class ProjectLoadMatch
{
    public string $id;
}

/** Match filter for Project#list (any subset of Project fields). */
class ProjectListMatch
{
    public ?string $created_at = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?array $owner = null;
    public ?array $setting = null;
    public ?string $status = null;
    public ?string $updated_at = null;
}

/** Match filter for Project#create (any subset of Project fields). */
class ProjectCreateData
{
    public ?string $created_at = null;
    public ?string $description = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?array $owner = null;
    public ?array $setting = null;
    public ?string $status = null;
    public ?string $updated_at = null;
}

/** Request payload for Project#update. */
class ProjectUpdateData
{
    public string $id;
}

/** Request payload for Project#remove. */
class ProjectRemoveMatch
{
    public string $id;
}

/** Test entity data model. */
class Test
{
    public ?string $completed_at = null;
    public ?string $environment = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $platform = null;
    public ?string $project_id = null;
    public ?array $result = null;
    public ?string $started_at = null;
    public ?string $status = null;
    public ?string $test_suite = null;
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
}

