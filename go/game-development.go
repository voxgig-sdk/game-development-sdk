package voxgiggamedevelopmentsdk

import (
	"github.com/voxgig-sdk/game-development-sdk/go/core"
	"github.com/voxgig-sdk/game-development-sdk/go/entity"
	"github.com/voxgig-sdk/game-development-sdk/go/feature"
	_ "github.com/voxgig-sdk/game-development-sdk/go/utility"
)

// Type aliases preserve external API.
type GameDevelopmentSDK = core.GameDevelopmentSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type GameDevelopmentEntity = core.GameDevelopmentEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type GameDevelopmentError = core.GameDevelopmentError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAnalyticsEntityFunc = func(client *core.GameDevelopmentSDK, entopts map[string]any) core.GameDevelopmentEntity {
		return entity.NewAnalyticsEntity(client, entopts)
	}
	core.NewAssetEntityFunc = func(client *core.GameDevelopmentSDK, entopts map[string]any) core.GameDevelopmentEntity {
		return entity.NewAssetEntity(client, entopts)
	}
	core.NewBuildEntityFunc = func(client *core.GameDevelopmentSDK, entopts map[string]any) core.GameDevelopmentEntity {
		return entity.NewBuildEntity(client, entopts)
	}
	core.NewCollaborationEntityFunc = func(client *core.GameDevelopmentSDK, entopts map[string]any) core.GameDevelopmentEntity {
		return entity.NewCollaborationEntity(client, entopts)
	}
	core.NewCollaboratorEntityFunc = func(client *core.GameDevelopmentSDK, entopts map[string]any) core.GameDevelopmentEntity {
		return entity.NewCollaboratorEntity(client, entopts)
	}
	core.NewDeploymentEntityFunc = func(client *core.GameDevelopmentSDK, entopts map[string]any) core.GameDevelopmentEntity {
		return entity.NewDeploymentEntity(client, entopts)
	}
	core.NewProjectEntityFunc = func(client *core.GameDevelopmentSDK, entopts map[string]any) core.GameDevelopmentEntity {
		return entity.NewProjectEntity(client, entopts)
	}
	core.NewTestEntityFunc = func(client *core.GameDevelopmentSDK, entopts map[string]any) core.GameDevelopmentEntity {
		return entity.NewTestEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewGameDevelopmentSDK = core.NewGameDevelopmentSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewGameDevelopmentSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *GameDevelopmentSDK  { return NewGameDevelopmentSDK(nil) }
func Test() *GameDevelopmentSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
