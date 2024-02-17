import { css } from '@panda/css'
import { RoomSideBar } from '@src/components/RoomSideBar'

export const Home = () => {
  return (
    <div
      className={css({
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <RoomSideBar />
    </div>
  )
}
