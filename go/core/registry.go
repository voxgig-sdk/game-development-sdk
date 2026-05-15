package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAnalyticsEntityFunc func(client *GameDevelopmentSDK, entopts map[string]any) GameDevelopmentEntity

var NewAssetEntityFunc func(client *GameDevelopmentSDK, entopts map[string]any) GameDevelopmentEntity

var NewBuildEntityFunc func(client *GameDevelopmentSDK, entopts map[string]any) GameDevelopmentEntity

var NewCollaborationEntityFunc func(client *GameDevelopmentSDK, entopts map[string]any) GameDevelopmentEntity

var NewCollaboratorEntityFunc func(client *GameDevelopmentSDK, entopts map[string]any) GameDevelopmentEntity

var NewDeploymentEntityFunc func(client *GameDevelopmentSDK, entopts map[string]any) GameDevelopmentEntity

var NewProjectEntityFunc func(client *GameDevelopmentSDK, entopts map[string]any) GameDevelopmentEntity

var NewTestEntityFunc func(client *GameDevelopmentSDK, entopts map[string]any) GameDevelopmentEntity

