// GameDevelopment Ts SDK

import { AnalyticsEntity } from './entity/AnalyticsEntity'
import { AssetEntity } from './entity/AssetEntity'
import { BuildEntity } from './entity/BuildEntity'
import { CollaborationEntity } from './entity/CollaborationEntity'
import { CollaboratorEntity } from './entity/CollaboratorEntity'
import { DeploymentEntity } from './entity/DeploymentEntity'
import { ProjectEntity } from './entity/ProjectEntity'
import { TestEntity } from './entity/TestEntity'

export type * from './GameDevelopmentTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { GameDevelopmentEntityBase } from './GameDevelopmentEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class GameDevelopmentSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _analytics?: AnalyticsEntity

  // Idiomatic facade: `client.analytics.list()` / `client.analytics.load({ id })`.
  get analytics(): AnalyticsEntity {
    return (this._analytics ??= new AnalyticsEntity(this, undefined))
  }

  /** @deprecated Use `client.analytics` instead. */
  Analytics(data?: any) {
    const self = this
    return new AnalyticsEntity(self,data)
  }


  _asset?: AssetEntity

  // Idiomatic facade: `client.asset.list()` / `client.asset.load({ id })`.
  get asset(): AssetEntity {
    return (this._asset ??= new AssetEntity(this, undefined))
  }

  /** @deprecated Use `client.asset` instead. */
  Asset(data?: any) {
    const self = this
    return new AssetEntity(self,data)
  }


  _build?: BuildEntity

  // Idiomatic facade: `client.build.list()` / `client.build.load({ id })`.
  get build(): BuildEntity {
    return (this._build ??= new BuildEntity(this, undefined))
  }

  /** @deprecated Use `client.build` instead. */
  Build(data?: any) {
    const self = this
    return new BuildEntity(self,data)
  }


  _collaboration?: CollaborationEntity

  // Idiomatic facade: `client.collaboration.list()` / `client.collaboration.load({ id })`.
  get collaboration(): CollaborationEntity {
    return (this._collaboration ??= new CollaborationEntity(this, undefined))
  }

  /** @deprecated Use `client.collaboration` instead. */
  Collaboration(data?: any) {
    const self = this
    return new CollaborationEntity(self,data)
  }


  _collaborator?: CollaboratorEntity

  // Idiomatic facade: `client.collaborator.list()` / `client.collaborator.load({ id })`.
  get collaborator(): CollaboratorEntity {
    return (this._collaborator ??= new CollaboratorEntity(this, undefined))
  }

  /** @deprecated Use `client.collaborator` instead. */
  Collaborator(data?: any) {
    const self = this
    return new CollaboratorEntity(self,data)
  }


  _deployment?: DeploymentEntity

  // Idiomatic facade: `client.deployment.list()` / `client.deployment.load({ id })`.
  get deployment(): DeploymentEntity {
    return (this._deployment ??= new DeploymentEntity(this, undefined))
  }

  /** @deprecated Use `client.deployment` instead. */
  Deployment(data?: any) {
    const self = this
    return new DeploymentEntity(self,data)
  }


  _project?: ProjectEntity

  // Idiomatic facade: `client.project.list()` / `client.project.load({ id })`.
  get project(): ProjectEntity {
    return (this._project ??= new ProjectEntity(this, undefined))
  }

  /** @deprecated Use `client.project` instead. */
  Project(data?: any) {
    const self = this
    return new ProjectEntity(self,data)
  }


  _test?: TestEntity

  // Idiomatic facade: `client.test.list()` / `client.test.load({ id })`.
  get test(): TestEntity {
    return (this._test ??= new TestEntity(this, undefined))
  }

  /** @deprecated Use `client.test` instead. */
  Test(data?: any) {
    const self = this
    return new TestEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new GameDevelopmentSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return GameDevelopmentSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'GameDevelopment' }
  }

  toString() {
    return 'GameDevelopment ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = GameDevelopmentSDK


export {
  stdutil,

  BaseFeature,
  GameDevelopmentEntityBase,

  GameDevelopmentSDK,
  SDK,
}


