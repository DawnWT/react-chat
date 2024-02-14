import { useQuery } from '@tanstack/react-query'

import { env } from '../config/env.js'

interface useGetRoomProps {
  roomId: number
}

export const useGetRoom = function ({ roomId }: useGetRoomProps) {
  return useQuery<{ id: number; created_at: Date }>({
    queryKey: ['useGetRoom'],
    queryFn: () => fetch(`${env.VITE_BACKEND_URL}/rooms/${roomId}`).then((res) => res.json()),
  })
}
