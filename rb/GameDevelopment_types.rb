# frozen_string_literal: true

# Typed models for the GameDevelopment SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Analytics entity data model.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] eventName
#   @return [String]
#
# @!attribute [rw] eventType
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] properties
#   @return [Hash, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
Analytics = Struct.new(
  :count,
  :eventName,
  :eventType,
  :name,
  :properties,
  :timestamp,
  keyword_init: true
)

# Request payload for Analytics#list.
#
# @!attribute [rw] project_id
#   @return [String]
AnalyticsListMatch = Struct.new(
  :project_id,
  keyword_init: true
)

# Request payload for Analytics#create.
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] eventName
#   @return [String]
#
# @!attribute [rw] eventType
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] properties
#   @return [Hash, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
AnalyticsCreateData = Struct.new(
  :project_id,
  :count,
  :eventName,
  :eventType,
  :name,
  :properties,
  :timestamp,
  keyword_init: true
)

# Asset entity data model.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] mimeType
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] projectId
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Asset = Struct.new(
  :createdAt,
  :id,
  :mimeType,
  :name,
  :projectId,
  :size,
  :tags,
  :type,
  :updatedAt,
  :url,
  keyword_init: true
)

# Request payload for Asset#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
AssetLoadMatch = Struct.new(
  :id,
  :project_id,
  keyword_init: true
)

# Request payload for Asset#list.
#
# @!attribute [rw] project_id
#   @return [String]
AssetListMatch = Struct.new(
  :project_id,
  keyword_init: true
)

# Request payload for Asset#create.
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] mimeType
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] projectId
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
AssetCreateData = Struct.new(
  :project_id,
  :createdAt,
  :id,
  :mimeType,
  :name,
  :projectId,
  :size,
  :tags,
  :type,
  :updatedAt,
  :url,
  keyword_init: true
)

# Request payload for Asset#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
AssetRemoveMatch = Struct.new(
  :id,
  :project_id,
  keyword_init: true
)

# Build entity data model.
#
# @!attribute [rw] configuration
#   @return [String]
#
# @!attribute [rw] platform
#   @return [String]
#
# @!attribute [rw] version
#   @return [String]
Build = Struct.new(
  :configuration,
  :platform,
  :version,
  keyword_init: true
)

# Request payload for Build#create.
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] configuration
#   @return [String]
#
# @!attribute [rw] platform
#   @return [String]
#
# @!attribute [rw] version
#   @return [String]
BuildCreateData = Struct.new(
  :project_id,
  :configuration,
  :platform,
  :version,
  keyword_init: true
)

# Collaboration entity data model.
#
# @!attribute [rw] addedAt
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lastActive
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] role
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] userId
#   @return [String, nil]
Collaboration = Struct.new(
  :addedAt,
  :email,
  :id,
  :lastActive,
  :name,
  :role,
  :status,
  :userId,
  keyword_init: true
)

# Request payload for Collaboration#list.
#
# @!attribute [rw] project_id
#   @return [String]
CollaborationListMatch = Struct.new(
  :project_id,
  keyword_init: true
)

# Request payload for Collaboration#remove.
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] user_id
#   @return [String]
CollaborationRemoveMatch = Struct.new(
  :project_id,
  :user_id,
  keyword_init: true
)

# Collaborator entity data model.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] role
#   @return [String]
Collaborator = Struct.new(
  :email,
  :role,
  keyword_init: true
)

# Request payload for Collaborator#create.
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] role
#   @return [String]
CollaboratorCreateData = Struct.new(
  :project_id,
  :email,
  :role,
  keyword_init: true
)

# Deployment entity data model.
#
# @!attribute [rw] buildVersion
#   @return [String, nil]
#
# @!attribute [rw] completedAt
#   @return [String, nil]
#
# @!attribute [rw] configuration
#   @return [String, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] deploymentUrl
#   @return [String, nil]
#
# @!attribute [rw] downloadUrl
#   @return [String, nil]
#
# @!attribute [rw] environment
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] platform
#   @return [String, nil]
#
# @!attribute [rw] projectId
#   @return [String, nil]
#
# @!attribute [rw] releaseNotes
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
Deployment = Struct.new(
  :buildVersion,
  :completedAt,
  :configuration,
  :createdAt,
  :deploymentUrl,
  :downloadUrl,
  :environment,
  :id,
  :platform,
  :projectId,
  :releaseNotes,
  :size,
  :status,
  :version,
  keyword_init: true
)

# Request payload for Deployment#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
DeploymentLoadMatch = Struct.new(
  :id,
  :project_id,
  keyword_init: true
)

# Request payload for Deployment#list.
#
# @!attribute [rw] project_id
#   @return [String]
DeploymentListMatch = Struct.new(
  :project_id,
  keyword_init: true
)

# Request payload for Deployment#create.
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] buildVersion
#   @return [String, nil]
#
# @!attribute [rw] completedAt
#   @return [String, nil]
#
# @!attribute [rw] configuration
#   @return [String, nil]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] deploymentUrl
#   @return [String, nil]
#
# @!attribute [rw] downloadUrl
#   @return [String, nil]
#
# @!attribute [rw] environment
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] platform
#   @return [String, nil]
#
# @!attribute [rw] projectId
#   @return [String, nil]
#
# @!attribute [rw] releaseNotes
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
DeploymentCreateData = Struct.new(
  :project_id,
  :buildVersion,
  :completedAt,
  :configuration,
  :createdAt,
  :deploymentUrl,
  :downloadUrl,
  :environment,
  :id,
  :platform,
  :projectId,
  :releaseNotes,
  :size,
  :status,
  :version,
  keyword_init: true
)

# Project entity data model.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [Hash, nil]
#
# @!attribute [rw] settings
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
Project = Struct.new(
  :createdAt,
  :description,
  :id,
  :name,
  :owner,
  :settings,
  :status,
  :updatedAt,
  keyword_init: true
)

# Request payload for Project#load.
#
# @!attribute [rw] id
#   @return [String]
ProjectLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Project#list.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [Hash, nil]
#
# @!attribute [rw] settings
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
ProjectListMatch = Struct.new(
  :createdAt,
  :description,
  :id,
  :name,
  :owner,
  :settings,
  :status,
  :updatedAt,
  keyword_init: true
)

# Request payload for Project#create.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [Hash, nil]
#
# @!attribute [rw] settings
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
ProjectCreateData = Struct.new(
  :createdAt,
  :description,
  :id,
  :name,
  :owner,
  :settings,
  :status,
  :updatedAt,
  keyword_init: true
)

# Request payload for Project#update.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [Hash, nil]
#
# @!attribute [rw] settings
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
ProjectUpdateData = Struct.new(
  :id,
  :createdAt,
  :description,
  :name,
  :owner,
  :settings,
  :status,
  :updatedAt,
  keyword_init: true
)

# Request payload for Project#remove.
#
# @!attribute [rw] id
#   @return [String]
ProjectRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# Test entity data model.
#
# @!attribute [rw] completedAt
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [Float, nil]
#
# @!attribute [rw] environment
#   @return [String]
#
# @!attribute [rw] failed
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] passed
#   @return [Integer, nil]
#
# @!attribute [rw] platform
#   @return [String]
#
# @!attribute [rw] projectId
#   @return [String, nil]
#
# @!attribute [rw] results
#   @return [Hash, nil]
#
# @!attribute [rw] skipped
#   @return [Integer, nil]
#
# @!attribute [rw] startedAt
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] testSuite
#   @return [String]
#
# @!attribute [rw] totalTests
#   @return [Integer, nil]
Test = Struct.new(
  :completedAt,
  :duration,
  :environment,
  :failed,
  :id,
  :name,
  :passed,
  :platform,
  :projectId,
  :results,
  :skipped,
  :startedAt,
  :status,
  :testSuite,
  :totalTests,
  keyword_init: true
)

# Request payload for Test#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] project_id
#   @return [String]
TestLoadMatch = Struct.new(
  :id,
  :project_id,
  keyword_init: true
)

# Request payload for Test#list.
#
# @!attribute [rw] project_id
#   @return [String]
TestListMatch = Struct.new(
  :project_id,
  keyword_init: true
)

# Request payload for Test#create.
#
# @!attribute [rw] project_id
#   @return [String]
#
# @!attribute [rw] completedAt
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [Float, nil]
#
# @!attribute [rw] environment
#   @return [String]
#
# @!attribute [rw] failed
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] passed
#   @return [Integer, nil]
#
# @!attribute [rw] platform
#   @return [String]
#
# @!attribute [rw] projectId
#   @return [String, nil]
#
# @!attribute [rw] results
#   @return [Hash, nil]
#
# @!attribute [rw] skipped
#   @return [Integer, nil]
#
# @!attribute [rw] startedAt
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] testSuite
#   @return [String]
#
# @!attribute [rw] totalTests
#   @return [Integer, nil]
TestCreateData = Struct.new(
  :project_id,
  :completedAt,
  :duration,
  :environment,
  :failed,
  :id,
  :name,
  :passed,
  :platform,
  :projectId,
  :results,
  :skipped,
  :startedAt,
  :status,
  :testSuite,
  :totalTests,
  keyword_init: true
)

