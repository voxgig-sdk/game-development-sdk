// Typed models for the GameDevelopment SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Analytics {
  count?: number
  event_name: string
  event_type: string
  name?: string
  property?: Record<string, any>
  timestamp?: string
}

export interface AnalyticsListMatch {
  project_id: string
}

export interface AnalyticsCreateData {
  project_id: string
}

export interface Asset {
  created_at?: string
  id?: string
  mime_type?: string
  name?: string
  project_id?: string
  size?: number
  tag?: any[]
  type?: string
  updated_at?: string
  url?: string
}

export interface AssetLoadMatch {
  id: string
  project_id: string
}

export interface AssetListMatch {
  project_id: string
}

export interface AssetCreateData {
  project_id: string
}

export interface AssetRemoveMatch {
  id: string
  project_id: string
}

export interface Build {
  configuration: string
  platform: string
  version: string
}

export interface BuildCreateData {
  project_id: string
}

export interface Collaboration {
  added_at?: string
  email?: string
  id?: string
  last_active?: string
  name?: string
  role?: string
  status?: string
  user_id?: string
}

export interface CollaborationListMatch {
  project_id: string
}

export interface CollaborationRemoveMatch {
  project_id: string
  user_id: string
}

export interface Collaborator {
  email: string
  role: string
}

export interface CollaboratorCreateData {
  project_id: string
}

export interface Deployment {
  build_version?: string
  completed_at?: string
  configuration?: string
  created_at?: string
  deployment_url?: string
  download_url?: string
  environment?: string
  id?: string
  platform?: string
  project_id?: string
  release_note?: string
  size?: number
  status?: string
  version?: string
}

export interface DeploymentLoadMatch {
  id: string
  project_id: string
}

export interface DeploymentListMatch {
  project_id: string
}

export interface DeploymentCreateData {
  project_id: string
}

export interface Project {
  created_at?: string
  description?: string
  id?: string
  name?: string
  owner?: Record<string, any>
  setting?: Record<string, any>
  status?: string
  updated_at?: string
}

export interface ProjectLoadMatch {
  id: string
}

export type ProjectListMatch = Partial<Project>

export type ProjectCreateData = Partial<Project>

export interface ProjectUpdateData {
  id: string
}

export interface ProjectRemoveMatch {
  id: string
}

export interface Test {
  completed_at?: string
  environment?: string
  id?: string
  name?: string
  platform?: string
  project_id?: string
  result?: Record<string, any>
  started_at?: string
  status?: string
  test_suite?: string
}

export interface TestLoadMatch {
  id: string
  project_id: string
}

export interface TestListMatch {
  project_id: string
}

export interface TestCreateData {
  project_id: string
}

