# Typed models for the GameDevelopment SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class AnalyticsRequired(TypedDict):
    event_name: str
    event_type: str


class Analytics(AnalyticsRequired, total=False):
    count: int
    name: str
    property: dict
    timestamp: str


class AnalyticsListMatch(TypedDict):
    project_id: str


class AnalyticsCreateData(TypedDict):
    project_id: str


class Asset(TypedDict, total=False):
    created_at: str
    id: str
    mime_type: str
    name: str
    project_id: str
    size: int
    tag: list
    type: str
    updated_at: str
    url: str


class AssetLoadMatch(TypedDict):
    id: str
    project_id: str


class AssetListMatch(TypedDict):
    project_id: str


class AssetCreateData(TypedDict):
    project_id: str


class AssetRemoveMatch(TypedDict):
    id: str
    project_id: str


class Build(TypedDict):
    configuration: str
    platform: str
    version: str


class BuildCreateData(TypedDict):
    project_id: str


class Collaboration(TypedDict, total=False):
    added_at: str
    email: str
    id: str
    last_active: str
    name: str
    role: str
    status: str
    user_id: str


class CollaborationListMatch(TypedDict):
    project_id: str


class CollaborationRemoveMatch(TypedDict):
    project_id: str
    user_id: str


class Collaborator(TypedDict):
    email: str
    role: str


class CollaboratorCreateData(TypedDict):
    project_id: str


class Deployment(TypedDict, total=False):
    build_version: str
    completed_at: str
    configuration: str
    created_at: str
    deployment_url: str
    download_url: str
    environment: str
    id: str
    platform: str
    project_id: str
    release_note: str
    size: int
    status: str
    version: str


class DeploymentLoadMatch(TypedDict):
    id: str
    project_id: str


class DeploymentListMatch(TypedDict):
    project_id: str


class DeploymentCreateData(TypedDict):
    project_id: str


class Project(TypedDict, total=False):
    created_at: str
    description: str
    id: str
    name: str
    owner: dict
    setting: dict
    status: str
    updated_at: str


class ProjectLoadMatch(TypedDict):
    id: str


class ProjectListMatch(TypedDict, total=False):
    created_at: str
    description: str
    id: str
    name: str
    owner: dict
    setting: dict
    status: str
    updated_at: str


class ProjectCreateData(TypedDict, total=False):
    created_at: str
    description: str
    id: str
    name: str
    owner: dict
    setting: dict
    status: str
    updated_at: str


class ProjectUpdateData(TypedDict):
    id: str


class ProjectRemoveMatch(TypedDict):
    id: str


class Test(TypedDict, total=False):
    completed_at: str
    environment: str
    id: str
    name: str
    platform: str
    project_id: str
    result: dict
    started_at: str
    status: str
    test_suite: str


class TestLoadMatch(TypedDict):
    id: str
    project_id: str


class TestListMatch(TypedDict):
    project_id: str


class TestCreateData(TypedDict):
    project_id: str
