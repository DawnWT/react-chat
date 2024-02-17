import { Outlet } from 'react-router-dom'

import { Container } from '../../styled-system/jsx'

export const AuthLayout = function () {
  return (
    <Container display="grid" justifyContent="center" alignItems="center" gridTemplateRows="3" height="100%">
      <Outlet />
    </Container>
  )
}
