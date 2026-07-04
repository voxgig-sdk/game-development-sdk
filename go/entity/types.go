// Typed models for the GameDevelopment SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Analytics is the typed data model for the analytics entity.
type Analytics struct {
	Count *int `json:"count,omitempty"`
	EventName string `json:"event_name"`
	EventType string `json:"event_type"`
	Name *string `json:"name,omitempty"`
	Property *map[string]any `json:"property,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
}

// AnalyticsListMatch is the typed request payload for Analytics.ListTyped.
type AnalyticsListMatch struct {
	ProjectId string `json:"project_id"`
}

// AnalyticsCreateData is the typed request payload for Analytics.CreateTyped.
type AnalyticsCreateData struct {
	ProjectId string `json:"project_id"`
}

// Asset is the typed data model for the asset entity.
type Asset struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Id *string `json:"id,omitempty"`
	MimeType *string `json:"mime_type,omitempty"`
	Name *string `json:"name,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
	Size *int `json:"size,omitempty"`
	Tag *[]any `json:"tag,omitempty"`
	Type *string `json:"type,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Url *string `json:"url,omitempty"`
}

// AssetLoadMatch is the typed request payload for Asset.LoadTyped.
type AssetLoadMatch struct {
	Id string `json:"id"`
	ProjectId string `json:"project_id"`
}

// AssetListMatch is the typed request payload for Asset.ListTyped.
type AssetListMatch struct {
	ProjectId string `json:"project_id"`
}

// AssetCreateData is the typed request payload for Asset.CreateTyped.
type AssetCreateData struct {
	ProjectId string `json:"project_id"`
}

// AssetRemoveMatch is the typed request payload for Asset.RemoveTyped.
type AssetRemoveMatch struct {
	Id string `json:"id"`
	ProjectId string `json:"project_id"`
}

// Build is the typed data model for the build entity.
type Build struct {
	Configuration string `json:"configuration"`
	Platform string `json:"platform"`
	Version string `json:"version"`
}

// BuildCreateData is the typed request payload for Build.CreateTyped.
type BuildCreateData struct {
	ProjectId string `json:"project_id"`
}

// Collaboration is the typed data model for the collaboration entity.
type Collaboration struct {
	AddedAt *string `json:"added_at,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *string `json:"id,omitempty"`
	LastActive *string `json:"last_active,omitempty"`
	Name *string `json:"name,omitempty"`
	Role *string `json:"role,omitempty"`
	Status *string `json:"status,omitempty"`
	UserId *string `json:"user_id,omitempty"`
}

// CollaborationListMatch is the typed request payload for Collaboration.ListTyped.
type CollaborationListMatch struct {
	ProjectId string `json:"project_id"`
}

// CollaborationRemoveMatch is the typed request payload for Collaboration.RemoveTyped.
type CollaborationRemoveMatch struct {
	ProjectId string `json:"project_id"`
	UserId string `json:"user_id"`
}

// Collaborator is the typed data model for the collaborator entity.
type Collaborator struct {
	Email string `json:"email"`
	Role string `json:"role"`
}

// CollaboratorCreateData is the typed request payload for Collaborator.CreateTyped.
type CollaboratorCreateData struct {
	ProjectId string `json:"project_id"`
}

// Deployment is the typed data model for the deployment entity.
type Deployment struct {
	BuildVersion *string `json:"build_version,omitempty"`
	CompletedAt *string `json:"completed_at,omitempty"`
	Configuration *string `json:"configuration,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	DeploymentUrl *string `json:"deployment_url,omitempty"`
	DownloadUrl *string `json:"download_url,omitempty"`
	Environment *string `json:"environment,omitempty"`
	Id *string `json:"id,omitempty"`
	Platform *string `json:"platform,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
	ReleaseNote *string `json:"release_note,omitempty"`
	Size *int `json:"size,omitempty"`
	Status *string `json:"status,omitempty"`
	Version *string `json:"version,omitempty"`
}

// DeploymentLoadMatch is the typed request payload for Deployment.LoadTyped.
type DeploymentLoadMatch struct {
	Id string `json:"id"`
	ProjectId string `json:"project_id"`
}

// DeploymentListMatch is the typed request payload for Deployment.ListTyped.
type DeploymentListMatch struct {
	ProjectId string `json:"project_id"`
}

// DeploymentCreateData is the typed request payload for Deployment.CreateTyped.
type DeploymentCreateData struct {
	ProjectId string `json:"project_id"`
}

// Project is the typed data model for the project entity.
type Project struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Owner *map[string]any `json:"owner,omitempty"`
	Setting *map[string]any `json:"setting,omitempty"`
	Status *string `json:"status,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// ProjectLoadMatch is the typed request payload for Project.LoadTyped.
type ProjectLoadMatch struct {
	Id string `json:"id"`
}

// ProjectListMatch mirrors the project fields as an all-optional match
// filter (Go analog of Partial<Project>).
type ProjectListMatch struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Owner *map[string]any `json:"owner,omitempty"`
	Setting *map[string]any `json:"setting,omitempty"`
	Status *string `json:"status,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// ProjectCreateData mirrors the project fields as an all-optional match
// filter (Go analog of Partial<Project>).
type ProjectCreateData struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Owner *map[string]any `json:"owner,omitempty"`
	Setting *map[string]any `json:"setting,omitempty"`
	Status *string `json:"status,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// ProjectUpdateData is the typed request payload for Project.UpdateTyped.
type ProjectUpdateData struct {
	Id string `json:"id"`
}

// ProjectRemoveMatch is the typed request payload for Project.RemoveTyped.
type ProjectRemoveMatch struct {
	Id string `json:"id"`
}

// Test is the typed data model for the test entity.
type Test struct {
	CompletedAt *string `json:"completed_at,omitempty"`
	Environment *string `json:"environment,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Platform *string `json:"platform,omitempty"`
	ProjectId *string `json:"project_id,omitempty"`
	Result *map[string]any `json:"result,omitempty"`
	StartedAt *string `json:"started_at,omitempty"`
	Status *string `json:"status,omitempty"`
	TestSuite *string `json:"test_suite,omitempty"`
}

// TestLoadMatch is the typed request payload for Test.LoadTyped.
type TestLoadMatch struct {
	Id string `json:"id"`
	ProjectId string `json:"project_id"`
}

// TestListMatch is the typed request payload for Test.ListTyped.
type TestListMatch struct {
	ProjectId string `json:"project_id"`
}

// TestCreateData is the typed request payload for Test.CreateTyped.
type TestCreateData struct {
	ProjectId string `json:"project_id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
