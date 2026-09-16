# GameDevelopment SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module GameDevelopmentFeatures
  def self.make_feature(name)
    case name
    when "base"
      GameDevelopmentBaseFeature.new
    when "ratelimit"
      GameDevelopmentRatelimitFeature.new
    when "retry"
      GameDevelopmentRetryFeature.new
    when "test"
      GameDevelopmentTestFeature.new
    when "timeout"
      GameDevelopmentTimeoutFeature.new
    else
      GameDevelopmentBaseFeature.new
    end
  end
end
