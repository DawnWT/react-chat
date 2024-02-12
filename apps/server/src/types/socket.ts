import { Server, Socket } from 'socket.io'
import { ClientToServerEvents, ServerToClientEvents } from 'socket-events'

import type { Payload } from './auth.js'

export interface InterServerEvents {
  'room-added': (receiverId: number, roomId: number) => void
}

export interface SocketData {
  payload: Payload
  roomIdList: number[]
}

export type ChatSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
export type ChatSocketServer = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
