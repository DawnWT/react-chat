import { css } from '../../styled-system/css'
import { RoomSideBar } from '../components/RoomSideBar'

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
