# GameDevelopment SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module GameDevelopmentFeatures
  def self.make_feature(name)
    case name
    when "base"
      GameDevelopmentBaseFeature.new
    when "test"
      GameDevelopmentTestFeature.new
    else
      GameDevelopmentBaseFeature.new
    end
  end
end
