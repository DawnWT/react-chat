import { db } from '../../database/db.js'
import { ChatSocket } from '../../types/socket.js'

export const onMessageSend = async function (socket: ChatSocket, message: unknown, roomId: unknown): Promise<void> {
  if (typeof roomId !== 'number' || typeof message !== 'string') {
    socket.emit('message-error', 'internal error')
    return
  }

  if (!socket.data.roomIdList.includes(roomId)) {
    socket.emit('message-error', 'cannot send message in this room')
    return
  }

  socket.to(`room-${roomId}`).emit('message-sent', roomId, message)

  await db
    .insertInto('messages')
    // eslint-disable-next-line camelcase
    .values({ content: message, from: socket.data.payload.id, parent_room: roomId })
    .execute()
}
