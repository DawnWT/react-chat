import { css } from '@panda/css'
import { RoomSideBar } from '@src/pages/Home/RoomSideBar'
import { ChatRoom } from './ChatRoom'

export const Home = () => {
  const roomId = parseInt(localStorage.getItem('roomId') || '')
  return (
    <div
      className={css({
        display: 'flex',
        width: '100%',
        height: '100%',
      })}
    >
      <RoomSideBar />
      <ChatRoom roomId={roomId} />
    </div>
  )
}
