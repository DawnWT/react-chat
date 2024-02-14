import { useQuery } from '@tanstack/react-query'

import { env } from '../config/env.js'

interface useLoginProps {
  username?: string
  password?: string
}

export const useAuthApi = function ({ username, password }: useLoginProps = {}) {
  return useQuery({
    queryKey: ['useLogin'],
    queryFn: () =>
      fetch(`${env.VITE_BACKEND_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      }).then((res) => res.json()),
  })
}
