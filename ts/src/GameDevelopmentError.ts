
import { Context } from './Context'


class GameDevelopmentError extends Error {

  isGameDevelopmentError = true

  sdk = 'GameDevelopment'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  GameDevelopmentError
}

