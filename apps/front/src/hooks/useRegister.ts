import { useQuery } from '@tanstack/react-query'

import { env } from '../config/env.js'

interface useRegisterProps {
  username: string
  password: string
}

export const useAuthApi = function ({ username, password }: useRegisterProps) {
  return useQuery({
    queryKey: ['useAuth'],
    queryFn: () =>
      fetch(`${env.VITE_BACKEND_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      }).then((res) => res.json()),
  })
}
