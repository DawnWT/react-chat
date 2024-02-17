import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

import { env } from '../config/env'
import { useCurrentUserStore } from '../store/currentUserStore'

export const useLogout = function () {
  const mutation = useMutation({
    mutationKey: ['useLogout'],
    mutationFn: () =>
      fetch(`${env.VITE_BACKEND_URL}/auth/logout`, {
        method: 'GET',
        credentials: 'include',
      }).then((res) => {
        if (res.ok) {
          return res.json()
        }

        throw new Error('Invalid Token')
      }),
  })
  const { unsetUser } = useCurrentUserStore()

  useEffect(() => {
    if (mutation.isSuccess) {
      unsetUser()
    }
  }, [mutation.isPending])

  return mutation
}
