import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { deleteCookie, setCookie } from 'hono/cookie'
import { jwt, sign } from 'hono/jwt'
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
      displayName: newUser.display_name,
      password: newUser.password,
    }

    const jwt = await sign(payload, env.JWT_SECRET)
    setCookie(ctx, 'jwt', jwt)

    return ctx.json(payload)
  }
)

auth.post('/login', zValidator('json', z.object({ username: z.string(), password: z.string() })), async (ctx) => {
  const { username, password } = ctx.req.valid('json')

  const user = await db
    .selectFrom('users')
    .where('id_name', '=', username)
    .where('password', '=', password)
    .select('id')
    .select('id_name')
    .select('display_name')
    .select('password')
    .executeTakeFirst()

  if (user === undefined) {
    return ctx.json({ error: 'Invalid username or password' }, 400)
  }

  const payload: Payload = {
    id: user.id,
    username: user.id_name,
    displayName: user.display_name,
    password: user.password,
  }

  const jwt = await sign(payload, env.JWT_SECRET)
  setCookie(ctx, 'jwt', jwt)

  return ctx.json(payload)
})

auth.get('/jwt', jwt({ secret: env.JWT_SECRET, cookie: 'jwt' }), (ctx) => {
  const payload = ctx.get('jwtPayload') as Payload

  return ctx.json(payload)
})

auth.get('/logout', jwt({ secret: env.JWT_SECRET, cookie: 'jwt' }), (ctx) => {
  deleteCookie(ctx, 'jwt')

  return ctx.json({ message: 'Logged out' })
})

export default auth
