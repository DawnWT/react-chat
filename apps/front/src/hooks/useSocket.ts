import { ServerToClientEvents } from 'packages/socketEventTypes/index.js'
import { useEffect } from 'react'

import { socket } from '../socket.js'

export type SocketEvent = {
  [K in keyof ServerToClientEvents]: {
    name: K
    handler: ServerToClientEvents[K]
  }
}[keyof ServerToClientEvents]

// export type SocketEvent = BareSocketEvent<ServerToClientEvents>

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
