# GameDevelopment SDK feature factory

from feature.base_feature import GameDevelopmentBaseFeature
from feature.test_feature import GameDevelopmentTestFeature


def _make_feature(name):
    features = {
        "base": lambda: GameDevelopmentBaseFeature(),
        "test": lambda: GameDevelopmentTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
