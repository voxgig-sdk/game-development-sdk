

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"completedAt":{"a":true,"fo":"date-time","h":"Completed At","n":"completedAt","r":false,"t":"`$STRING`","key$":"completedAt","index$":0},"duration":{"a":true,"h":"Duration","n":"duration","r":false,"sh":"Test duration in seconds","t":"`$NUMBER`","key$":"duration","index$":1},"environment":{"a":true,"h":"Environment","n":"environment","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"environment","index$":2},"failed":{"a":true,"h":"Failed","n":"failed","r":false,"t":"`$INTEGER`","key$":"failed","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":4},"name":{"a":true,"h":"Name","n":"name","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"name","index$":5},"passed":{"a":true,"h":"Passed","n":"passed","r":false,"t":"`$INTEGER`","key$":"passed","index$":6},"platform":{"a":true,"h":"Platform","n":"platform","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"platform","index$":7},"projectId":{"a":true,"h":"Project Id","n":"projectId","r":false,"t":"`$STRING`","key$":"projectId","index$":8},"results":{"a":true,"h":"Results","n":"results","r":false,"t":"`$OBJECT`","key$":"results","index$":9},"skipped":{"a":true,"h":"Skipped","n":"skipped","r":false,"t":"`$INTEGER`","key$":"skipped","index$":10},"startedAt":{"a":true,"fo":"date-time","h":"Started At","n":"startedAt","r":false,"t":"`$STRING`","key$":"startedAt","index$":11},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":12},"testSuite":{"a":true,"h":"Test Suite","n":"testSuite","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"testSuite","index$":13},"totalTests":{"a":true,"h":"Total Tests","n":"totalTests","r":false,"t":"`$INTEGER`","key$":"totalTests","index$":14}},"id":{"field":"id","name":"id"},"name":"test","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /projects/{projectId}/tests","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/projects/{projectId}/tests","q":{"exist":["project_id"]},"r":{"param":{"projectId":"project_id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"tests"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /projects/{projectId}/tests","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"status","or":"status","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/projects/{projectId}/tests","q":{"exist":["project_id","status"]},"r":{"param":{"projectId":"project_id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"tests"}],"t":{"req":"`reqdata`","res":"`body.tests`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /projects/{projectId}/tests/{testId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"test_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/projects/{projectId}/tests/{testId}","q":{"exist":["id","project_id"]},"r":{"param":{"projectId":"project_id","testId":"id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"tests"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.project"]]},"key$":"test","name__orig":"test","Name":"Test","name_":"test","name-":"test","NAME":"TEST","index$":7}, {"active":true,"entity":"test","key$":"BasicTestFlow","kind":"basic","name":"BasicTestFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"test_ref01"},"m":{"project_id":"project01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"project_id":"project01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"test_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"test_ref01","srcdatavar":"test_ref01_data","suffix":"_dt0"},"m":{"id":"test01","project_id":"project01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-test_ref01"}}],"index$":2}]}, 'Test', {"POST /projects/{projectId}/tests":{"protocol":"http","operationId":"createTestRun","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","key$":"name"},"testSuite":{"type":"string","key$":"testSuite"},"environment":{"type":"string","enum":["development","staging","production"],"key$":"environment"},"platform":{"type":"string","enum":["windows","macos","linux","android","ios","web"],"key$":"platform"}},"required":["name","testSuite","environment","platform"],"index$":1}}}},"responses":{"201":{"description":"Test run created successfully","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"string"},"projectId":{"type":"string"},"name":{"type":"string"},"testSuite":{"type":"string"},"environment":{"enum":["development","staging","production"],"type":"string"},"platform":{"enum":["windows","macos","linux","android","ios","web"],"type":"string"},"status":{"enum":["pending","running","passed","failed","cancelled"],"type":"string"},"results":{"properties":{"duration":{"description":"Test duration in seconds","type":"number","key$":"duration"},"failed":{"type":"integer","key$":"failed"},"passed":{"type":"integer","key$":"passed"},"skipped":{"type":"integer","key$":"skipped"},"totalTests":{"type":"integer","key$":"totalTests"}},"type":"object","index$":0},"startedAt":{"format":"date-time","type":"string"},"completedAt":{"format":"date-time","type":"string"}},"x-ref":"#/components/schemas/TestRun"}}}},"400":{"description":"The request was malformed or contains invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string"},"message":{"type":"string"},"details":{"type":"array","items":{"type":"object"}}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/BadRequestError"},"401":{"description":"Authentication information is missing or invalid","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string"},"message":{"type":"string"},"details":{"type":"array","items":{"type":"object"}}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/UnauthorizedError"}},"parameters":[{"name":"projectId","in":"path","required":true,"schema":{"type":"string"},"index$":0}],"security":[{"bearerAuth":[]}],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT"}}},"GET /projects/{projectId}/tests":{"protocol":"http","operationId":"listTestRuns","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"tests":{"items":{"properties":{"completedAt":{"format":"date-time","type":"string","key$":"completedAt"},"environment":{"enum":["development","staging","production"],"type":"string","key$":"environment"},"id":{"type":"string","key$":"id"},"name":{"type":"string","key$":"name"},"platform":{"enum":["windows","macos","linux","android","ios","web"],"type":"string","key$":"platform"},"projectId":{"type":"string","key$":"projectId"},"results":{"properties":{"duration":{"description":"Test duration in seconds","type":"number","key$":"duration"},"failed":{"type":"integer","key$":"failed"},"passed":{"type":"integer","key$":"passed"},"skipped":{"type":"integer","key$":"skipped"},"totalTests":{"type":"integer","key$":"totalTests"}},"type":"object","key$":"results"},"startedAt":{"format":"date-time","type":"string","key$":"startedAt"},"status":{"enum":["pending","running","passed","failed","cancelled"],"type":"string","key$":"status"},"testSuite":{"type":"string","key$":"testSuite"}},"type":"object","x-ref":"#/components/schemas/TestRun","index$":0},"key$":"tests","type":"array"}}}}}},"401":{"description":"Authentication information is missing or invalid","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string"},"message":{"type":"string"},"details":{"type":"array","items":{"type":"object"}}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/UnauthorizedError"}},"parameters":[{"name":"projectId","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"status","in":"query","description":"Filter by test status","schema":{"type":"string","enum":["pending","running","passed","failed","cancelled"]},"index$":1}],"security":[{"bearerAuth":[]}],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT"}}},"GET /projects/{projectId}/tests/{testId}":{"protocol":"http","operationId":"getTestRun","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"string"},"projectId":{"type":"string"},"name":{"type":"string"},"testSuite":{"type":"string"},"environment":{"enum":["development","staging","production"],"type":"string"},"platform":{"enum":["windows","macos","linux","android","ios","web"],"type":"string"},"status":{"enum":["pending","running","passed","failed","cancelled"],"type":"string"},"results":{"properties":{"duration":{"description":"Test duration in seconds","type":"number","key$":"duration"},"failed":{"type":"integer","key$":"failed"},"passed":{"type":"integer","key$":"passed"},"skipped":{"type":"integer","key$":"skipped"},"totalTests":{"type":"integer","key$":"totalTests"}},"type":"object","index$":0},"startedAt":{"format":"date-time","type":"string"},"completedAt":{"format":"date-time","type":"string"}},"x-ref":"#/components/schemas/TestRun"}}}},"401":{"description":"Authentication information is missing or invalid","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string"},"message":{"type":"string"},"details":{"type":"array","items":{"type":"object"}}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/UnauthorizedError"},"404":{"description":"The requested resource was not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string"},"message":{"type":"string"},"details":{"type":"array","items":{"type":"object"}}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/NotFoundError"}},"parameters":[{"name":"projectId","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"testId","in":"path","required":true,"schema":{"type":"string"},"index$":1}],"security":[{"bearerAuth":[]}],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT"}}}})
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
  
