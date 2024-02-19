import cookie from 'cookie'
import { verify } from 'hono/jwt'
import { Payload } from 'shared-types'

import { db } from '../../database/db.js'
import { env } from '../../helpers/env.js'
import { ChatSocket } from '../../types/socket.js'
const { parse } = cookie

export const onConnection = async function (socket: ChatSocket): Promise<boolean> {
  if (socket.handshake.headers.cookie === undefined) {
    return false
  }

  const cookie = parse(socket.handshake.headers.cookie)

  if (cookie['jwt'] === undefined) {
    return false
  }

  const payload = (await verify(cookie['jwt'], env.JWT_SECRET).catch(() => null)) as Payload | null

  if (payload === null) {
    return false
  }

  const roomList = await db
    .selectFrom('rooms')
    .where((eb) => eb('user1_id', '=', payload.id).or('user2_id', '=', payload.id))
    .select('id')
    .execute()

  const roomIdList = roomList.map((r) => r.id)

  void socket.join(roomIdList.map((rid) => `room-${rid}`))

  socket.data.payload = payload
  socket.data.roomIdList = roomIdList

  return true
}
