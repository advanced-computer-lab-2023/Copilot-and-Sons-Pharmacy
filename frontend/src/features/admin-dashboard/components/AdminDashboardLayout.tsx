import { useSidebar } from '../../../hooks/sidebar'
import { PersonAdd, PersonRemove } from '@mui/icons-material'
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
      {
        to: '/admin-dashboard/remove-user',
        text: 'Remove user ',
        icon: <PersonRemove />,
      },
    ])
  }, [setSidebarLinks])

  return (
      <Container maxWidth="xl">
        <Outlet />
      </Container>
  )
}
