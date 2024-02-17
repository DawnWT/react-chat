import { env } from '@src/config/env.js'
import { useQuery } from '@tanstack/react-query'

interface useGetRoomProps {
  roomId: number
}

export const useGetRoom = function ({ roomId }: useGetRoomProps) {
  return useQuery<{ id: number; created_at: Date }>({
    queryKey: ['useGetRoom'],
    queryFn: () =>
      fetch(`${env.VITE_BACKEND_URL}/rooms/${roomId}`, {
        credentials: 'include',
      }).then((res) => res.json()),
  })
}
