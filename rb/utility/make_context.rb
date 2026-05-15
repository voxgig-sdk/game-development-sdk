# GameDevelopment SDK utility: make_context
require_relative '../core/context'
module GameDevelopmentUtilities
  MakeContext = ->(ctxmap, basectx) {
    GameDevelopmentContext.new(ctxmap, basectx)
  }
end
