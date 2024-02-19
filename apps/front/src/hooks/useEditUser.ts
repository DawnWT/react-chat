import { env } from '@src/config/env.js'
import { useCurrentUserStore } from '@src/store/currentUserStore'
import { useMutation } from '@tanstack/react-query'
import { EditUserResponse } from 'shared-types'

interface EditUserMutateProps {
  username?: string
  displayName?: string
  password?: string
}

export const useEditUser = function (id: number) {
  const { setUser } = useCurrentUserStore()
  return useMutation({
    mutationKey: ['useEditUser'],
    mutationFn: ({ username, displayName, password }: EditUserMutateProps) =>
      fetch(`${env.VITE_BACKEND_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, displayName, password }),
        credentials: 'include',
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Username already exists')
        }

        return res.json() as Promise<EditUserResponse>
      }),
    onSuccess: (data) => {
      setUser(data.id, data.username, data.displayName, data.password)
    },
  })
}
