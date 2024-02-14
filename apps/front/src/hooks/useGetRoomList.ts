import { useQuery } from '@tanstack/react-query'

import { env } from '../config/env.js'

export const useGetRoomList = function () {
  return useQuery<Array<{ id: number; created_at: Date }>>({
    queryKey: ['useGetRoomList'],
    queryFn: async () => fetch(`${env.VITE_BACKEND_URL}/rooms`).then((res) => res.json()),
  })
}
