import { HStack, styled, VStack } from '@panda/jsx'
import { ALink } from '@src/components/ALink'
import { Button } from '@src/components/Button'
import { useLogout } from '@src/hooks/useLogout'
import { useCurrentUserStore } from '@src/store/currentUserStore'
import { useCallback } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

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
    <VStack height="100vh" gap={0}>
      <styled.nav height="16" width="100%" padding="2" bgColor="#252525">
        <HStack justifyContent="space-between" height="100%" alignItems="center">
          <ALink color="white" to="/">Home</ALink>
          <HStack>
            <ALink color="white" to="/user">{username}</ALink>
            <Button color="white" disabled={isPending} onClick={handleLogOut}>
              Log Out
            </Button>
          </HStack>
        </HStack>
      </styled.nav>
      <Outlet />
    </VStack>
  )
}
