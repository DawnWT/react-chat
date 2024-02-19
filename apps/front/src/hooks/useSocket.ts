import { socket } from '@src/socket.js'
import { useEffect } from 'react'
import type { ServerToClientEvents } from 'shared-types'

export type SocketEvent = {
  [K in keyof ServerToClientEvents]: {
    name: K
    handler: ServerToClientEvents[K]
  }
}[keyof ServerToClientEvents]

export const useSocket = function (eventList: SocketEvent[]) {
  useEffect(() => {
    for (const event of eventList) {
      socket.on(event.name, event.handler)
    }

    return () => {
      for (const event of eventList) {
        socket.off(event.name, event.handler)
      }
    }
  }, [])
}
