import { Outlet } from 'react-router-dom'

import { useJWT } from '../hooks/useJWT'

export const SetUserLayout = function () {
  const isLoading = useJWT()

  if (isLoading) return <>Loading...</>

  return <Outlet />
}
