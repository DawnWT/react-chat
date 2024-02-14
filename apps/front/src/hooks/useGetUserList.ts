import { useQuery } from '@tanstack/react-query'

import { env } from '../config/env.js'

interface useGetUserListProps {
  nameLike?: string
}

export const useGetUserList = function ({ nameLike }: useGetUserListProps) {
  return useQuery<Array<{ id: number; name: string }>>({
    queryKey: ['useGetUserList'],
    queryFn: async () => {
      const queryParam = nameLike ? `?name=${nameLike}` : ''
      return fetch(`${env.VITE_BACKEND_URL}/users${queryParam}`).then((res) => res.json())
    },
  })
}
