

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


describe('AnalyticsEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GAME_DEVELOPMENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('GAME_DEVELOPMENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GameDevelopmentSDK.test()
    const ent = testsdk.Analytics()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GAME_DEVELOPMENT_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'analytics.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"count":{"a":true,"h":"Count","n":"count","r":false,"t":"`$INTEGER`","key$":"count","index$":0},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":1}},"name":"analytics","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /projects/{projectId}/analytics/events","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/projects/{projectId}/analytics/events","q":{"$action":"event","exist":["project_id"]},"r":{"param":{"projectId":"project_id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"analytics"},{"lit":"events"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /projects/{projectId}/analytics","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"end_date","or":"end_date","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"metric","or":"metric","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"start_date","or":"start_date","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/projects/{projectId}/analytics","q":{"exist":["end_date","metric","project_id","start_date"]},"r":{"param":{"projectId":"project_id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"analytics"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.project"]]},"key$":"analytics","name__orig":"analytics","Name":"Analytics","name_":"analytics","name-":"analytics","NAME":"ANALYTICS","index$":0}, {"active":true,"entity":"analytics","key$":"BasicAnalyticsFlow","kind":"basic","name":"BasicAnalyticsFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"analytics_ref01"},"m":{"project_id":"project01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"project_id":"project01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"analytics_ref01"}}],"index$":1}]}, 'Analytics', {"POST /projects/{projectId}/analytics/events":{"protocol":"http","operationId":"trackAnalyticsEvent","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"eventName":{"type":"string"},"eventType":{"type":"string","enum":["gameplay","ui_interaction","error","performance","custom"]},"properties":{"type":"object","additionalProperties":true},"timestamp":{"type":"string","format":"date-time"}},"required":["eventName","eventType"]}}}},"responses":{"202":{"description":"Event accepted for processing","content":{"application/json":{"schema":{"type":"object","properties":{"message":{"type":"string"},"eventId":{"type":"string"}}}}}},"400":{"description":"The request was malformed or contains invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string"},"message":{"type":"string"},"details":{"type":"array","items":{"type":"object"}}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/BadRequestError"},"401":{"description":"Authentication information is missing or invalid","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string"},"message":{"type":"string"},"details":{"type":"array","items":{"type":"object"}}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/UnauthorizedError"}},"parameters":[{"name":"projectId","in":"path","required":true,"schema":{"type":"string"},"index$":0}],"security":[{"bearerAuth":[]}],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT"}}},"GET /projects/{projectId}/analytics":{"protocol":"http","operationId":"getProjectAnalytics","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"projectId":{"key$":"projectId","type":"string"},"period":{"key$":"period","properties":{"endDate":{"format":"date","type":"string"},"startDate":{"format":"date","type":"string"}},"type":"object"},"metrics":{"key$":"metrics","properties":{"averageSessionDuration":{"description":"Average session duration in seconds","type":"number"},"crashRate":{"description":"Percentage of sessions with crashes","type":"number"},"retentionRate":{"description":"Percentage of returning players","type":"number"},"totalPlays":{"type":"integer"},"uniquePlayers":{"type":"integer"}},"type":"object"},"events":{"items":{"properties":{"count":{"type":"integer","key$":"count"},"name":{"type":"string","key$":"name"}},"type":"object","index$":0},"key$":"events","type":"array"}},"x-ref":"#/components/schemas/Analytics"}}}},"401":{"description":"Authentication information is missing or invalid","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string"},"message":{"type":"string"},"details":{"type":"array","items":{"type":"object"}}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/UnauthorizedError"}},"parameters":[{"name":"projectId","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"startDate","in":"query","description":"Start date for analytics period (ISO 8601 format)","schema":{"type":"string","format":"date"},"index$":1},{"name":"endDate","in":"query","description":"End date for analytics period (ISO 8601 format)","schema":{"type":"string","format":"date"},"index$":2},{"name":"metrics","in":"query","description":"Comma-separated list of metrics to retrieve","schema":{"type":"string"},"index$":3}],"security":[{"bearerAuth":[]}],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const analytics_ref01_ent = client.Analytics()
    let analytics_ref01_data = setup.data.new.analytics['analytics_ref01']
    analytics_ref01_data['project_id'] = setup.idmap['project01']

    analytics_ref01_data = (await analytics_ref01_ent.create(analytics_ref01_data)).data()
    assert(null != analytics_ref01_data)


    // LIST
    const analytics_ref01_match: any = {}
    analytics_ref01_match['project_id'] = setup.idmap['project01']

    const analytics_ref01_list = (await analytics_ref01_ent.list(analytics_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/analytics/AnalyticsTestData.json')

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
    ['analytics01','analytics02','analytics03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GAME_DEVELOPMENT_TEST_ANALYTICS_ENTID': idmap,
    'GAME_DEVELOPMENT_TEST_LIVE': 'FALSE',
    'GAME_DEVELOPMENT_TEST_EXPLAIN': 'FALSE',
    'GAME_DEVELOPMENT_APIKEY': '',
  })

  idmap = env['GAME_DEVELOPMENT_TEST_ANALYTICS_ENTID']

  const live = 'TRUE' === env.GAME_DEVELOPMENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GAME_DEVELOPMENT_TEST_ANALYTICS_ENTID']
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
  
