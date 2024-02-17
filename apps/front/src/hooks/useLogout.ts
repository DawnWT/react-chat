import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { useCurrentUserStore } from '../store/currentUserStore'

export const useLogout = function () {
  const { isLoading, isSuccess } = useQuery({
    queryKey: ['useLogout'],
    queryFn: () =>
      fetch('/auth/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }).then((res) => {
        if (res.ok) {
          return res.json()
        }

        throw new Error('Invalid Token')
      }),
    refetchOnMount: false,
  })
  const { unsetUser } = useCurrentUserStore()

  useEffect(() => {
    if (isSuccess) {
      unsetUser()
    }
  }, [isLoading])

  return isLoading
}
