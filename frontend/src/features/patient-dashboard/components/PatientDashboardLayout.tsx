
import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

export function PatientDashboardLayout() {
  return (

      <Container maxWidth="xs">
        <Outlet />
      </Container>

  )
}
