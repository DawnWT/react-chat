import { db } from '../../database/db.js'
import { ChatSocket, ChatSocketServer } from '../../types/socket.js'

export const onRoomCreate = async function (
  io: ChatSocketServer,
  socket: ChatSocket,
  otherUserId: unknown
): Promise<void> {
  if (typeof otherUserId !== 'number') {
    socket.emit('room-error', 'internal error')
    return
  }
  const otherExist = await db.selectFrom('users').where('id', '=', otherUserId).executeTakeFirst()

  if (!otherExist) {
    socket.emit('room-error', "can't create a room with a inexistant user")
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
  io.serverSideEmit('room-added', otherUserId, newRoom.id)
}

export const onRoomAdded = function (socket: ChatSocket, receiverId: number, roomId: number): void {
  if (receiverId !== socket.data.payload.id) {
    return
  }

  socket.data.roomIdList.push(roomId)

  socket.emit('room-created', roomId)
}

export const onRoomDelete = async function (socket: ChatSocket, userId: unknown, roomId: unknown) {
  if (typeof roomId !== 'number' || typeof userId !== 'number') {
    socket.emit('room-error', "wrong data type for 'roomId' or 'userId'")
    return
  }

  const room = await db
    .deleteFrom('rooms')
    .where('id', '=', roomId)
    .where((eb) => eb('user1_id', '=', userId).or('user2_id', '=', userId))
    .executeTakeFirst()

  if (room.numDeletedRows === BigInt(0)) {
    socket.emit('room-error', "room doesn't exist")
    return
  }

  socket.emit('room-deleted', roomId)
}
