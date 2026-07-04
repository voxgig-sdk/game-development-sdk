# Typed models for the GameDevelopment SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Analytics:
    event_name: str
    event_type: str
    count: Optional[int] = None
    name: Optional[str] = None
    property: Optional[dict] = None
    timestamp: Optional[str] = None


@dataclass
class AnalyticsListMatch:
    project_id: str


@dataclass
class AnalyticsCreateData:
    project_id: str


@dataclass
class Asset:
    created_at: Optional[str] = None
    id: Optional[str] = None
    mime_type: Optional[str] = None
    name: Optional[str] = None
    project_id: Optional[str] = None
    size: Optional[int] = None
    tag: Optional[list] = None
    type: Optional[str] = None
    updated_at: Optional[str] = None
    url: Optional[str] = None


@dataclass
class AssetLoadMatch:
    id: str
    project_id: str


@dataclass
class AssetListMatch:
    project_id: str


@dataclass
class AssetCreateData:
    project_id: str


@dataclass
class AssetRemoveMatch:
    id: str
    project_id: str


@dataclass
class Build:
    configuration: str
    platform: str
    version: str


@dataclass
class BuildCreateData:
    project_id: str


@dataclass
class Collaboration:
    added_at: Optional[str] = None
    email: Optional[str] = None
    id: Optional[str] = None
    last_active: Optional[str] = None
    name: Optional[str] = None
    role: Optional[str] = None
    status: Optional[str] = None
    user_id: Optional[str] = None


@dataclass
class CollaborationListMatch:
    project_id: str


@dataclass
class CollaborationRemoveMatch:
    project_id: str
    user_id: str


@dataclass
class Collaborator:
    email: str
    role: str


@dataclass
class CollaboratorCreateData:
    project_id: str


@dataclass
class Deployment:
    build_version: Optional[str] = None
    completed_at: Optional[str] = None
    configuration: Optional[str] = None
    created_at: Optional[str] = None
    deployment_url: Optional[str] = None
    download_url: Optional[str] = None
    environment: Optional[str] = None
    id: Optional[str] = None
    platform: Optional[str] = None
    project_id: Optional[str] = None
    release_note: Optional[str] = None
    size: Optional[int] = None
    status: Optional[str] = None
    version: Optional[str] = None


@dataclass
class DeploymentLoadMatch:
    id: str
    project_id: str


@dataclass
class DeploymentListMatch:
    project_id: str


@dataclass
class DeploymentCreateData:
    project_id: str


@dataclass
class Project:
    created_at: Optional[str] = None
    description: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None
    owner: Optional[dict] = None
    setting: Optional[dict] = None
    status: Optional[str] = None
    updated_at: Optional[str] = None


@dataclass
class ProjectLoadMatch:
    id: str


@dataclass
class ProjectListMatch:
    created_at: Optional[str] = None
    description: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None
    owner: Optional[dict] = None
    setting: Optional[dict] = None
    status: Optional[str] = None
    updated_at: Optional[str] = None


@dataclass
class ProjectCreateData:
    created_at: Optional[str] = None
    description: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None
    owner: Optional[dict] = None
    setting: Optional[dict] = None
    status: Optional[str] = None
    updated_at: Optional[str] = None


@dataclass
class ProjectUpdateData:
    id: str


@dataclass
class ProjectRemoveMatch:
    id: str


@dataclass
class Test:
    completed_at: Optional[str] = None
    environment: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None
    platform: Optional[str] = None
    project_id: Optional[str] = None
    result: Optional[dict] = None
    started_at: Optional[str] = None
    status: Optional[str] = None
    test_suite: Optional[str] = None


@dataclass
class TestLoadMatch:
    id: str
    project_id: str


@dataclass
class TestListMatch:
    project_id: str


@dataclass
class TestCreateData:
    project_id: str

