import { useSidebar } from '../../../hooks/sidebar'
import { PersonAdd } from '@mui/icons-material'
import { Container } from '@mui/material'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom';

export function AdminDashboardLayout() {
  const { setSidebarLinks } = useSidebar()

  useEffect(() => {
    setSidebarLinks([
      {
        to: '/admin-dashboard/add-admin',
        text: 'adding Admin ',
        icon: <PersonAdd />,
      },
    ])
  }, [setSidebarLinks])

  return (
      <Container maxWidth="xl">
        <Outlet />
      </Container>
  )
}
