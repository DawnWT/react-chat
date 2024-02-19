import { env } from '@src/config/env'
import { useCurrentUserStore } from '@src/store/currentUserStore'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { JwtResponse } from 'shared-types'

export const useJWT = function () {
  const { data, isLoading, isSuccess } = useQuery<{
    id: number
    username: string
    displayName: string
    password: string
  }>({
    queryKey: ['useJWT'],
    queryFn: () =>
      fetch(`${env.VITE_BACKEND_URL}/auth/jwt`, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }).then((res) => {
        if (res.ok) {
          return res.json() as Promise<JwtResponse>
        }

        throw new Error('Invalid Token')
      }),
    refetchOnMount: false,
    retry: false,
  })
  const { setUser, unsetUser } = useCurrentUserStore()

  useEffect(() => {
    if (isLoading) return

    if (isSuccess) {
      setUser(data.id, data.username, data.displayName, data.password)
    } else {
      unsetUser()
    }
  }, [isLoading])

  return isLoading
}
