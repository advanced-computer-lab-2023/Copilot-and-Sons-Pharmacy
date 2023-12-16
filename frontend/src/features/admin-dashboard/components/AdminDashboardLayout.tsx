import { useSidebar } from '../../../hooks/sidebar'
import { Healing, PersonAdd, PersonRemove } from '@mui/icons-material'
import { Container } from '@mui/material'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthenticatedRoute } from '@/components/AuthenticatedRoute'
import { UserType } from 'pharmacy-common/types/user.types'
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy'

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
        to: '/admin-dashboard/sales-and-quantity',
        text: 'View Sales and Quantity',
        icon: <LocalPharmacyIcon />,
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
        text: 'Medicines',
        icon: <Healing />,
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
