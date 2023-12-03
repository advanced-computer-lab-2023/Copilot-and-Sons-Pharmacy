import { useSidebar } from '../../../hooks/sidebar'
import { Container } from '@mui/material'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthenticatedRoute } from '@/components/AuthenticatedRoute'
import { UserType } from 'pharmacy-common/types/user.types'
import { Healing } from '@mui/icons-material'

export function DoctorDashboardLayout() {
  const { setSidebarLinks } = useSidebar()

  useEffect(() => {
    setSidebarLinks([
      {
        to: '/doctor-dashboard/medicines/',
        text: 'View All Available Medicines',
        icon: <Healing />,
      },
      {
        to: '/Doctor-dashboard/medicines/search-for-medicine/',
        text: 'Search For Medicine',
        icon: <Healing />,
      },
      {
        to: '/Doctor-dashboard/medicines/allUses',
        text: 'Filter By Medicinal Use',
        icon: <Healing />,
      },
      {
        to: '/Doctor-dashboard/pharmacists',
        text: 'Chat with Pharmacists',
        icon: <Healing />,
      },
    ])
  }, [setSidebarLinks])

  return (
    <AuthenticatedRoute requiredUserType={UserType.Doctor}>
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </AuthenticatedRoute>
  )
}
