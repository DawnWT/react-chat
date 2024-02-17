import { useCallback } from 'react'

import { Box } from '../../styled-system/jsx'
import { useGetUserRoomList } from '../hooks/useGetUserRoomList'
import { SocketEvent, useSocket } from '../hooks/useSocket'
import { socket } from '../socket'
import { useCurrentUserStore } from '../store/currentUserStore'
import { UserSearchBar } from './UserSearchBar'

export const RoomSideBar = function () {
  const { loggedIn, userId, username } = useCurrentUserStore()
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

  useSocket(EventList)
  return (
    <Box>
      {loggedIn && `logged in: ${username}`}
      <UserSearchBar onConfirm={onConfirmUser} />
      <ul>
        {isSuccess &&
          data.rooms.map((v) => (
            <li key={v.id}>
              <span>
                {v.id} | {v.user1_display_name} | {v.user2_display_name} | {v.content} |{' '}
              </span>
              <button onClick={() => socket.emit('room-delete', v.user1_id, v.user2_id, v.id)}>del</button>
            </li>
          ))}
      </ul>
    </Box>
  )
}
