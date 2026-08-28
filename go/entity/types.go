// Typed models for the GameDevelopment SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/game-development-sdk/go/core"
)

// Analytics is the typed data model for the analytics entity.
type Analytics struct {
	Count *int `json:"count,omitempty"`
	EventName string `json:"eventName"`
	EventType string `json:"eventType"`
	Name *string `json:"name,omitempty"`
	Properties *map[string]any `json:"properties,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
}

// AnalyticsListMatch is the typed request payload for Analytics.ListTyped.
type AnalyticsListMatch struct {
	ProjectId string `json:"project_id"`
	EndDate *string `json:"end_date,omitempty"`
	Metric *string `json:"metric,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
}

// AnalyticsCreateData is the typed request payload for Analytics.CreateTyped.
type AnalyticsCreateData struct {
	ProjectId string `json:"project_id"`
	Count *int `json:"count,omitempty"`
	EventName string `json:"eventName"`
	EventType string `json:"eventType"`
	Name *string `json:"name,omitempty"`
	Properties *map[string]any `json:"properties,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
}

// Asset is the typed data model for the asset entity.
type Asset struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Id *string `json:"id,omitempty"`
	MimeType *string `json:"mimeType,omitempty"`
	Name *string `json:"name,omitempty"`
	ProjectId *string `json:"projectId,omitempty"`
	Size *int `json:"size,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	Type *string `json:"type,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
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
	Limit *int `json:"limit,omitempty"`
	Type *string `json:"type,omitempty"`
}

// AssetCreateData is the typed request payload for Asset.CreateTyped.
type AssetCreateData struct {
	ProjectId string `json:"project_id"`
	CreatedAt *string `json:"createdAt,omitempty"`
	Id *string `json:"id,omitempty"`
	MimeType *string `json:"mimeType,omitempty"`
	Name *string `json:"name,omitempty"`
	ProjectId2 *string `json:"projectId,omitempty"`
	Size *int `json:"size,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	Type *string `json:"type,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
	Url *string `json:"url,omitempty"`
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
	Configuration string `json:"configuration"`
	Platform string `json:"platform"`
	Version string `json:"version"`
}

// Collaboration is the typed data model for the collaboration entity.
type Collaboration struct {
	AddedAt *string `json:"addedAt,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *string `json:"id,omitempty"`
	LastActive *string `json:"lastActive,omitempty"`
	Name *string `json:"name,omitempty"`
	Role *string `json:"role,omitempty"`
	Status *string `json:"status,omitempty"`
	UserId *string `json:"userId,omitempty"`
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
	Email string `json:"email"`
	Role string `json:"role"`
}

// Deployment is the typed data model for the deployment entity.
type Deployment struct {
	BuildVersion *string `json:"buildVersion,omitempty"`
	CompletedAt *string `json:"completedAt,omitempty"`
	Configuration *string `json:"configuration,omitempty"`
	CreatedAt *string `json:"createdAt,omitempty"`
	DeploymentUrl *string `json:"deploymentUrl,omitempty"`
	DownloadUrl *string `json:"downloadUrl,omitempty"`
	Environment *string `json:"environment,omitempty"`
	Id *string `json:"id,omitempty"`
	Platform *string `json:"platform,omitempty"`
	ProjectId *string `json:"projectId,omitempty"`
	ReleaseNotes *string `json:"releaseNotes,omitempty"`
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
	Status *string `json:"status,omitempty"`
}

// DeploymentCreateData is the typed request payload for Deployment.CreateTyped.
type DeploymentCreateData struct {
	ProjectId string `json:"project_id"`
	BuildVersion *string `json:"buildVersion,omitempty"`
	CompletedAt *string `json:"completedAt,omitempty"`
	Configuration *string `json:"configuration,omitempty"`
	CreatedAt *string `json:"createdAt,omitempty"`
	DeploymentUrl *string `json:"deploymentUrl,omitempty"`
	DownloadUrl *string `json:"downloadUrl,omitempty"`
	Environment *string `json:"environment,omitempty"`
	Id *string `json:"id,omitempty"`
	Platform *string `json:"platform,omitempty"`
	ProjectId2 *string `json:"projectId,omitempty"`
	ReleaseNotes *string `json:"releaseNotes,omitempty"`
	Size *int `json:"size,omitempty"`
	Status *string `json:"status,omitempty"`
	Version *string `json:"version,omitempty"`
}

// Project is the typed data model for the project entity.
type Project struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Owner *map[string]any `json:"owner,omitempty"`
	Settings *map[string]any `json:"settings,omitempty"`
	Status *string `json:"status,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
}

// ProjectLoadMatch is the typed request payload for Project.LoadTyped.
type ProjectLoadMatch struct {
	Id string `json:"id"`
}

// ProjectListMatch is the typed request payload for Project.ListTyped.
type ProjectListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Status *string `json:"status,omitempty"`
}

// ProjectCreateData is the typed request payload for Project.CreateTyped.
type ProjectCreateData struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Owner *map[string]any `json:"owner,omitempty"`
	Settings *map[string]any `json:"settings,omitempty"`
	Status *string `json:"status,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
}

// ProjectUpdateData is the typed request payload for Project.UpdateTyped.
type ProjectUpdateData struct {
	Id string `json:"id"`
	CreatedAt *string `json:"createdAt,omitempty"`
	Description *string `json:"description,omitempty"`
	Name *string `json:"name,omitempty"`
	Owner *map[string]any `json:"owner,omitempty"`
	Settings *map[string]any `json:"settings,omitempty"`
	Status *string `json:"status,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
}

// ProjectRemoveMatch is the typed request payload for Project.RemoveTyped.
type ProjectRemoveMatch struct {
	Id string `json:"id"`
}

// Test is the typed data model for the test entity.
type Test struct {
	CompletedAt *string `json:"completedAt,omitempty"`
	Duration *float64 `json:"duration,omitempty"`
	Environment string `json:"environment"`
	Failed *int `json:"failed,omitempty"`
	Id *string `json:"id,omitempty"`
	Name string `json:"name"`
	Passed *int `json:"passed,omitempty"`
	Platform string `json:"platform"`
	ProjectId *string `json:"projectId,omitempty"`
	Results *map[string]any `json:"results,omitempty"`
	Skipped *int `json:"skipped,omitempty"`
	StartedAt *string `json:"startedAt,omitempty"`
	Status *string `json:"status,omitempty"`
	TestSuite string `json:"testSuite"`
	TotalTests *int `json:"totalTests,omitempty"`
}

// TestLoadMatch is the typed request payload for Test.LoadTyped.
type TestLoadMatch struct {
	Id string `json:"id"`
	ProjectId string `json:"project_id"`
}

// TestListMatch is the typed request payload for Test.ListTyped.
type TestListMatch struct {
	ProjectId string `json:"project_id"`
	Status *string `json:"status,omitempty"`
}

// TestCreateData is the typed request payload for Test.CreateTyped.
type TestCreateData struct {
	ProjectId string `json:"project_id"`
	CompletedAt *string `json:"completedAt,omitempty"`
	Duration *float64 `json:"duration,omitempty"`
	Environment string `json:"environment"`
	Failed *int `json:"failed,omitempty"`
	Id *string `json:"id,omitempty"`
	Name string `json:"name"`
	Passed *int `json:"passed,omitempty"`
	Platform string `json:"platform"`
	ProjectId2 *string `json:"projectId,omitempty"`
	Results *map[string]any `json:"results,omitempty"`
	Skipped *int `json:"skipped,omitempty"`
	StartedAt *string `json:"startedAt,omitempty"`
	Status *string `json:"status,omitempty"`
	TestSuite string `json:"testSuite"`
	TotalTests *int `json:"totalTests,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
