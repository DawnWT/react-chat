import { AuthLayout } from '@src/pages/AuthLayout.js'
import { Home } from '@src/pages/Home.js'
import { LoginPage } from '@src/pages/Login.js'
import { ProtectedLayout } from '@src/pages/ProtectedLayout.js'
import { RegisterPage } from '@src/pages/Register.js'
import { SetUserLayout } from '@src/pages/SetUserLayout.js'
import { UserPage } from '@src/pages/UserPage'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SetUserLayout />,
    children: [
      {
        path: '',
        element: <ProtectedLayout />,
        children: [
          {
            path: '',
            element: <Home />,
          },
          {
            path: 'user',
            element: <UserPage />,
          },
        ],
      },
      {
        path: '',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
])
