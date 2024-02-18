import { env } from '@src/config/env'
import { useCurrentUserStore } from '@src/store/currentUserStore'
import { useMutation } from '@tanstack/react-query'

export const useLogout = function () {
  const { unsetUser } = useCurrentUserStore()
  return useMutation({
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
    onSuccess: () => {
      unsetUser()
    },
  })
}
