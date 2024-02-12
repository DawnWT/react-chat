import { MiddlewareHandler } from 'hono'
import { getCookie } from 'hono/cookie'
import { verify } from 'hono/jwt'

import { env } from '../helpers/env.js'
import { Payload } from '../types/auth.js'

export const logged: MiddlewareHandler<{ Variables: { userPayload: Payload } }> = async function (ctx, next) {
  const hashedJwt = getCookie(ctx, 'jwt')

  if (hashedJwt === undefined) {
    return ctx.json({ error: 'Unauthorized' }, 401)
  }

  const payload = (await verify(hashedJwt, env.JWT_SECRET)) as Payload

  ctx.set('userPayload', payload)

  await next()

  return
}
