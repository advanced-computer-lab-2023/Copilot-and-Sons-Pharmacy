import { RouteObject } from 'react-router-dom'
import Registera from './Register'
import RegistrationForm from './RegistrationForm'
//import { Register } from './pharmacistRequest'
import { AuthLayout } from '../components/AuthLayout'
import { Logout } from './Logout'
import SignIn from './Signin'
import ForgotPassword from './ForgotPassword'

export const authRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <SignIn />,
      },
      {
        path: 'register',
        element: <RegistrationForm />,
      },
      {
        path: 'register-request',
        element: <Registera />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
    ],
  },

  {
    path: 'logout',
    element: <Logout />,
  },
]
