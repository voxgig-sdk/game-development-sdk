
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { GameDevelopmentSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = GameDevelopmentSDK.test()
    equal(testsdk instanceof GameDevelopmentSDK, true,
      'GameDevelopmentSDK.test() must return a client synchronously')
  })

})
