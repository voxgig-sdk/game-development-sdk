

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


describe('DeploymentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GAME_DEVELOPMENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('GAME_DEVELOPMENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GameDevelopmentSDK.test()
    const ent = testsdk.Deployment()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GAME_DEVELOPMENT_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'deployment.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"buildVersion","op":{"create":{"req":true,"type":"`$STRING`"}},"req":false,"type":"`$STRING`","index$":0},{"active":true,"format":"date-time","name":"completedAt","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"configuration","req":false,"type":"`$STRING`","index$":2},{"active":true,"format":"date-time","name":"createdAt","req":false,"type":"`$STRING`","index$":3},{"active":true,"format":"uri","name":"deploymentUrl","req":false,"type":"`$STRING`","index$":4},{"active":true,"format":"uri","name":"downloadUrl","req":false,"type":"`$STRING`","index$":5},{"active":true,"name":"environment","op":{"create":{"req":true,"type":"`$STRING`"}},"req":false,"type":"`$STRING`","index$":6},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":7},{"active":true,"name":"platform","op":{"create":{"req":true,"type":"`$STRING`"}},"req":false,"type":"`$STRING`","index$":8},{"active":true,"name":"projectId","req":false,"type":"`$STRING`","index$":9},{"active":true,"name":"releaseNotes","req":false,"type":"`$STRING`","index$":10},{"active":true,"name":"size","req":false,"short":"Build size in bytes","type":"`$INTEGER`","index$":11},{"active":true,"name":"status","req":false,"type":"`$STRING`","index$":12},{"active":true,"name":"version","req":false,"type":"`$STRING`","index$":13}],"id":{"field":"id","name":"id"},"name":"deployment","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"project_id","orig":"project_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /projects/{projectId}/deployments","json":"{\"operationId\":\"createDeployment\",\"parameters\":[{\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"buildVersion\":{\"type\":\"string\"},\"environment\":{\"enum\":[\"development\",\"staging\",\"production\"],\"type\":\"string\"},\"platform\":{\"enum\":[\"windows\",\"macos\",\"linux\",\"android\",\"ios\",\"web\",\"console\"],\"type\":\"string\"},\"releaseNotes\":{\"type\":\"string\"}},\"required\":[\"environment\",\"platform\",\"buildVersion\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"buildVersion\":{\"type\":\"string\"},\"completedAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"createdAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"deploymentUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"environment\":{\"enum\":[\"development\",\"staging\",\"production\"],\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"platform\":{\"enum\":[\"windows\",\"macos\",\"linux\",\"android\",\"ios\",\"web\",\"console\"],\"type\":\"string\"},\"projectId\":{\"type\":\"string\"},\"releaseNotes\":{\"type\":\"string\"},\"status\":{\"enum\":[\"pending\",\"building\",\"deploying\",\"success\",\"failed\",\"cancelled\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Deployment created successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"The request was malformed or contains invalid parameters\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication information is missing or invalid\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/projects/{projectId}/deployments","rename":{"param":{"projectId":"project_id"}},"segments":[{"lit":"projects"},{"var":"project_id"},{"lit":"deployments"}],"select":{"exist":["project_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"project_id","orig":"project_id","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"status","orig":"status","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /projects/{projectId}/deployments","json":"{\"operationId\":\"listDeployments\",\"parameters\":[{\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"status\",\"schema\":{\"enum\":[\"pending\",\"building\",\"deploying\",\"success\",\"failed\",\"cancelled\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"deployments\":{\"items\":{\"properties\":{\"buildVersion\":{\"type\":\"string\"},\"completedAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"createdAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"deploymentUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"environment\":{\"enum\":[\"development\",\"staging\",\"production\"],\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"platform\":{\"enum\":[\"windows\",\"macos\",\"linux\",\"android\",\"ios\",\"web\",\"console\"],\"type\":\"string\"},\"projectId\":{\"type\":\"string\"},\"releaseNotes\":{\"type\":\"string\"},\"status\":{\"enum\":[\"pending\",\"building\",\"deploying\",\"success\",\"failed\",\"cancelled\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication information is missing or invalid\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/projects/{projectId}/deployments","rename":{"param":{"projectId":"project_id"}},"segments":[{"lit":"projects"},{"var":"project_id"},{"lit":"deployments"}],"select":{"exist":["project_id","status"]},"transform":{"req":"`reqdata`","res":"`body.deployments`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"project_id","orig":"project_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /projects/{projectId}/builds","json":"{\"operationId\":\"listBuilds\",\"parameters\":[{\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"builds\":{\"items\":{\"properties\":{\"completedAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"configuration\":{\"enum\":[\"debug\",\"release\"],\"type\":\"string\"},\"createdAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"downloadUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"platform\":{\"enum\":[\"windows\",\"macos\",\"linux\",\"android\",\"ios\",\"web\",\"console\"],\"type\":\"string\"},\"projectId\":{\"type\":\"string\"},\"size\":{\"description\":\"Build size in bytes\",\"type\":\"integer\"},\"status\":{\"enum\":[\"pending\",\"building\",\"success\",\"failed\"],\"type\":\"string\"},\"version\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication information is missing or invalid\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/projects/{projectId}/builds","rename":{"param":{"projectId":"project_id"}},"segments":[{"lit":"projects"},{"var":"project_id"},{"lit":"builds"}],"select":{"exist":["project_id"]},"transform":{"req":"`reqdata`","res":"`body.builds`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"deployment_id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"project_id","orig":"project_id","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /projects/{projectId}/deployments/{deploymentId}","json":"{\"operationId\":\"getDeployment\",\"parameters\":[{\"in\":\"path\",\"name\":\"projectId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"deploymentId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"buildVersion\":{\"type\":\"string\"},\"completedAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"createdAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"deploymentUrl\":{\"format\":\"uri\",\"type\":\"string\"},\"environment\":{\"enum\":[\"development\",\"staging\",\"production\"],\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"platform\":{\"enum\":[\"windows\",\"macos\",\"linux\",\"android\",\"ios\",\"web\",\"console\"],\"type\":\"string\"},\"projectId\":{\"type\":\"string\"},\"releaseNotes\":{\"type\":\"string\"},\"status\":{\"enum\":[\"pending\",\"building\",\"deploying\",\"success\",\"failed\",\"cancelled\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication information is missing or invalid\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"type\":\"string\"},\"details\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"The requested resource was not found\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/projects/{projectId}/deployments/{deploymentId}","rename":{"param":{"deploymentId":"id","projectId":"project_id"}},"segments":[{"lit":"projects"},{"var":"project_id"},{"lit":"deployments"},{"var":"id"}],"select":{"exist":["id","project_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["project"]]},"key$":"deployment","name__orig":"deployment","Name":"Deployment","name_":"deployment","name-":"deployment","NAME":"DEPLOYMENT","index$":5}, {"active":true,"entity":"deployment","key$":"BasicDeploymentFlow","kind":"basic","name":"BasicDeploymentFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"deployment_ref01"},"match":{"project_id":"project01"},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{"project_id":"project01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"deployment_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"deployment_ref01","srcdatavar":"deployment_ref01_data","suffix":"_dt0"},"match":{"id":"deployment01","project_id":"project01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-deployment_ref01"}}],"index$":2}]}, 'Deployment')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const deployment_ref01_ent = client.Deployment()
    let deployment_ref01_data = setup.data.new.deployment['deployment_ref01']
    deployment_ref01_data['project_id'] = setup.idmap['project01']

    deployment_ref01_data = (await deployment_ref01_ent.create(deployment_ref01_data)).data()
    assert(null != deployment_ref01_data.id)


    // LIST
    const deployment_ref01_match: any = {}
    deployment_ref01_match['project_id'] = setup.idmap['project01']

    const deployment_ref01_list = (await deployment_ref01_ent.list(deployment_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(deployment_ref01_list, { id: deployment_ref01_data.id })))


    // LOAD
    const deployment_ref01_match_dt0: any = {}
    deployment_ref01_match_dt0.id = deployment_ref01_data.id
    const deployment_ref01_data_dt0 = (await deployment_ref01_ent.load(deployment_ref01_match_dt0)).data()
    assert(deployment_ref01_data_dt0.id === deployment_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/deployment/DeploymentTestData.json')

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
    ['deployment01','deployment02','deployment03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GAME_DEVELOPMENT_TEST_DEPLOYMENT_ENTID': idmap,
    'GAME_DEVELOPMENT_TEST_LIVE': 'FALSE',
    'GAME_DEVELOPMENT_TEST_EXPLAIN': 'FALSE',
    'GAME_DEVELOPMENT_APIKEY': '',
  })

  idmap = env['GAME_DEVELOPMENT_TEST_DEPLOYMENT_ENTID']

  const live = 'TRUE' === env.GAME_DEVELOPMENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GAME_DEVELOPMENT_TEST_DEPLOYMENT_ENTID']
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
  
