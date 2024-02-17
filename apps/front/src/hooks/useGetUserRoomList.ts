import { useQuery } from '@tanstack/react-query'

import { env } from '../config/env.js'

export const useGetUserRoomList = function (userId: number) {
  return useQuery<{
    rooms: Array<{
      user1_id: number
      user2_id: number
      id: number
      content: string | null
      user1_id_name: string | null
      user1_display_name: string | null
      user2_id_name: string | null
      user2_display_name: string | null
    }>
  }>({
    queryKey: ['useGetUserRoomList'],
    queryFn: async () =>
      fetch(`${env.VITE_BACKEND_URL}/rooms/user/${userId}`, {
        credentials: 'include',
      }).then((res) => res.json()),
  })
}
