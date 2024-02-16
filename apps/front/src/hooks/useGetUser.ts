import { useQuery } from '@tanstack/react-query'

import { env } from '../config/env.js'

export const useGetUser = function (id: number) {
  return useQuery<{ id: number; id_name: string; display_name: string; created_at: Date }>({
    queryKey: ['useGetUser'],
    queryFn: () =>
      fetch(`${env.VITE_BACKEND_URL}/users/${id}`, {
        credentials: 'include',
      }).then((res) => res.json()),
  })
}
