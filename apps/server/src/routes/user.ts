import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { setCookie } from 'hono/cookie'
import { jwt, sign } from 'hono/jwt'
import { Payload } from 'shared-types'
import { z } from 'zod'

import { db } from '../database/db.js'
import { env } from '../helpers/env.js'

const users = new Hono()

users.get('/', jwt({ secret: env.JWT_SECRET, cookie: 'jwt' }), async (ctx) => {
  const queryName = ctx.req.query('name')

  let query = db.selectFrom('users')

  if (queryName !== undefined) {
    query = query.where('id_name', 'like', `%${queryName}%`)
  }

  const users = await query.select('id').select('id_name').execute()

  return ctx.json(users)
})

users.get(
  '/:id',
  jwt({
    secret: env.JWT_SECRET,
    cookie: 'jwt',
  }),
  async (ctx) => {
    const queryId = ctx.req.param('id')

    const parsedId = Number(queryId)

    if (Number.isNaN(parsedId)) {
      return ctx.json({ error: 'Invalid id' }, 400)
    }

    const user = await db
      .selectFrom('users')
      .where('id', '=', parsedId)
      .select('id')
      .select('id_name')
      .select('display_name')
      .select('created_at')
      .executeTakeFirst()

    if (user === undefined) {
      return ctx.json({ error: 'User not found' }, 404)
    }

    return ctx.json(user)
  }
)

users.put(
  '/:id',
  jwt({ secret: env.JWT_SECRET, cookie: 'jwt' }),
  zValidator(
    'json',
    z.object({ username: z.string().optional(), displayName: z.string().optional(), password: z.string().optional() })
  ),
  async (ctx) => {
    const queryId = ctx.req.param('id')
    const parsedId = Number(queryId)
    const { username, password, displayName } = ctx.req.valid('json')
    const payload = ctx.get('jwtPayload') as Payload

    if (Number.isNaN(parsedId)) {
      return ctx.json({ error: 'Invalid id' }, 400)
    }

    if (payload.id !== parsedId) {
      return ctx.json({ error: 'Unauthorized' }, 401)
    }

    let query = db.updateTable('users').where('id', '=', parsedId)

    if (username !== undefined) {
      query = query.set('id_name', username)
    }

    if (displayName !== undefined) {
      query = query.set('display_name', displayName)
    }

    if (password !== undefined) {
      query = query.set('password', password)
    }

    const updatedUser = await query.returning('id').returningAll().executeTakeFirst()

    if (updatedUser === undefined) {
      return ctx.json({ error: 'Failed to update user' }, 500)
    }

    const updatePayload: Payload = {
      id: updatedUser.id,
      username: updatedUser.id_name,
      displayName: updatedUser.display_name,
      password: updatedUser.password,
    }

    const updatedJwt = await sign(updatePayload, env.JWT_SECRET)

    setCookie(ctx, 'jwt', updatedJwt)

    return ctx.json(updatePayload)
  }
)

export default users
