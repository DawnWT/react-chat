import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

import { env } from '../config/env.js'
import { useCurrentUserStore } from '../store/currentUserStore.js'

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
  const mutation = useMutation({
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

    onSuccess,
    onError,
  })
  const { setUser } = useCurrentUserStore()

  useEffect(() => {
    if (mutation.isSuccess) {
      setUser(mutation.data.id, mutation.data.username, mutation.data.displayName)
    }
  }, [mutation.isPending])

  return mutation
}
