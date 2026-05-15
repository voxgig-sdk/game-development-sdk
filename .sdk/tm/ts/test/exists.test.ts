
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { GameDevelopmentSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await GameDevelopmentSDK.test()
    equal(null !== testsdk, true)
  })

})
