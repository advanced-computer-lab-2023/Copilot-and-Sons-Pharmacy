import { RouteObject } from 'react-router-dom'
import { Login } from './Login'
import RegistrationForm from './RegistrationForm'
import { Register } from './pharmacistRequest'
import { AuthLayout } from '../components/AuthLayout'

export const authRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <RegistrationForm />,
      },
      {
        path: 'register-request',
        element: <Register />,
      },
    ],
  },
]
