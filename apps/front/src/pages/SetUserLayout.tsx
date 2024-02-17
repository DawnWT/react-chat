import { useJWT } from '@src/hooks/useJWT'
import { Outlet } from 'react-router-dom'

export const SetUserLayout = function () {
  const isLoading = useJWT()

  if (isLoading) return <>Loading...</>

  return <Outlet />
}
