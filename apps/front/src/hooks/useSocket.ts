import { useEffect } from 'react'

import { socket } from '../socket.js'

export interface SocketEvent {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (...args: any[]) => void
}

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
