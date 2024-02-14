import { useQuery } from '@tanstack/react-query'

import { env } from '../config/env.js'

interface useGetMessageListProps {
  roomId: number
}

export const useGetMessageList = function ({ roomId }: useGetMessageListProps) {
  return useQuery<{ from: number; content: string; created_at: Date }>({
    queryKey: ['useGetMessageList'],
    queryFn: async () => fetch(`${env.BACKEND_URL}/messages/${roomId}`).then((res) => res.json()),
  })
}
