import { useQuery } from '@tanstack/react-query'

import { env } from '../config/env.js'

interface useGetUserProps {
  id: number
}

export const useGetUser = function ({ id }: useGetUserProps) {
  return useQuery<{ id: number; name: string; created_at: Date }>({
    queryKey: ['useGetUser'],
    queryFn: () => fetch(`${env.VITE_BACKEND_URL}/users/${id}`).then((res) => res.json()),
  })
}
