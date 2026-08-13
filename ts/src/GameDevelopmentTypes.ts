// Typed models for the GameDevelopment SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Analytics {
  count?: number
  eventName: string
  eventType: string
  name?: string
  properties?: Record<string, any>
  timestamp?: string
}

export interface AnalyticsListMatch {
  project_id: string
}

export interface AnalyticsCreateData {
  project_id: string
  count?: number
  eventName: string
  eventType: string
  name?: string
  properties?: Record<string, any>
  timestamp?: string

  // Selects a custom action instead of the plain create:
  //   'event'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Asset {
  createdAt?: string
  id?: string
  mimeType?: string
  name?: string
  projectId?: string
  size?: number
  tags?: any[]
  type?: string
  updatedAt?: string
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
  createdAt?: string
  id?: string
  mimeType?: string
  name?: string
  projectId?: string
  size?: number
  tags?: any[]
  type?: string
  updatedAt?: string
  url?: string
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
  configuration: string
  platform: string
  version: string
}

export interface Collaboration {
  addedAt?: string
  email?: string
  id?: string
  lastActive?: string
  name?: string
  role?: string
  status?: string
  userId?: string
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
  email: string
  role: string
}

export interface Deployment {
  buildVersion?: string
  completedAt?: string
  configuration?: string
  createdAt?: string
  deploymentUrl?: string
  downloadUrl?: string
  environment?: string
  id?: string
  platform?: string
  projectId?: string
  releaseNotes?: string
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
  buildVersion?: string
  completedAt?: string
  configuration?: string
  createdAt?: string
  deploymentUrl?: string
  downloadUrl?: string
  environment?: string
  id?: string
  platform?: string
  projectId?: string
  releaseNotes?: string
  size?: number
  status?: string
  version?: string
}

export interface Project {
  createdAt?: string
  description?: string
  id?: string
  name?: string
  owner?: Record<string, any>
  settings?: Record<string, any>
  status?: string
  updatedAt?: string
}

export interface ProjectLoadMatch {
  id: string
}

export interface ProjectListMatch {
  createdAt?: string
  description?: string
  id?: string
  name?: string
  owner?: Record<string, any>
  settings?: Record<string, any>
  status?: string
  updatedAt?: string
}

export interface ProjectCreateData {
  createdAt?: string
  description?: string
  id?: string
  name?: string
  owner?: Record<string, any>
  settings?: Record<string, any>
  status?: string
  updatedAt?: string
}

export interface ProjectUpdateData {
  id: string
  createdAt?: string
  description?: string
  name?: string
  owner?: Record<string, any>
  settings?: Record<string, any>
  status?: string
  updatedAt?: string
}

export interface ProjectRemoveMatch {
  id: string
}

export interface Test {
  completedAt?: string
  duration?: number
  environment: string
  failed?: number
  id?: string
  name: string
  passed?: number
  platform: string
  projectId?: string
  results?: Record<string, any>
  skipped?: number
  startedAt?: string
  status?: string
  testSuite: string
  totalTests?: number
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
  completedAt?: string
  duration?: number
  environment: string
  failed?: number
  id?: string
  name: string
  passed?: number
  platform: string
  projectId?: string
  results?: Record<string, any>
  skipped?: number
  startedAt?: string
  status?: string
  testSuite: string
  totalTests?: number
}

