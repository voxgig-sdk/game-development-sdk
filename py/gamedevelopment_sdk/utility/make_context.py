# GameDevelopment SDK utility: make_context

from gamedevelopment_sdk.core.context import GameDevelopmentContext


def make_context_util(ctxmap, basectx):
    return GameDevelopmentContext(ctxmap, basectx)
