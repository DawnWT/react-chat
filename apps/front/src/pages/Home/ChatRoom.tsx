import { css } from '@panda/css'
import MessageBubble from '@src/components/Bulle-message'
import { InputText } from '@src/components/InputText'
import { useGetMessageList } from '@src/hooks/usegetMessageList'
import { SocketEvent, useSocket } from '@src/hooks/useSocket'
import { socket } from '@src/socket'
import { useCurrentUserStore } from '@src/store/currentUserStore'

interface ChatRoomProps {
  roomId: number
}

export const ChatRoom: React.FC<ChatRoomProps> = ({ roomId }) => {
  const { data: messages, refetch } = useGetMessageList({ roomId })
  const { userId } = useCurrentUserStore()

  const socketEventList: SocketEvent[] = [
    {
      name: 'message-sent',
      handler: () => {
        void refetch()
      },
    },
  ]

  useSocket(socketEventList)

  const handleSubmit = (value: string) => {
    socket.emit('message-send', roomId, value)
    void refetch()
  }

  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateRows: '1fr auto',
        backgroundColor: '#343434',
        width: '80%',
        height: '100%',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          flex: 6,
          maxHeight: '88vh',
          width: '100%',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: 'black #333',
        })}
      >
        {messages?.map((v) => (
          <MessageBubble key={v.created_at.toString()} sender={v.from === userId} message={v.content} />
        ))}
      </div>
      <div
        className={css({
          display: 'flex',
          height: 'auto',
          justifyContent: 'center',
          alignItems: 'flex-end',
        })}
      >
        <InputText onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
