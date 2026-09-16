# GameDevelopment SDK feature factory

from gamedevelopment_sdk.feature.base_feature import GameDevelopmentBaseFeature
from gamedevelopment_sdk.feature.ratelimit_feature import GameDevelopmentRatelimitFeature
from gamedevelopment_sdk.feature.retry_feature import GameDevelopmentRetryFeature
from gamedevelopment_sdk.feature.test_feature import GameDevelopmentTestFeature
from gamedevelopment_sdk.feature.timeout_feature import GameDevelopmentTimeoutFeature


_FEATURES = {
    "base": lambda: GameDevelopmentBaseFeature(),
    "ratelimit": lambda: GameDevelopmentRatelimitFeature(),
    "retry": lambda: GameDevelopmentRetryFeature(),
    "test": lambda: GameDevelopmentTestFeature(),
    "timeout": lambda: GameDevelopmentTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
