package = "voxgig-sdk-game-development"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/game-development-sdk.git"
}
description = {
  summary = "GameDevelopment SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["game-development_sdk"] = "game-development_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
