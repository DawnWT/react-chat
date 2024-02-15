import './helpers/env.js'

import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import type { ClientToServerEvents, ServerToClientEvents } from 'socket-events'

import auth from './routes/auth.js'
import messages from './routes/messages.js'
import { onConnection } from './routes/socket/connection.js'
import { onMessageSend } from './routes/socket/message.js'
import { onRoomAdded, onRoomCreate, onRoomDelete } from './routes/socket/room.js'
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

const server = serve(
  {
    fetch: app.fetch,
    port: 8000,
    createServer,
  },
  (info) => {
    console.log('server listening on', info.port)
  }
)

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server)

io.on('connection', async (socket) => {
  console.log('socket connected', socket.id)

  const hasPassed = await onConnection(socket)

  if (!hasPassed) {
    socket.disconnect()
    return
  }

  socket.on('message-send', async (roomId, message) => {
    await onMessageSend(socket, message, roomId)
  })

  socket.on('room-create', async (otherUserId) => {
    await onRoomCreate(io, socket, otherUserId)
  })

  socket.on('room-delete', async (userId, roomId) => {
    await onRoomDelete(socket, userId, roomId)
  })

  io.on('room-added', (receiverId, roomId) => {
    onRoomAdded(socket, receiverId, roomId)
  })

  socket.on('disconnect', (reason) => {
    console.log('disconnect', socket.id, reason)
  })
})
