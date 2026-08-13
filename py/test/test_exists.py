# GameDevelopment SDK exists test

import pytest
from gamedevelopment_sdk import GameDevelopmentSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = GameDevelopmentSDK.test(None, None)
        assert testsdk is not None
