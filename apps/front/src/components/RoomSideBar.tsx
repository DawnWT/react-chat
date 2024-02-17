import { Box } from '@panda/jsx'
import { useGetUserRoomList } from '@src/hooks/useGetUserRoomList'
import { SocketEvent, useSocket } from '@src/hooks/useSocket'
import { socket } from '@src/socket'
import { useCurrentUserStore } from '@src/store/currentUserStore'
import { useCallback } from 'react'

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
