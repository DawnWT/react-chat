import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { getCookie, setCookie } from 'hono/cookie'
import { sign, verify } from 'hono/jwt'
import { z } from 'zod'

import { db } from '../database/db.js'
import { env } from '../helpers/env.js'
import { Payload } from '../types/auth.js'

const auth = new Hono()

auth.post(
  '/register',
  zValidator(
    'json',
    z.object({
      username: z.string(),
      displayName: z.string().optional(),
      password: z.string(),
    })
  ),
  async (ctx) => {
    const { username, password, displayName } = ctx.req.valid('json')

    const newUser = await db
      .insertInto('users')
      // eslint-disable-next-line camelcase
      .values({ id_name: username, password, display_name: displayName ?? username })
      .returning('id')
      .returning('id_name')
      .returning('display_name')
      .returning('password')
      .executeTakeFirst()

    if (newUser === undefined) {
      return ctx.json({ error: 'This username is already taken' }, 400)
    }

    const payload: Payload = {
      id: newUser.id,
      username: newUser.id_name,
    }

    const jwt = await sign(payload, env.JWT_SECRET)
    setCookie(ctx, 'jwt', jwt)

    return ctx.json(payload)
  }
)

auth.post(
  '/login',
  zValidator('json', z.object({ username: z.string().optional(), password: z.string().optional() })),
  async (ctx) => {
    const { username, password } = ctx.req.valid('json')

    if (username === undefined || password === undefined) {
      const token = getCookie(ctx, 'jwt')

      if (token === undefined) {
        return ctx.json({ error: 'Invalid username or password' }, 400)
      }

      const payload = await (verify(token, env.JWT_SECRET) as Promise<Payload>).catch(() => null)

      if (payload === null) {
        return ctx.json({ error: 'Invalid token' }, 400)
      }

      return ctx.json(payload)
    }

    const user = await db
      .selectFrom('users')
      .where('id_name', '=', username)
      .where('password', '=', password)
      .select('id')
      .select('id_name')
      .executeTakeFirst()

    if (user === undefined) {
      return ctx.json({ error: 'Invalid username or password' }, 400)
    }

    const payload: Payload = {
      id: user.id,
      username: user.id_name,
    }

    const jwt = await sign(payload, env.JWT_SECRET)
    setCookie(ctx, 'jwt', jwt)

    return ctx.json(payload)
  }
)

export default auth
