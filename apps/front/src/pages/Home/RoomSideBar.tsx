import { css } from '@panda/css'
import { useGetUserRoomList } from '@src/hooks/useGetUserRoomList'
import { SocketEvent, useSocket } from '@src/hooks/useSocket'
import { socket } from '@src/socket'
import { useCurrentUserStore } from '@src/store/currentUserStore'
import { useCallback } from 'react'

import { UserSearchBar } from '../../components/UserSearchBar'
import { PrivateMessage } from '@src/components/PrivateMessage'

export const RoomSideBar = function () {
  const { userId, username } = useCurrentUserStore()
  const { data, isSuccess, refetch } = useGetUserRoomList(userId)

  const onConfirmUser = useCallback((id: number) => {
    socket.emit('room-create', id)
  }, [])

  const EventList: SocketEvent[] = [
    {
      name: 'room-created',
      handler: () => {
        console.log('room-created')
        void refetch()
      },
    },
    {
      name: 'room-deleted',
      handler: () => {
        console.log('room-deleted')
        void refetch()
      },
    },
  ]

  const handleRoomClick = (id: number) => {
    console.log('room clicked', id)
    localStorage.setItem('roomId', id.toString())
  }


  useSocket(EventList)
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        width: '20%',
        height: '100%',
        backgroundColor: '#2c2c2c',
      })}
    >
      <UserSearchBar onConfirm={onConfirmUser} />
      {/* <ul>
        {isSuccess &&
          data.rooms.map((v) => (
            <li key={v.id}>
              <span>
                {v.id} | {v.user1_display_name} | {v.user2_display_name} | {v.content} |{' '}
              </span>
              <button onClick={() => socket.emit('room-delete', v.user1_id, v.user2_id, v.id)}>del</button>
            </li>
          ))}
      </ul> */}
      {isSuccess &&
        data.rooms.map((v) => (
          <PrivateMessage
            key={v.id}
            userName={(username === v.user1_display_name ? v.user2_display_name : v.user1_display_name) ?? ''}
            message={v.content || 'No message'}
            onClick={() => handleRoomClick(v.id)}
          />
        ))
      }
    </div>
  )
}
