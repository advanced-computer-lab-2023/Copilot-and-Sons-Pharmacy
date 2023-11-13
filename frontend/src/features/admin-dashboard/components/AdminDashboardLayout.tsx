import { useSidebar } from '../../../hooks/sidebar'
import { Healing, PersonAdd, PersonRemove, VpnKey } from '@mui/icons-material'
import { Container } from '@mui/material'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthenticatedRoute } from '@/components/AuthenticatedRoute'
import { UserType } from 'pharmacy-common/types/user.types'

export function AdminDashboardLayout() {
  const { setSidebarLinks } = useSidebar()

  useEffect(() => {
    setSidebarLinks([
      {
        to: '/admin-dashboard/add-admin',
        text: 'Add Admin ',
        icon: <PersonAdd />,
      },
      {
        to: '/admin-dashboard/remove-user',
        text: 'Remove User',
        icon: <PersonRemove />,
      },
      {
        to: '/admin-dashboard/get-approved-pharmacists',
        text: 'View Accepted Pharmacists',
        icon: <PersonAdd />,
      },
      {
        to: '/admin-dashboard/get-pending-pharmacists',
        text: 'View Pending Pharmacists',
        icon: <PersonAdd />,
      },
      {
        to: '/admin-dashboard/viewPatients',
        text: 'View Patients',
        icon: <PersonAdd />,
      },
      {
        to: '/admin-dashboard/medicines/',
        text: 'View All Available Medicines',
        icon: <Healing />,
      },
      {
        to: '/admin-dashboard/medicines/search-for-medicine/',
        text: 'Search For Medicine',
        icon: <Healing />,
      },
      {
        to: '/admin-dashboard/medicines/allUses',
        text: 'Filter By Medicinal Use',
        icon: <Healing />,
      },
      {
        to: '/admin-dashboard/change-password',
        text: 'Change Password',
        icon: <VpnKey />,
      },
    ])
  }, [setSidebarLinks])

  return (
    <AuthenticatedRoute requiredUserType={UserType.Admin}>
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </AuthenticatedRoute>
  )
}
