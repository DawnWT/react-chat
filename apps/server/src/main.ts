import './helpers/env.js'

import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { createServer } from 'http'
import { Server } from 'socket.io'

import auth from './routes/auth.js'

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

const io = new Server(server)

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
