# GameDevelopment SDK exists test

require "minitest/autorun"
require_relative "../GameDevelopment_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = GameDevelopmentSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
