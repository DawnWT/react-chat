import { Hono } from 'hono'
import { jwt } from 'hono/jwt'

import { db } from '../database/db.js'
import { env } from '../helpers/env.js'
import { Payload } from '../types/auth.js'

const messages = new Hono()

messages.get(
  '/:roomId',
  jwt({
    secret: env.JWT_SECRET,
    cookie: 'jwt',
  }),
  async (ctx) => {
    const roomIdStr = ctx.req.param('roomId')
    const roomId = Number(roomIdStr)
    const payload = ctx.get('jwtPayload') as Payload

    const messages = await db
      .selectFrom('rooms')
      .innerJoin('messages', 'rooms.id', 'messages.parent_room')
      .where('rooms.id', '=', roomId)
      .where((eb) => eb('rooms.user1_id', '=', payload.id).or('rooms.user2_id', '=', payload.id))
      .select('messages.from')
      .select('messages.content')
      .select('messages.created_at')
      .execute()

    return ctx.json(messages)
  }
)

export default messages
