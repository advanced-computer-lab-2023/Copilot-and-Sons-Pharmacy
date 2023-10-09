
import { useSidebar } from '../../../hooks/sidebar'
import Container from '@mui/material/Container'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

export function PharmacistDashboardLayout() {
  const { setSidebarLinks } = useSidebar()

  useEffect(() => {
    setSidebarLinks([
    //   {
    //     to: '/pharmicist-dashboard/profile',
    //     text: 'Update Details',
    //     icon: <Person />,
    //   },
    ])
  }, [setSidebarLinks])

  return (
      <Container maxWidth="xs">
        <Outlet />
      </Container>

  )
}
