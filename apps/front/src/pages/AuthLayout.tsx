import { Container } from '@panda/jsx'
import { Outlet } from 'react-router-dom'

export const AuthLayout = function () {
  return (
    <Container
      display="grid"
      justifyContent="center"
      alignItems="center"
      gridTemplateRows="1fr max-content 1fr"
      height="100%"
    >
      <Outlet />
    </Container>
  )
}
