

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"count","req":false,"type":"`$INTEGER`","index$":0},{"active":true,"name":"name","req":false,"type":"`$STRING`","index$":1}],"name":"analytics","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"project_id","orig":"project_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /projects/{projectId}/analytics/events","json":"{\"operationId\":\"trackAnalyticsEvent\",\"parameters\":[{\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"eventName\":{\"type\":\"string\"},\"eventType\":{\"enum\":[\"gameplay\",\"ui_interaction\",\"error\",\"performance\",\"custom\"],\"type\":\"string\"},\"properties\":{\"additionalProperties\":true,\"type\":\"object\"},\"timestamp\":{\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"eventName\",\"eventType\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"202\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"eventId\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Event accepted for processing\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"The request was malformed or contains invalid parameters\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication information is missing or invalid\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/projects/{projectId}/analytics/events","rename":{"param":{"projectId":"project_id"}},"segments":[{"lit":"projects"},{"var":"project_id"},{"lit":"analytics"},{"lit":"events"}],"select":{"$action":"event","exist":["project_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"project_id","orig":"project_id","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"end_date","orig":"end_date","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"metric","orig":"metric","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"start_date","orig":"start_date","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /projects/{projectId}/analytics","json":"{\"operationId\":\"getProjectAnalytics\",\"parameters\":[{\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Start date for analytics period (ISO 8601 format)\",\"in\":\"query\",\"name\":\"startDate\",\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"End date for analytics period (ISO 8601 format)\",\"in\":\"query\",\"name\":\"endDate\",\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Comma-separated list of metrics to retrieve\",\"in\":\"query\",\"name\":\"metrics\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"events\":{\"items\":{\"properties\":{\"count\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"metrics\":{\"properties\":{\"averageSessionDuration\":{\"description\":\"Average session duration in seconds\",\"type\":\"number\"},\"crashRate\":{\"description\":\"Percentage of sessions with crashes\",\"type\":\"number\"},\"retentionRate\":{\"description\":\"Percentage of returning players\",\"type\":\"number\"},\"totalPlays\":{\"type\":\"integer\"},\"uniquePlayers\":{\"type\":\"integer\"}},\"type\":\"object\"},\"period\":{\"properties\":{\"endDate\":{\"format\":\"date\",\"type\":\"string\"},\"startDate\":{\"format\":\"date\",\"type\":\"string\"}},\"type\":\"object\"},\"projectId\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication information is missing or invalid\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/projects/{projectId}/analytics","rename":{"param":{"projectId":"project_id"}},"segments":[{"lit":"projects"},{"var":"project_id"},{"lit":"analytics"}],"select":{"exist":["end_date","metric","project_id","start_date"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["project"]]},"key$":"analytics","name__orig":"analytics","Name":"Analytics","name_":"analytics","name-":"analytics","NAME":"ANALYTICS","index$":0}, {"active":true,"entity":"analytics","key$":"BasicAnalyticsFlow","kind":"basic","name":"BasicAnalyticsFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"analytics_ref01"},"match":{"project_id":"project01"},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{"project_id":"project01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"analytics_ref01"}}],"index$":1}]}, 'Analytics')
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
  
