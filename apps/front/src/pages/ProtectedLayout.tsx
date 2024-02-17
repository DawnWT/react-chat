import { Navigate, Outlet } from 'react-router-dom'

import { useCurrentUserStore } from '../store/currentUserStore'

export const ProtectedLayout = function () {
  const { loggedIn } = useCurrentUserStore()

  if (!loggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <Outlet />
    </>
  )
}
