

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


describe('BuildEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GAME_DEVELOPMENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('GAME_DEVELOPMENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GameDevelopmentSDK.test()
    const ent = testsdk.Build()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GAME_DEVELOPMENT_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'build.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"configuration":{"a":true,"h":"Configuration","n":"configuration","r":true,"t":"`$STRING`","key$":"configuration","index$":0},"platform":{"a":true,"h":"Platform","n":"platform","r":true,"t":"`$STRING`","key$":"platform","index$":1},"version":{"a":true,"h":"Version","n":"version","r":true,"t":"`$STRING`","key$":"version","index$":2}},"name":"build","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /projects/{projectId}/builds","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/projects/{projectId}/builds","q":{"exist":["project_id"]},"r":{"param":{"projectId":"project_id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"builds"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.project"]]},"key$":"build","name__orig":"build","Name":"Build","name_":"build","name-":"build","NAME":"BUILD","index$":2}, {"active":true,"entity":"build","key$":"BasicBuildFlow","kind":"basic","name":"BasicBuildFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"build_ref01"},"m":{"project_id":"project01"},"o":"create","s":[],"v":[],"index$":0}]}, 'Build', {"POST /projects/{projectId}/builds":{"protocol":"http","operationId":"createBuild","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"version":{"type":"string","key$":"version"},"platform":{"type":"string","enum":["windows","macos","linux","android","ios","web","console"],"key$":"platform"},"configuration":{"type":"string","enum":["debug","release"],"key$":"configuration"}},"required":["version","platform","configuration"],"index$":1}}}},"responses":{"201":{"description":"Build created successfully","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"string"},"projectId":{"type":"string"},"version":{"type":"string"},"platform":{"enum":["windows","macos","linux","android","ios","web","console"],"type":"string"},"configuration":{"enum":["debug","release"],"type":"string"},"status":{"enum":["pending","building","success","failed"],"type":"string"},"size":{"description":"Build size in bytes","type":"integer"},"downloadUrl":{"format":"uri","type":"string"},"createdAt":{"format":"date-time","type":"string"},"completedAt":{"format":"date-time","type":"string"}},"x-ref":"#/components/schemas/Build"}}}},"400":{"description":"The request was malformed or contains invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string"},"message":{"type":"string"},"details":{"type":"array","items":{"type":"object"}}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/BadRequestError"},"401":{"description":"Authentication information is missing or invalid","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string"},"message":{"type":"string"},"details":{"type":"array","items":{"type":"object"}}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/UnauthorizedError"}},"parameters":[{"name":"projectId","in":"path","required":true,"schema":{"type":"string"},"index$":0}],"security":[{"bearerAuth":[]}],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const build_ref01_ent = client.Build()
    let build_ref01_data = setup.data.new.build['build_ref01']
    build_ref01_data['project_id'] = setup.idmap['project01']

    build_ref01_data = (await build_ref01_ent.create(build_ref01_data)).data()
    assert(null != build_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/build/BuildTestData.json')

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
    ['build01','build02','build03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GAME_DEVELOPMENT_TEST_BUILD_ENTID': idmap,
    'GAME_DEVELOPMENT_TEST_LIVE': 'FALSE',
    'GAME_DEVELOPMENT_TEST_EXPLAIN': 'FALSE',
    'GAME_DEVELOPMENT_APIKEY': '',
  })

  idmap = env['GAME_DEVELOPMENT_TEST_BUILD_ENTID']

  const live = 'TRUE' === env.GAME_DEVELOPMENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GAME_DEVELOPMENT_TEST_BUILD_ENTID']
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
  
