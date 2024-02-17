import { env } from '@src/config/env.js'
import { useQuery } from '@tanstack/react-query'

interface useEditUserProps {
  id: number
  username?: string
  password?: string
}

export const useEditUser = function ({ id, username, password }: useEditUserProps) {
  return useQuery<{ password: string; id: number; id_name: string; display_name: string; created_at: Date }>({
    queryKey: ['useEditUser'],
    queryFn: () =>
      fetch(`${env.VITE_BACKEND_URL}/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      }).then((res) => res.json()),
  })
}
