import { env } from '@src/config/env.js'
import { useQuery } from '@tanstack/react-query'
import { GetMessageListByRoomIdResponse } from 'shared-types'

interface useGetMessageListProps {
  roomId: number
}

export const useGetMessageList = function ({ roomId }: useGetMessageListProps) {
  return useQuery({
    queryKey: ['useGetMessageList'],
    queryFn: async () =>
      fetch(`${env.VITE_BACKEND_URL}/messages/${roomId}`, {
        credentials: 'include',
      }).then((res) => res.json() as Promise<GetMessageListByRoomIdResponse>),
  })
}
