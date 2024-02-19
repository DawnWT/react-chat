import { serve } from '@hono/node-server'
import { createAdapter } from '@socket.io/postgres-adapter'
import EventEmitter from 'events'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { showRoutes } from 'hono/dev'
import { createServer } from 'http'
import { Server } from 'socket.io'
import type { ClientToServerEvents, ServerToClientEvents } from 'socket-events'

import { pool } from './database/db.js'
import auth from './routes/auth.js'
import messages from './routes/messages.js'
import rooms from './routes/rooms.js'
import { onConnection } from './routes/socket/connection.js'
import { onMessageSend } from './routes/socket/message.js'
import { onRoomAdded, onRoomCreate, onRoomDelete, onRoomDeleted } from './routes/socket/room.js'
import users from './routes/user.js'
import type { InterServerEvents, SocketData } from './types/socket.js'

const app = new Hono()

app.use(
  '*',
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

app.get('/', (ctx) => ctx.text('Hello World'))
app.route('/auth', auth)
app.route('/users', users)
app.route('/messages', messages)
app.route('/rooms', rooms)

const server = serve(
  {
    fetch: app.fetch,
    port: 8000,
    createServer,
  },
  (info) => {
    showRoutes(app)
    console.log('server listening on', info.port)
  }
)

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server)

io.adapter(createAdapter(pool))

const roomEventEmitter = new EventEmitter()

io.on('connection', async (socket) => {
  const hasPassed = await onConnection(socket)

  if (!hasPassed) {
    socket.disconnect()
    return
  }

  socket.on('message-send', async (roomId, message) => {
    await onMessageSend(socket, message, roomId)
  })

  socket.on('room-create', async (otherUserId) => {
    await onRoomCreate(roomEventEmitter, socket, otherUserId)
  })

  socket.on('room-delete', async (user1Id, user2Id, roomId) => {
    await onRoomDelete(roomEventEmitter, socket, user1Id, user2Id, roomId)
  })

  const onRoomAddedhandler = (roomId: number) => {
    onRoomAdded(socket, roomId)
  }

  const onRoomDeletedhandler = (roomId: number) => {
    onRoomDeleted(socket, roomId)
  }

  roomEventEmitter.on(`room-added-${socket.data.payload.id}`, onRoomAddedhandler)
  roomEventEmitter.on(`room-deleted-${socket.data.payload.id}`, onRoomDeletedhandler)

  socket.on('disconnect', () => {
    roomEventEmitter.off(`room-added-${socket.data.payload.id}`, onRoomAddedhandler)
  })
})
