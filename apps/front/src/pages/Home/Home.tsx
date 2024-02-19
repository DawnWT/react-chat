import { css } from '@panda/css'
import { useLocalStorage } from '@src/hooks/useLocalStorage'
import { RoomSideBar } from '@src/pages/Home/RoomSideBar'

import { ChatRoom } from './ChatRoom'

export const Home = () => {
  const [roomId, setRoomId] = useLocalStorage('roomId', 0)
  return (
    <div
      className={css({
        display: 'flex',
        width: '100%',
        height: '100%',
      })}
    >
      <RoomSideBar setRoomId={setRoomId} />
      <ChatRoom roomId={roomId} />
    </div>
  )
}
