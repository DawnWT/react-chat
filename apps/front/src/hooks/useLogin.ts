import { env } from '@src/config/env.js'
import { useCurrentUserStore } from '@src/store/currentUserStore.js'
import { useMutation } from '@tanstack/react-query'

interface LoginRouteResponseJson {
  id: number
  username: string
  displayName: string
  password: string
}

interface useLoginProps {
  onError?: (error: Error, variables: useLoginMutateProps, context: unknown) => unknown
  onSuccess?: (data: LoginRouteResponseJson, variables: useLoginMutateProps, context: unknown) => unknown
}

interface useLoginMutateProps {
  username: string
  password: string
}

export const useLogin = function ({ onError = () => void 0, onSuccess = () => void 0 }: useLoginProps = {}) {
  const { setUser, unsetUser } = useCurrentUserStore()
  return useMutation({
    mutationKey: ['useLogin'],
    mutationFn: (formData: useLoginMutateProps) =>
      fetch(`${env.VITE_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      }).then((res) => {
        if (res.ok) {
          return res.json() as Promise<LoginRouteResponseJson>
        }

        throw new Error('Invalid username or password')
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
