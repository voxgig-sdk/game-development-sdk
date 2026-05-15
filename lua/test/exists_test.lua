-- ProjectName SDK exists test

local sdk = require("game-development_sdk")

describe("GameDevelopmentSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
