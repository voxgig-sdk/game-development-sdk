-- GameDevelopment SDK error

local GameDevelopmentError = {}
GameDevelopmentError.__index = GameDevelopmentError


function GameDevelopmentError.new(code, msg, ctx)
  local self = setmetatable({}, GameDevelopmentError)
  self.is_sdk_error = true
  self.sdk = "GameDevelopment"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function GameDevelopmentError:error()
  return self.msg
end


function GameDevelopmentError:__tostring()
  return self.msg
end


return GameDevelopmentError
