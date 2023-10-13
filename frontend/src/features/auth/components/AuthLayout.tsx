import { useSidebar } from '../../../hooks/sidebar'
import { AppRegistrationRounded, Login } from '@mui/icons-material'
import { Container } from '@mui/material'
import { useEffect } from 'react'
import  {Outlet} from 'react-router-dom'

export function AuthLayout() {
  const { setSidebarLinks } = useSidebar()

  useEffect(() => {
    setSidebarLinks([
      {
        to: '/auth/login',
        text: 'Login',
        icon: <Login />,
      },

      {
        to: '/auth/register',
        text: 'Register',
        icon: <AppRegistrationRounded />,
      },
      

      {
        to: '/auth/register-request',
        text: 'Pharmacist request',
        icon: <AppRegistrationRounded />,
      },
    ])
  }, [setSidebarLinks])

  return (
   
      <Container maxWidth="xs">
        <Outlet />
      </Container>
  )
}
