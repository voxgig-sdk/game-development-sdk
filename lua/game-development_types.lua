-- Typed models for the GameDevelopment SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Analytics
---@field count? number
---@field eventName string
---@field eventType string
---@field name? string
---@field properties? table
---@field timestamp? string

---@class AnalyticsListMatch
---@field project_id string
---@field end_date? string
---@field metric? string
---@field start_date? string

---@class AnalyticsCreateData
---@field project_id string
---@field count? number
---@field eventName string
---@field eventType string
---@field name? string
---@field properties? table
---@field timestamp? string

---@class Asset
---@field createdAt? string
---@field id? string
---@field mimeType? string
---@field name? string
---@field projectId? string
---@field size? number
---@field tags? table
---@field type? string
---@field updatedAt? string
---@field url? string

---@class AssetLoadMatch
---@field id string
---@field project_id string

---@class AssetListMatch
---@field project_id string
---@field limit? number
---@field type? string

---@class AssetCreateData
---@field project_id string
---@field createdAt? string
---@field id? string
---@field mimeType? string
---@field name? string
---@field projectId? string
---@field size? number
---@field tags? table
---@field type? string
---@field updatedAt? string
---@field url? string

---@class AssetRemoveMatch
---@field id string
---@field project_id string

---@class Build
---@field configuration string
---@field platform string
---@field version string

---@class BuildCreateData
---@field project_id string
---@field configuration string
---@field platform string
---@field version string

---@class Collaboration
---@field addedAt? string
---@field email? string
---@field id? string
---@field lastActive? string
---@field name? string
---@field role? string
---@field status? string
---@field userId? string

---@class CollaborationListMatch
---@field project_id string

---@class CollaborationRemoveMatch
---@field project_id string
---@field user_id string

---@class Collaborator
---@field email string
---@field role string

---@class CollaboratorCreateData
---@field project_id string
---@field email string
---@field role string

---@class Deployment
---@field buildVersion? string
---@field completedAt? string
---@field configuration? string
---@field createdAt? string
---@field deploymentUrl? string
---@field downloadUrl? string
---@field environment? string
---@field id? string
---@field platform? string
---@field projectId? string
---@field releaseNotes? string
---@field size? number
---@field status? string
---@field version? string

---@class DeploymentLoadMatch
---@field id string
---@field project_id string

---@class DeploymentListMatch
---@field project_id string
---@field status? string

---@class DeploymentCreateData
---@field project_id string
---@field buildVersion? string
---@field completedAt? string
---@field configuration? string
---@field createdAt? string
---@field deploymentUrl? string
---@field downloadUrl? string
---@field environment? string
---@field id? string
---@field platform? string
---@field projectId? string
---@field releaseNotes? string
---@field size? number
---@field status? string
---@field version? string

---@class Project
---@field createdAt? string
---@field description? string
---@field id? string
---@field name? string
---@field owner? table
---@field settings? table
---@field status? string
---@field updatedAt? string

---@class ProjectLoadMatch
---@field id string

---@class ProjectListMatch
---@field limit? number
---@field offset? number
---@field status? string

---@class ProjectCreateData
---@field createdAt? string
---@field description? string
---@field id? string
---@field name? string
---@field owner? table
---@field settings? table
---@field status? string
---@field updatedAt? string

---@class ProjectUpdateData
---@field id string
---@field createdAt? string
---@field description? string
---@field name? string
---@field owner? table
---@field settings? table
---@field status? string
---@field updatedAt? string

---@class ProjectRemoveMatch
---@field id string

---@class Test
---@field completedAt? string
---@field duration? number
---@field environment string
---@field failed? number
---@field id? string
---@field name string
---@field passed? number
---@field platform string
---@field projectId? string
---@field results? table
---@field skipped? number
---@field startedAt? string
---@field status? string
---@field testSuite string
---@field totalTests? number

---@class TestLoadMatch
---@field id string
---@field project_id string

---@class TestListMatch
---@field project_id string
---@field status? string

---@class TestCreateData
---@field project_id string
---@field completedAt? string
---@field duration? number
---@field environment string
---@field failed? number
---@field id? string
---@field name string
---@field passed? number
---@field platform string
---@field projectId? string
---@field results? table
---@field skipped? number
---@field startedAt? string
---@field status? string
---@field testSuite string
---@field totalTests? number

local M = {}

return M
