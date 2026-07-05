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
# @!attribute [rw] event_name
#   @return [String]
#
# @!attribute [rw] event_type
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] property
#   @return [Hash, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
Analytics = Struct.new(
  :count,
  :event_name,
  :event_type,
  :name,
  :property,
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
AnalyticsCreateData = Struct.new(
  :project_id,
  keyword_init: true
)

# Asset entity data model.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] mime_type
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] tag
#   @return [Array, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Asset = Struct.new(
  :created_at,
  :id,
  :mime_type,
  :name,
  :project_id,
  :size,
  :tag,
  :type,
  :updated_at,
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
AssetCreateData = Struct.new(
  :project_id,
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
BuildCreateData = Struct.new(
  :project_id,
  keyword_init: true
)

# Collaboration entity data model.
#
# @!attribute [rw] added_at
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] last_active
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
# @!attribute [rw] user_id
#   @return [String, nil]
Collaboration = Struct.new(
  :added_at,
  :email,
  :id,
  :last_active,
  :name,
  :role,
  :status,
  :user_id,
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
CollaboratorCreateData = Struct.new(
  :project_id,
  keyword_init: true
)

# Deployment entity data model.
#
# @!attribute [rw] build_version
#   @return [String, nil]
#
# @!attribute [rw] completed_at
#   @return [String, nil]
#
# @!attribute [rw] configuration
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] deployment_url
#   @return [String, nil]
#
# @!attribute [rw] download_url
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
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] release_note
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
  :build_version,
  :completed_at,
  :configuration,
  :created_at,
  :deployment_url,
  :download_url,
  :environment,
  :id,
  :platform,
  :project_id,
  :release_note,
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
DeploymentCreateData = Struct.new(
  :project_id,
  keyword_init: true
)

# Project entity data model.
#
# @!attribute [rw] created_at
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
# @!attribute [rw] setting
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
Project = Struct.new(
  :created_at,
  :description,
  :id,
  :name,
  :owner,
  :setting,
  :status,
  :updated_at,
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
# @!attribute [rw] created_at
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
# @!attribute [rw] setting
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
ProjectListMatch = Struct.new(
  :created_at,
  :description,
  :id,
  :name,
  :owner,
  :setting,
  :status,
  :updated_at,
  keyword_init: true
)

# Request payload for Project#create.
#
# @!attribute [rw] created_at
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
# @!attribute [rw] setting
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
ProjectCreateData = Struct.new(
  :created_at,
  :description,
  :id,
  :name,
  :owner,
  :setting,
  :status,
  :updated_at,
  keyword_init: true
)

# Request payload for Project#update.
#
# @!attribute [rw] id
#   @return [String]
ProjectUpdateData = Struct.new(
  :id,
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
# @!attribute [rw] completed_at
#   @return [String, nil]
#
# @!attribute [rw] environment
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] platform
#   @return [String, nil]
#
# @!attribute [rw] project_id
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [Hash, nil]
#
# @!attribute [rw] started_at
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] test_suite
#   @return [String, nil]
Test = Struct.new(
  :completed_at,
  :environment,
  :id,
  :name,
  :platform,
  :project_id,
  :result,
  :started_at,
  :status,
  :test_suite,
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
TestCreateData = Struct.new(
  :project_id,
  keyword_init: true
)

