import { io, type Socket } from 'socket.io-client'
import type { ClientToServerEvents, ServerToClientEvents } from 'socket-events'

import { env } from './config/env'

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(env.VITE_BACKEND_URL, {
  transports: ['websocket'],
})
