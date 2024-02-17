import { createBrowserRouter } from 'react-router-dom'

import { AuthLayout } from '../pages/AuthLayout.js'
import { Home } from '../pages/Home.js'
import { LoginPage } from '../pages/Login.js'
import { ProtectedLayout } from '../pages/ProtectedLayout.js'
import { RegisterPage } from '../pages/Register.js'
import { SetUserLayout } from '../pages/SetUserLayout.js'

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
