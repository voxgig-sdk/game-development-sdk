

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


describe('AssetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GAME_DEVELOPMENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('GAME_DEVELOPMENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GameDevelopmentSDK.test()
    const ent = testsdk.Asset()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GAME_DEVELOPMENT_TEST_LIVE
    for (const op of ['create', 'list', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'asset.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":false,"t":"`$STRING`","key$":"createdAt","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"mimeType":{"a":true,"h":"Mime Type","n":"mimeType","r":false,"t":"`$STRING`","key$":"mimeType","index$":2},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":3},"projectId":{"a":true,"h":"Project Id","n":"projectId","r":false,"t":"`$STRING`","key$":"projectId","index$":4},"size":{"a":true,"h":"Size","n":"size","r":false,"sh":"File size in bytes","t":"`$INTEGER`","key$":"size","index$":5},"tags":{"a":true,"h":"Tags","n":"tags","r":false,"t":"`$ARRAY`","key$":"tags","index$":6},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$STRING`","key$":"type","index$":7},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":false,"t":"`$STRING`","key$":"updatedAt","index$":8},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"t":"`$STRING`","key$":"url","index$":9}},"id":{"field":"id","name":"id"},"name":"asset","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /projects/{projectId}/assets","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/projects/{projectId}/assets","q":{"exist":["project_id"]},"r":{"param":{"projectId":"project_id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"assets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /projects/{projectId}/assets","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/projects/{projectId}/assets","q":{"exist":["limit","project_id","type"]},"r":{"param":{"projectId":"project_id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"assets"}],"t":{"req":"`reqdata`","res":"`body.assets`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /projects/{projectId}/assets/{assetId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"asset_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/projects/{projectId}/assets/{assetId}","q":{"exist":["id","project_id"]},"r":{"param":{"assetId":"id","projectId":"project_id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"assets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /projects/{projectId}/assets/{assetId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"asset_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/projects/{projectId}/assets/{assetId}","q":{"exist":["id","project_id"]},"r":{"param":{"assetId":"id","projectId":"project_id"}},"s":[{"lit":"projects"},{"var":"project_id"},{"lit":"assets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.project"]]},"key$":"asset","name__orig":"asset","Name":"Asset","name_":"asset","name-":"asset","NAME":"ASSET","index$":1}, {"active":true,"entity":"asset","key$":"BasicAssetFlow","kind":"basic","name":"BasicAssetFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"asset_ref01"},"m":{"project_id":"project01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"project_id":"project01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"asset_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"asset_ref01","srcdatavar":"asset_ref01_data","suffix":"_dt0"},"m":{"id":"asset01","project_id":"project01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-asset_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"asset_ref01","suffix":"_rm0"},"m":{"id":"asset01","project_id":"project01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"project_id":"project01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"asset_ref01"}}],"index$":4}]}, 'Asset', {"POST /projects/{projectId}/assets":{"protocol":"http","operationId":"uploadAsset","requestBody":{"required":true,"content":{"multipart/form-data":{"schema":{"type":"object","properties":{"file":{"type":"string","format":"binary","description":"Asset file to upload"},"name":{"type":"string","description":"Display name for the asset"},"type":{"type":"string","enum":["image","audio","video","model","texture","script","font","config"]},"tags":{"type":"array","items":{"type":"string"}}},"required":["file","type"]}}}},"responses":{"201":{"description":"Asset uploaded successfully","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"string","key$":"id"},"projectId":{"type":"string","key$":"projectId"},"name":{"type":"string","key$":"name"},"type":{"enum":["image","audio","video","model","texture","script","font","config"],"type":"string","key$":"type"},"url":{"format":"uri","type":"string","key$":"url"},"size":{"description":"File size in bytes","type":"integer","key$":"size"},"mimeType":{"type":"string","key$":"mimeType"},"tags":{"items":{"type":"string"},"type":"array","key$":"tags"},"createdAt":{"format":"date-time","type":"string","key$":"createdAt"},"updatedAt":{"format":"date-time","type":"string","key$":"updatedAt"}},"x-ref":"#/components/schemas/Asset"}}}},"400":{"description":"The request was malformed or contains invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string"},"message":{"type":"string"},"details":{"type":"array","items":{"type":"object"}}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/BadRequestError"},"401":{"description":"Authentication information is missing or invalid","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string"},"message":{"type":"string"},"details":{"type":"array","items":{"type":"object"}}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/UnauthorizedError"}},"parameters":[{"name":"projectId","in":"path","required":true,"description":"Unique identifier of the project","schema":{"type":"string"},"index$":0}],"security":[{"bearerAuth":[]}],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT"}}},"GET /projects/{projectId}/assets":{"protocol":"http","operationId":"listAssets","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"assets":{"items":{"properties":{"createdAt":{"format":"date-time","type":"string","key$":"createdAt"},"id":{"type":"string","key$":"id"},"mimeType":{"type":"string","key$":"mimeType"},"name":{"type":"string","key$":"name"},"projectId":{"type":"string","key$":"projectId"},"size":{"description":"File size in bytes","type":"integer","key$":"size"},"tags":{"items":{"type":"string"},"type":"array","key$":"tags"},"type":{"enum":["image","audio","video","model","texture","script","font","config"],"type":"string","key$":"type"},"updatedAt":{"format":"date-time","type":"string","key$":"updatedAt"},"url":{"format":"uri","type":"string","key$":"url"}},"type":"object","x-ref":"#/components/schemas/Asset","index$":0},"key$":"assets","type":"array"},"total":{"key$":"total","type":"integer"}}}}}},"401":{"description":"Authentication information is missing or invalid","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string"},"message":{"type":"string"},"details":{"type":"array","items":{"type":"object"}}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/UnauthorizedError"}},"parameters":[{"name":"projectId","in":"path","required":true,"description":"Unique identifier of the project","schema":{"type":"string"},"index$":0},{"name":"type","in":"query","description":"Filter assets by type","schema":{"type":"string","enum":["image","audio","video","model","texture","script","font","config"]},"index$":1},{"name":"limit","in":"query","schema":{"type":"integer","default":50},"index$":2}],"security":[{"bearerAuth":[]}],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT"}}},"GET /projects/{projectId}/assets/{assetId}":{"protocol":"http","operationId":"getAsset","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"string","key$":"id"},"projectId":{"type":"string","key$":"projectId"},"name":{"type":"string","key$":"name"},"type":{"enum":["image","audio","video","model","texture","script","font","config"],"type":"string","key$":"type"},"url":{"format":"uri","type":"string","key$":"url"},"size":{"description":"File size in bytes","type":"integer","key$":"size"},"mimeType":{"type":"string","key$":"mimeType"},"tags":{"items":{"type":"string"},"type":"array","key$":"tags"},"createdAt":{"format":"date-time","type":"string","key$":"createdAt"},"updatedAt":{"format":"date-time","type":"string","key$":"updatedAt"}},"x-ref":"#/components/schemas/Asset","index$":0}}}},"401":{"description":"Authentication information is missing or invalid","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string"},"message":{"type":"string"},"details":{"type":"array","items":{"type":"object"}}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/UnauthorizedError"},"404":{"description":"The requested resource was not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string"},"message":{"type":"string"},"details":{"type":"array","items":{"type":"object"}}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/NotFoundError"}},"parameters":[{"name":"projectId","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"assetId","in":"path","required":true,"schema":{"type":"string"},"index$":1}],"security":[{"bearerAuth":[]}],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT"}}},"DELETE /projects/{projectId}/assets/{assetId}":{"protocol":"http","operationId":"deleteAsset","responses":{"204":{"description":"Asset deleted successfully"},"401":{"description":"Authentication information is missing or invalid","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string"},"message":{"type":"string"},"details":{"type":"array","items":{"type":"object"}}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/UnauthorizedError"},"404":{"description":"The requested resource was not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"object","properties":{"code":{"type":"string"},"message":{"type":"string"},"details":{"type":"array","items":{"type":"object"}}}}},"x-ref":"#/components/schemas/Error"}}},"x-ref":"#/components/responses/NotFoundError"}},"parameters":[{"name":"projectId","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"assetId","in":"path","required":true,"schema":{"type":"string"},"index$":1}],"security":[{"bearerAuth":[]}],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const asset_ref01_ent = client.Asset()
    let asset_ref01_data = setup.data.new.asset['asset_ref01']
    asset_ref01_data['project_id'] = setup.idmap['project01']

    asset_ref01_data = (await asset_ref01_ent.create(asset_ref01_data)).data()
    assert(null != asset_ref01_data.id)


    // LIST
    const asset_ref01_match: any = {}
    asset_ref01_match['project_id'] = setup.idmap['project01']

    const asset_ref01_list = (await asset_ref01_ent.list(asset_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(asset_ref01_list, { id: asset_ref01_data.id })))


    // LOAD
    const asset_ref01_match_dt0: any = {}
    asset_ref01_match_dt0.id = asset_ref01_data.id
    const asset_ref01_data_dt0 = (await asset_ref01_ent.load(asset_ref01_match_dt0)).data()
    assert(asset_ref01_data_dt0.id === asset_ref01_data.id)


    // REMOVE
    const asset_ref01_match_rm0: any = { id: asset_ref01_data.id }
    await asset_ref01_ent.remove(asset_ref01_match_rm0)
  

    // LIST
    const asset_ref01_match_rt0: any = {}
    asset_ref01_match_rt0['project_id'] = setup.idmap['project01']

    const asset_ref01_list_rt0 = (await asset_ref01_ent.list(asset_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(asset_ref01_list_rt0, { id: asset_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/asset/AssetTestData.json')

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
    ['asset01','asset02','asset03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GAME_DEVELOPMENT_TEST_ASSET_ENTID': idmap,
    'GAME_DEVELOPMENT_TEST_LIVE': 'FALSE',
    'GAME_DEVELOPMENT_TEST_EXPLAIN': 'FALSE',
    'GAME_DEVELOPMENT_APIKEY': '',
  })

  idmap = env['GAME_DEVELOPMENT_TEST_ASSET_ENTID']

  const live = 'TRUE' === env.GAME_DEVELOPMENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GAME_DEVELOPMENT_TEST_ASSET_ENTID']
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
  
