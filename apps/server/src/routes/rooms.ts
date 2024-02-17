import { Hono } from 'hono'
import { jwt } from 'hono/jwt'

import { db } from '../database/db.js'
import { env } from '../helpers/env.js'
import { Payload } from '../types/auth.js'

const rooms = new Hono()

rooms.use('*', jwt({ secret: env.JWT_SECRET, cookie: 'jwt' }))

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

rooms.get('/user/:userId', async (ctx) => {
  const userIdStr = ctx.req.param('userId')
  const userId = Number(userIdStr)

  const rooms = await db
    .selectFrom('rooms')
    .leftJoin('messages', 'rooms.id', 'messages.parent_room')
    .leftJoin('users as user1', 'rooms.user1_id', 'user1.id')
    .leftJoin('users as user2', 'rooms.user2_id', 'user2.id')
    .where((eb) => eb('user1_id', '=', userId).or('user2_id', '=', userId))
    .distinctOn('rooms.id')
    .orderBy(['rooms.id', 'messages.created_at desc'])
    .select([
      'rooms.id',
      'user1_id',
      'user1.id_name as user1_id_name',
      'user1.display_name as user1_display_name',
      'user2_id',
      'user2.id_name as user2_id_name',
      'user2.display_name as user2_display_name',
      'messages.content',
    ])
    .execute()

  return ctx.json({ rooms })
})

export default rooms
