import { env } from '@src/config/env.js'
import { useCurrentUserStore } from '@src/store/currentUserStore.js'
import { useMutation } from '@tanstack/react-query'

interface RegisterRouteResponseJSON {
  id: number
  username: string
  displayName: string
  password: string
}

interface useRegisterMutateProps {
  username: string
  displayName?: string
  password: string
}

interface useRegisterProps {
  onError?: (error: Error, variables: useRegisterMutateProps, context: unknown) => unknown
  onSuccess?: (data: RegisterRouteResponseJSON, variables: useRegisterMutateProps, context: unknown) => unknown
}

export const useRegister = function ({ onError = () => void 0, onSuccess = () => void 0 }: useRegisterProps = {}) {
  const { setUser, unsetUser } = useCurrentUserStore()
  return useMutation({
    mutationKey: ['useRegister'],
    mutationFn: ({ username, displayName, password }: useRegisterMutateProps) =>
      fetch(`${env.VITE_BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, displayName, password }),
        credentials: 'include',
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Username already exists')
        }

        return res.json() as Promise<RegisterRouteResponseJSON>
      }),
    onSuccess: (data, variables, context) => {
      setUser(data.id, data.username, data.displayName, data.password)
      onSuccess(data, variables, context)
    },
    onError: (data, variables, context) => {
      unsetUser()
      onError(data, variables, context)
    },
  })
}
