import EventEmitter from 'events'

import { db } from '../../database/db.js'
import { ChatSocket } from '../../types/socket.js'

export const onRoomCreate = async function (em: EventEmitter, socket: ChatSocket, otherUserId: unknown): Promise<void> {
  if (typeof otherUserId !== 'number') {
    socket.emit('room-error', 'internal error')
    return
  }
  const otherExist = await db.selectFrom('users').where('id', '=', otherUserId).executeTakeFirst()

  if (!otherExist) {
    socket.emit('room-error', "can't create a room with a inexistant user")
    return
  }

  const roomExist = await db
    .selectFrom('rooms')
    .where((eb) => eb('user1_id', '=', socket.data.payload.id).or('user2_id', '=', socket.data.payload.id))
    .where((eb) => eb('user1_id', '=', otherUserId).or('user2_id', '=', otherUserId))
    .executeTakeFirst()

  if (roomExist !== undefined) {
    socket.emit('room-error', 'room already exist')
    return
  }

  const newRoom = await db
    .insertInto('rooms')
    // eslint-disable-next-line camelcase
    .values({ user1_id: socket.data.payload.id, user2_id: otherUserId })
    .returning('id')
    .executeTakeFirst()

  if (newRoom === undefined) {
    socket.emit('room-error', 'could not create new room')
    return
  }

  socket.data.roomIdList.push(newRoom.id)

  socket.emit('room-created', newRoom.id)
  em.emit(`room-added-${otherUserId}`, newRoom.id)
}

export const onRoomAdded = function (socket: ChatSocket, roomId: number): void {
  socket.data.roomIdList.push(roomId)

  socket.emit('room-created', roomId)
}

export const onRoomDelete = async function (
  em: EventEmitter,
  socket: ChatSocket,
  user1Id: unknown,
  user2Id: unknown,
  roomId: unknown
) {
  if (typeof roomId !== 'number' || typeof user1Id !== 'number' || typeof user2Id !== 'number') {
    socket.emit('room-error', "wrong data type for 'roomId' or 'userId'")
    return
  }

  const room = await db
    .deleteFrom('rooms')
    .where('id', '=', roomId)
    .where('user1_id', '=', user1Id)
    .where('user2_id', '=', user2Id)
    .executeTakeFirst()

  if (room.numDeletedRows === BigInt(0)) {
    socket.emit('room-error', "room doesn't exist")
    return
  }

  em.emit(`room-deleted-${user1Id}`, roomId)
  em.emit(`room-deleted-${user2Id}`, roomId)
}

export const onRoomDeleted = function (socket: ChatSocket, roomId: number): void {
  socket.data.roomIdList = socket.data.roomIdList.filter((roomIdItem) => roomId !== roomIdItem)

  socket.emit('room-deleted', roomId)
}
