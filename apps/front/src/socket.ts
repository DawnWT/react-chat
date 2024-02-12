import { io, type Socket } from 'socket.io-client'
import type { ClientToServerEvents, ServerToClientEvents } from 'socket-events'

const URL = 'http://localhost:8000'

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, { transports: ['websocket'] })
