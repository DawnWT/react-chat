import { env } from '@src/config/env.js'
import { useQuery } from '@tanstack/react-query'

export const useGetRoomList = function () {
  return useQuery<Array<{ id: number; created_at: Date }>>({
    queryKey: ['useGetRoomList'],
    queryFn: async () =>
      fetch(`${env.VITE_BACKEND_URL}/rooms`, {
        credentials: 'include',
      }).then((res) => res.json()),
  })
}
