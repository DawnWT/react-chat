import { useCallback } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { HStack, styled, VStack } from '../../styled-system/jsx'
import { Button } from '../components/Button'
import { useLogout } from '../hooks/useLogout'
import { useCurrentUserStore } from '../store/currentUserStore'

export const ProtectedLayout = function () {
  const { loggedIn, username } = useCurrentUserStore()
  const { mutate, isPending } = useLogout()

  const handleLogOut = useCallback(() => {
    mutate()
  }, [])

  if (!loggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <VStack height="100%" gap={0}>
      <styled.nav height="16" width="100%" padding="2" bgColor="gray.500">
        <HStack flexDir="row-reverse" height="100%" alignItems="center">
          <HStack>
            <styled.span>{username}</styled.span>
            <Button disabled={isPending} onClick={handleLogOut}>
              Log Out
            </Button>
          </HStack>
        </HStack>
      </styled.nav>
      <Outlet />
    </VStack>
  )
}
