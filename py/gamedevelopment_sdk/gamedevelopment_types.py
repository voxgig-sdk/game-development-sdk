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
    eventName: str
    eventType: str


class Analytics(AnalyticsRequired, total=False):
    count: int
    name: str
    properties: dict
    timestamp: str


class AnalyticsListMatch(TypedDict):
    project_id: str


class AnalyticsCreateDataRequired(TypedDict):
    project_id: str
    eventName: str
    eventType: str


class AnalyticsCreateData(AnalyticsCreateDataRequired, total=False):
    count: int
    name: str
    properties: dict
    timestamp: str


class Asset(TypedDict, total=False):
    createdAt: str
    id: str
    mimeType: str
    name: str
    projectId: str
    size: int
    tags: list
    type: str
    updatedAt: str
    url: str


class AssetLoadMatch(TypedDict):
    id: str
    project_id: str


class AssetListMatch(TypedDict):
    project_id: str


class AssetCreateDataRequired(TypedDict):
    project_id: str


class AssetCreateData(AssetCreateDataRequired, total=False):
    createdAt: str
    id: str
    mimeType: str
    name: str
    projectId: str
    size: int
    tags: list
    type: str
    updatedAt: str
    url: str


class AssetRemoveMatch(TypedDict):
    id: str
    project_id: str


class Build(TypedDict):
    configuration: str
    platform: str
    version: str


class BuildCreateData(TypedDict):
    project_id: str
    configuration: str
    platform: str
    version: str


class Collaboration(TypedDict, total=False):
    addedAt: str
    email: str
    id: str
    lastActive: str
    name: str
    role: str
    status: str
    userId: str


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
    email: str
    role: str


class Deployment(TypedDict, total=False):
    buildVersion: str
    completedAt: str
    configuration: str
    createdAt: str
    deploymentUrl: str
    downloadUrl: str
    environment: str
    id: str
    platform: str
    projectId: str
    releaseNotes: str
    size: int
    status: str
    version: str


class DeploymentLoadMatch(TypedDict):
    id: str
    project_id: str


class DeploymentListMatch(TypedDict):
    project_id: str


class DeploymentCreateDataRequired(TypedDict):
    project_id: str


class DeploymentCreateData(DeploymentCreateDataRequired, total=False):
    buildVersion: str
    completedAt: str
    configuration: str
    createdAt: str
    deploymentUrl: str
    downloadUrl: str
    environment: str
    id: str
    platform: str
    projectId: str
    releaseNotes: str
    size: int
    status: str
    version: str


class Project(TypedDict, total=False):
    createdAt: str
    description: str
    id: str
    name: str
    owner: dict
    settings: dict
    status: str
    updatedAt: str


class ProjectLoadMatch(TypedDict):
    id: str


class ProjectListMatch(TypedDict, total=False):
    createdAt: str
    description: str
    id: str
    name: str
    owner: dict
    settings: dict
    status: str
    updatedAt: str


class ProjectCreateData(TypedDict, total=False):
    createdAt: str
    description: str
    id: str
    name: str
    owner: dict
    settings: dict
    status: str
    updatedAt: str


class ProjectUpdateDataRequired(TypedDict):
    id: str


class ProjectUpdateData(ProjectUpdateDataRequired, total=False):
    createdAt: str
    description: str
    name: str
    owner: dict
    settings: dict
    status: str
    updatedAt: str


class ProjectRemoveMatch(TypedDict):
    id: str


class TestRequired(TypedDict):
    environment: str
    name: str
    platform: str
    testSuite: str


class Test(TestRequired, total=False):
    completedAt: str
    duration: float
    failed: int
    id: str
    passed: int
    projectId: str
    results: dict
    skipped: int
    startedAt: str
    status: str
    totalTests: int


class TestLoadMatch(TypedDict):
    id: str
    project_id: str


class TestListMatch(TypedDict):
    project_id: str


class TestCreateDataRequired(TypedDict):
    project_id: str
    environment: str
    name: str
    platform: str
    testSuite: str


class TestCreateData(TestCreateDataRequired, total=False):
    completedAt: str
    duration: float
    failed: int
    id: str
    passed: int
    projectId: str
    results: dict
    skipped: int
    startedAt: str
    status: str
    totalTests: int
