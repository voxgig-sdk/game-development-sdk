-- Typed models for the GameDevelopment SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Analytics
---@field count? number
---@field event_name string
---@field event_type string
---@field name? string
---@field property? table
---@field timestamp? string

---@class AnalyticsListMatch
---@field project_id string

---@class AnalyticsCreateData
---@field project_id string

---@class Asset
---@field created_at? string
---@field id? string
---@field mime_type? string
---@field name? string
---@field project_id? string
---@field size? number
---@field tag? table
---@field type? string
---@field updated_at? string
---@field url? string

---@class AssetLoadMatch
---@field id string
---@field project_id string

---@class AssetListMatch
---@field project_id string

---@class AssetCreateData
---@field project_id string

---@class AssetRemoveMatch
---@field id string
---@field project_id string

---@class Build
---@field configuration string
---@field platform string
---@field version string

---@class BuildCreateData
---@field project_id string

---@class Collaboration
---@field added_at? string
---@field email? string
---@field id? string
---@field last_active? string
---@field name? string
---@field role? string
---@field status? string
---@field user_id? string

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

---@class Deployment
---@field build_version? string
---@field completed_at? string
---@field configuration? string
---@field created_at? string
---@field deployment_url? string
---@field download_url? string
---@field environment? string
---@field id? string
---@field platform? string
---@field project_id? string
---@field release_note? string
---@field size? number
---@field status? string
---@field version? string

---@class DeploymentLoadMatch
---@field id string
---@field project_id string

---@class DeploymentListMatch
---@field project_id string

---@class DeploymentCreateData
---@field project_id string

---@class Project
---@field created_at? string
---@field description? string
---@field id? string
---@field name? string
---@field owner? table
---@field setting? table
---@field status? string
---@field updated_at? string

---@class ProjectLoadMatch
---@field id string

---@class ProjectListMatch

---@class ProjectCreateData

---@class ProjectUpdateData
---@field id string

---@class ProjectRemoveMatch
---@field id string

---@class Test
---@field completed_at? string
---@field environment? string
---@field id? string
---@field name? string
---@field platform? string
---@field project_id? string
---@field result? table
---@field started_at? string
---@field status? string
---@field test_suite? string

---@class TestLoadMatch
---@field id string
---@field project_id string

---@class TestListMatch
---@field project_id string

---@class TestCreateData
---@field project_id string

local M = {}

return M
