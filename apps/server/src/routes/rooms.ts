import { Hono } from 'hono'
import { jwt } from 'hono/jwt'

import { db } from '../database/db.js'
import { env } from '../helpers/env.js'
import { Payload } from '../types/auth.js'

const rooms = new Hono()

rooms.use(jwt({ secret: env.JWT_SECRET, cookie: 'jwt' }))

rooms.get('/', async (ctx) => {
  const payload = ctx.get('jwtPayload') as Payload

  const rooms = await db
    .selectFrom('rooms')
    .where((eb) => eb('rooms.user1_id', '=', payload.id).or('rooms.user2_id', '=', payload.id))
    .select('id')
    .select('created_at')
    .execute()

  return ctx.json(rooms)
})

rooms.get('/:roomId', async (ctx) => {
  const roomIdStr = ctx.req.param('roomId')
  const roomId = Number(roomIdStr)
  const payload = ctx.get('jwtPayload') as Payload

  const room = await db
    .selectFrom('rooms')
    .where('id', '=', roomId)
    .where((eb) => eb('user1_id', '=', payload.id).or('user2_id', '=', payload.id))
    .select('id')
    .select('created_at')
    .executeTakeFirst()

  if (room === undefined) {
    return ctx.json({ error: 'Room not found' }, 404)
  }

  return ctx.json(room)
})

export default rooms
