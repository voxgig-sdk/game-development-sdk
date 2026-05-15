# GameDevelopment SDK utility: feature_add
module GameDevelopmentUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
