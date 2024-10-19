import { appKey } from '#config/app'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AppKeyValidatorMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const apiKey = ctx.request.header('X-Api-Key') as string

    const appKeySecret = appKey?.release() as string

    if (!apiKey || !appKeySecret || apiKey !== appKeySecret) {
      return ctx.response.status(401).json({
        error: 'Unauthorized: Invalid API key',
      })
    }

    await next()
  }
}
