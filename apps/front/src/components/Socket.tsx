import { useState } from 'react'

import { SocketEvent, useSocket } from '../hooks/useSocket.js'
import { socket } from '../socket.js'

export const Socket = function () {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [msg, setMsg] = useState<string[]>([])
  const [textInput, setTextInput] = useState('')

  const eventList: SocketEvent[] = [
    {
      name: 'connect',
      handler: () => {
        setIsConnected(true)
      },
    },
    {
      name: 'disconnect',
      handler: () => {
        setIsConnected(false)
      },
    },
    {
      name: 'message',
      handler: (message: string) => {
        setMsg((prev) => [...prev, message])
      },
    },
  ]

  useSocket(eventList)

  const onClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault()

    console.log('input', textInput)

    socket.timeout(5000).emit('message', textInput)

    setTextInput('')
  }

  return (
    <div>
      <h1>Hello World</h1>
      <p>Socket is connected: {isConnected.toString()}</p>
      <input
        type="text"
        value={textInput}
        onChange={(e) => {
          setTextInput(e.target.value)
        }}
      />
      <button onClick={onClick}>send</button>
      <ul>
        {msg.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  )
}
