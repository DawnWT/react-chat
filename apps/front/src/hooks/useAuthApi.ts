import { useQuery } from '@tanstack/react-query'

import { env } from '../config/env.js'

interface useAuthApiProps {
  route: 'login' | 'register'
  username: string
  password: string
}

export const useAuthApi = function ({ route, username, password }: useAuthApiProps) {
  return useQuery({
    queryKey: ['useAuth'],
    queryFn: () =>
      fetch(`${env.BACKEND_URL}/auth/${route}`, { method: 'POST', body: JSON.stringify({ username, password }) }).then(
        (res) => res.json()
      ),
  })
}
