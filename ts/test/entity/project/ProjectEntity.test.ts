
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { GameDevelopmentSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('ProjectEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GAME_DEVELOPMENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('GAME_DEVELOPMENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GameDevelopmentSDK.test()
    const ent = testsdk.Project()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GAME_DEVELOPMENT_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (maybeSkipControl(t, 'entityOp', 'project.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set GAME_DEVELOPMENT_TEST_PROJECT_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const project_ref01_ent = client.Project()
    let project_ref01_data = setup.data.new.project['project_ref01']

    project_ref01_data = (await project_ref01_ent.create(project_ref01_data)).data()
    assert(null != project_ref01_data.id)


    // LIST
    const project_ref01_match: any = {}

    const project_ref01_list = (await project_ref01_ent.list(project_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(project_ref01_list, { id: project_ref01_data.id })))


    // UPDATE
    const project_ref01_data_up0: any = {}
    project_ref01_data_up0.id = project_ref01_data.id

    const project_ref01_markdef_up0 = { name: 'createdAt', value: 'Mark01-project_ref01_' + setup.now }
    ;(project_ref01_data_up0 as any)[project_ref01_markdef_up0.name] = project_ref01_markdef_up0.value

    const project_ref01_resdata_up0 = (await project_ref01_ent.update(project_ref01_data_up0)).data()
    assert(project_ref01_resdata_up0.id === project_ref01_data_up0.id)

    assert((project_ref01_resdata_up0 as any)[project_ref01_markdef_up0.name] === project_ref01_markdef_up0.value)


    // LOAD
    const project_ref01_match_dt0: any = {}
    project_ref01_match_dt0.id = project_ref01_data.id
    const project_ref01_data_dt0 = (await project_ref01_ent.load(project_ref01_match_dt0)).data()
    assert(project_ref01_data_dt0.id === project_ref01_data.id)


    // REMOVE
    const project_ref01_match_rm0: any = { id: project_ref01_data.id }
    await project_ref01_ent.remove(project_ref01_match_rm0)
  

    // LIST
    const project_ref01_match_rt0: any = {}

    const project_ref01_list_rt0 = (await project_ref01_ent.list(project_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(project_ref01_list_rt0, { id: project_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/project/ProjectTestData.json')

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
    ['project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['GAME_DEVELOPMENT_TEST_PROJECT_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'GAME_DEVELOPMENT_TEST_PROJECT_ENTID': idmap,
    'GAME_DEVELOPMENT_TEST_LIVE': 'FALSE',
    'GAME_DEVELOPMENT_TEST_EXPLAIN': 'FALSE',
    'GAME_DEVELOPMENT_APIKEY': 'NONE',
  })

  idmap = env['GAME_DEVELOPMENT_TEST_PROJECT_ENTID']

  const live = 'TRUE' === env.GAME_DEVELOPMENT_TEST_LIVE

  if (live) {
    client = new GameDevelopmentSDK(merge([
      {
        apikey: env.GAME_DEVELOPMENT_APIKEY,
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
