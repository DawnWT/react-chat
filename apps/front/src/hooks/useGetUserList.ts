import { env } from '@src/config/env.js'
import { useQuery } from '@tanstack/react-query'

export const useGetUserList = function (nameLike: string) {
  return useQuery<Array<{ id: number; id_name: string }>>({
    queryKey: ['useGetUserList', nameLike],
    queryFn: async () => {
      const queryParam = nameLike ? `?name=${nameLike}` : ''
      return fetch(`${env.VITE_BACKEND_URL}/users${queryParam}`, {
        credentials: 'include',
      }).then((res) => res.json())
    },
  })
}
