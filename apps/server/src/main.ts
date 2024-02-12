import './helpers/env.js'

import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { createServer } from 'http'
import { Server } from 'socket.io'
import type { ClientToServerEvents, ServerToClientEvents } from 'socket-events'

import auth from './routes/auth.js'
import type { InterServerEvents, SocketData } from './types/socket.js'

const app = new Hono()
app.route('/auth', auth)

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

io.on('connection', (socket) => {
  console.log('socket connected', socket.id)

  socket.on('message', (message) => {
    console.log('message', message)
    io.emit('message', `received: ${message}`)
  })

  socket.on('disconnect', (reason) => {
    console.log('disconnect', socket.id, reason)
  })
})
