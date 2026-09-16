

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { GameDevelopmentSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('TestEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GAME_DEVELOPMENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('GAME_DEVELOPMENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GameDevelopmentSDK.test()
    const ent = testsdk.Test()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GAME_DEVELOPMENT_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'test.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"completedAt","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"duration","req":false,"short":"Test duration in seconds","type":"`$NUMBER`","index$":1},{"active":true,"name":"environment","op":{"list":{"req":false,"type":"`$STRING`"}},"req":true,"type":"`$STRING`","index$":2},{"active":true,"name":"failed","req":false,"type":"`$INTEGER`","index$":3},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"name","op":{"list":{"req":false,"type":"`$STRING`"}},"req":true,"type":"`$STRING`","index$":5},{"active":true,"name":"passed","req":false,"type":"`$INTEGER`","index$":6},{"active":true,"name":"platform","op":{"list":{"req":false,"type":"`$STRING`"}},"req":true,"type":"`$STRING`","index$":7},{"active":true,"name":"projectId","req":false,"type":"`$STRING`","index$":8},{"active":true,"name":"results","req":false,"type":"`$OBJECT`","index$":9},{"active":true,"name":"skipped","req":false,"type":"`$INTEGER`","index$":10},{"active":true,"format":"date-time","name":"startedAt","req":false,"type":"`$STRING`","index$":11},{"active":true,"name":"status","req":false,"type":"`$STRING`","index$":12},{"active":true,"name":"testSuite","op":{"list":{"req":false,"type":"`$STRING`"}},"req":true,"type":"`$STRING`","index$":13},{"active":true,"name":"totalTests","req":false,"type":"`$INTEGER`","index$":14}],"id":{"field":"id","name":"id"},"name":"test","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"project_id","orig":"project_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /projects/{projectId}/tests","json":"{\"operationId\":\"createTestRun\",\"parameters\":[{\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"environment\":{\"enum\":[\"development\",\"staging\",\"production\"],\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"platform\":{\"enum\":[\"windows\",\"macos\",\"linux\",\"android\",\"ios\",\"web\"],\"type\":\"string\"},\"testSuite\":{\"type\":\"string\"}},\"required\":[\"name\",\"testSuite\",\"environment\",\"platform\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"completedAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"environment\":{\"enum\":[\"development\",\"staging\",\"production\"],\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"platform\":{\"enum\":[\"windows\",\"macos\",\"linux\",\"android\",\"ios\",\"web\"],\"type\":\"string\"},\"projectId\":{\"type\":\"string\"},\"results\":{\"properties\":{\"duration\":{\"description\":\"Test duration in seconds\",\"type\":\"number\"},\"failed\":{\"type\":\"integer\"},\"passed\":{\"type\":\"integer\"},\"skipped\":{\"type\":\"integer\"},\"totalTests\":{\"type\":\"integer\"}},\"type\":\"object\"},\"startedAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"status\":{\"enum\":[\"pending\",\"running\",\"passed\",\"failed\",\"cancelled\"],\"type\":\"string\"},\"testSuite\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Test run created successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"The request was malformed or contains invalid parameters\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication information is missing or invalid\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/projects/{projectId}/tests","rename":{"param":{"projectId":"project_id"}},"segments":[{"lit":"projects"},{"var":"project_id"},{"lit":"tests"}],"select":{"exist":["project_id"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"project_id","orig":"project_id","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"status","orig":"status","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /projects/{projectId}/tests","json":"{\"operationId\":\"listTestRuns\",\"parameters\":[{\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by test status\",\"in\":\"query\",\"name\":\"status\",\"schema\":{\"enum\":[\"pending\",\"running\",\"passed\",\"failed\",\"cancelled\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"tests\":{\"items\":{\"properties\":{\"completedAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"environment\":{\"enum\":[\"development\",\"staging\",\"production\"],\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"platform\":{\"enum\":[\"windows\",\"macos\",\"linux\",\"android\",\"ios\",\"web\"],\"type\":\"string\"},\"projectId\":{\"type\":\"string\"},\"results\":{\"properties\":{\"duration\":{\"description\":\"Test duration in seconds\",\"type\":\"number\"},\"failed\":{\"type\":\"integer\"},\"passed\":{\"type\":\"integer\"},\"skipped\":{\"type\":\"integer\"},\"totalTests\":{\"type\":\"integer\"}},\"type\":\"object\"},\"startedAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"status\":{\"enum\":[\"pending\",\"running\",\"passed\",\"failed\",\"cancelled\"],\"type\":\"string\"},\"testSuite\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication information is missing or invalid\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/projects/{projectId}/tests","rename":{"param":{"projectId":"project_id"}},"segments":[{"lit":"projects"},{"var":"project_id"},{"lit":"tests"}],"select":{"exist":["project_id","status"]},"transform":{"req":"`reqdata`","res":"`body.tests`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"test_id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"project_id","orig":"project_id","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /projects/{projectId}/tests/{testId}","json":"{\"operationId\":\"getTestRun\",\"parameters\":[{\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"testId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"completedAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"environment\":{\"enum\":[\"development\",\"staging\",\"production\"],\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"platform\":{\"enum\":[\"windows\",\"macos\",\"linux\",\"android\",\"ios\",\"web\"],\"type\":\"string\"},\"projectId\":{\"type\":\"string\"},\"results\":{\"properties\":{\"duration\":{\"description\":\"Test duration in seconds\",\"type\":\"number\"},\"failed\":{\"type\":\"integer\"},\"passed\":{\"type\":\"integer\"},\"skipped\":{\"type\":\"integer\"},\"totalTests\":{\"type\":\"integer\"}},\"type\":\"object\"},\"startedAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"status\":{\"enum\":[\"pending\",\"running\",\"passed\",\"failed\",\"cancelled\"],\"type\":\"string\"},\"testSuite\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication information is missing or invalid\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"The requested resource was not found\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/projects/{projectId}/tests/{testId}","rename":{"param":{"projectId":"project_id","testId":"id"}},"segments":[{"lit":"projects"},{"var":"project_id"},{"lit":"tests"},{"var":"id"}],"select":{"exist":["id","project_id"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["project"]]},"key$":"test","name__orig":"test","Name":"Test","name_":"test","name-":"test","NAME":"TEST","index$":7}, {"active":true,"entity":"test","key$":"BasicTestFlow","kind":"basic","name":"BasicTestFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"test_ref01"},"match":{"project_id":"project01"},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{"project_id":"project01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"test_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"test_ref01","srcdatavar":"test_ref01_data","suffix":"_dt0"},"match":{"id":"test01","project_id":"project01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-test_ref01"}}],"index$":2}]}, 'Test')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const test_ref01_ent = client.Test()
    let test_ref01_data = setup.data.new.test['test_ref01']
    test_ref01_data['project_id'] = setup.idmap['project01']

    test_ref01_data = (await test_ref01_ent.create(test_ref01_data)).data()
    assert(null != test_ref01_data.id)


    // LIST
    const test_ref01_match: any = {}
    test_ref01_match['project_id'] = setup.idmap['project01']

    const test_ref01_list = (await test_ref01_ent.list(test_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(test_ref01_list, { id: test_ref01_data.id })))


    // LOAD
    const test_ref01_match_dt0: any = {}
    test_ref01_match_dt0.id = test_ref01_data.id
    const test_ref01_data_dt0 = (await test_ref01_ent.load(test_ref01_match_dt0)).data()
    assert(test_ref01_data_dt0.id === test_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/test/TestTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = GameDevelopmentSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['test01','test02','test03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GAME_DEVELOPMENT_TEST_TEST_ENTID': idmap,
    'GAME_DEVELOPMENT_TEST_LIVE': 'FALSE',
    'GAME_DEVELOPMENT_TEST_EXPLAIN': 'FALSE',
    'GAME_DEVELOPMENT_APIKEY': '',
  })

  idmap = env['GAME_DEVELOPMENT_TEST_TEST_ENTID']

  const live = 'TRUE' === env.GAME_DEVELOPMENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GAME_DEVELOPMENT_TEST_TEST_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new GameDevelopmentSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.GAME_DEVELOPMENT_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.GAME_DEVELOPMENT_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
