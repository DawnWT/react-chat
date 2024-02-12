import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { setCookie } from 'hono/cookie'
import { sign } from 'hono/jwt'
import { z } from 'zod'

import { db } from '../database/db.js'
import { env } from '../helpers/env.js'

const auth = new Hono()

auth.post(
  '/register',
  zValidator(
    'json',
    z.object({
      username: z.string(),
      password: z.string(),
    })
  ),
  async (ctx) => {
    const { username, password } = ctx.req.valid('json')

    const userExist = await db.selectFrom('users').where('name', '=', username).select('id').executeTakeFirst()

    if (userExist !== undefined) {
      return ctx.json({ error: 'Username already exists' }, 400)
    }

    const newUser = await db
      .insertInto('users')
      .values({ name: username, password, uniqueName: username })
      .returning('id')
      .returning('password')
      .executeTakeFirst()

    if (newUser === undefined) {
      return ctx.json({ error: 'Failed to register user' }, 500)
    }

    const jwt = await sign({ id: newUser.id, password: newUser.password }, env.JWT_SECRET)
    setCookie(ctx, 'jwt', jwt)

    return ctx.json({ id: newUser.id })
  }
)

auth.post('/login', zValidator('json', z.object({ username: z.string(), password: z.string() })), async (ctx) => {
  const { username, password } = ctx.req.valid('json')

  const user = await db
    .selectFrom('users')
    .where('name', '=', username)
    .where('password', '=', password)
    .select('id')
    .select('password')
    .executeTakeFirst()

  if (user === undefined) {
    return ctx.json({ error: 'Invalid username or password' }, 400)
  }

  const jwt = await sign({ id: user.id, password: user.password }, env.JWT_SECRET)
  setCookie(ctx, 'jwt', jwt)

  return ctx.json({ id: user.id })
})

export default auth
