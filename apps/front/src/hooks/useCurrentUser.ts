import { useQuery } from '@tanstack/react-query'

import { env } from '../config/env.js'

export const useCurrentUser = function () {
  return useQuery({
    queryKey: ['check-jwt'],
    queryFn: () => fetch(`${env.BACKEND_URL}/auth/check`).then((res) => res.json()),
  })
}
