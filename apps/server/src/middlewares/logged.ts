import { MiddlewareHandler } from 'hono'
import { getCookie } from 'hono/cookie'
import { verify } from 'hono/jwt'

import { env } from '../helpers/env.js'

export const logged: MiddlewareHandler<{ Variables: { user: { id: string; password: string } } }> = async function (
  ctx,
  next
) {
  const hashedJwt = getCookie(ctx, 'jwt')

  if (hashedJwt === undefined) {
    return ctx.json({ error: 'Unauthorized' }, 401)
  }

  const payload = (await verify(hashedJwt, env.JWT_SECRET)) as { id: string; password: string }

  ctx.set<'user'>('user', payload)

  await next()

  return
}
