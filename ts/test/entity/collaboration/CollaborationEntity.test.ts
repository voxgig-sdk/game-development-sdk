

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


describe('CollaborationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GAME_DEVELOPMENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('GAME_DEVELOPMENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GameDevelopmentSDK.test()
    const ent = testsdk.Collaboration()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GAME_DEVELOPMENT_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'collaboration.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"addedAt":{"a":true,"fo":"date-time","h":"Added At","n":"addedAt","r":false,"t":"`$STRING`","key$":"addedAt","index$":0},"email":{"a":true,"fo":"email","h":"Email","n":"email","r":false,"t":"`$STRING`","key$":"email","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"lastActive":{"a":true,"fo":"date-time","h":"Last Active","n":"lastActive","r":false,"t":"`$STRING`","key$":"lastActive","index$":3},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":4},"role":{"a":true,"h":"Role","n":"role","r":false,"t":"`$STRING`","key$":"role","index$":5},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":6},"userId":{"a":true,"h":"User Id","n":"userId","r":false,"t":"`$STRING`","key$":"userId","index$":7}},"id":{"field":"id","name":"id"},"name":"collaboration","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /projects/{projectId}/collaborators","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/projects/{projectId}/collaborators","q":{"exist":["project_id"]},"r":{"param":{"projectId":"project_id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"collaborators"}],"t":{"req":"`reqdata`","res":"`body.collaborators`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /projects/{projectId}/collaborators/{userId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"user_id","or":"user_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/projects/{projectId}/collaborators/{userId}","q":{"exist":["project_id","user_id"]},"r":{"param":{"projectId":"project_id","userId":"user_id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"collaborators"},{"var":"user_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.project"],["$.main.kit.entity.project","$.main.kit.entity.collaborator"]]},"key$":"collaboration","name__orig":"collaboration","Name":"Collaboration","name_":"collaboration","name-":"collaboration","NAME":"COLLABORATION","index$":3}, {"active":true,"entity":"collaboration","key$":"BasicCollaborationFlow","kind":"basic","name":"BasicCollaborationFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"project_id":"project01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"collaboration_ref01"}}],"index$":0}]}, 'Collaboration', {"GET /projects/{projectId}/collaborators":{"protocol":"http","operationId":"listCollaborators","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"collaborators":{"items":{"properties":{"addedAt":{"format":"date-time","type":"string","key$":"addedAt"},"email":{"format":"email","type":"string","key$":"email"},"id":{"type":"string","key$":"id"},"lastActive":{"format":"date-time","type":"string","key$":"lastActive"},"name":{"type":"string","key$":"name"},"role":{"enum":["owner","editor","viewer"],"type":"string","key$":"role"},"status":{"enum":["active","pending","inactive"],"type":"string","key$":"status"},"userId":{"type":"string","key$":"userId"}},"type":"object","x-ref":"#/components/schemas/Collaborator","index$":0},"key$":"collaborators","type":"array"}}}}}},"401":{"description":"Authentication information is missing or invalid","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string"},"message":{"type":"string"},"details":{"type":"array","items":{"type":"object"}}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/UnauthorizedError"}},"parameters":[{"name":"projectId","in":"path","required":true,"schema":{"type":"string"},"index$":0}],"security":[{"bearerAuth":[]}],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT"}}},"DELETE /projects/{projectId}/collaborators/{userId}":{"protocol":"http","operationId":"removeCollaborator","responses":{"204":{"description":"Collaborator removed successfully"},"401":{"description":"Authentication information is missing or invalid","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string"},"message":{"type":"string"},"details":{"type":"array","items":{"type":"object"}}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/UnauthorizedError"},"404":{"description":"The requested resource was not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string"},"message":{"type":"string"},"details":{"type":"array","items":{"type":"object"}}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/NotFoundError"}},"parameters":[{"name":"projectId","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"userId","in":"path","required":true,"schema":{"type":"string"},"index$":1}],"security":[{"bearerAuth":[]}],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let collaboration_ref01_data = Object.values(setup.data.existing.collaboration)[0] as any

    // LIST
    const collaboration_ref01_ent = client.Collaboration()
    const collaboration_ref01_match: any = {}
    collaboration_ref01_match['project_id'] = setup.idmap['project01']

    const collaboration_ref01_list = (await collaboration_ref01_ent.list(collaboration_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/collaboration/CollaborationTestData.json')

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
    ['collaboration01','collaboration02','collaboration03','project01','project02','project03','collaborator01','collaborator02','collaborator03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GAME_DEVELOPMENT_TEST_COLLABORATION_ENTID': idmap,
    'GAME_DEVELOPMENT_TEST_LIVE': 'FALSE',
    'GAME_DEVELOPMENT_TEST_EXPLAIN': 'FALSE',
    'GAME_DEVELOPMENT_APIKEY': '',
  })

  idmap = env['GAME_DEVELOPMENT_TEST_COLLABORATION_ENTID']

  const live = 'TRUE' === env.GAME_DEVELOPMENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GAME_DEVELOPMENT_TEST_COLLABORATION_ENTID']
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
  
