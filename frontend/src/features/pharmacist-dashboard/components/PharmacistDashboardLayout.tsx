import { useSidebar } from '../../../hooks/sidebar'
import Container from '@mui/material/Container'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { UserType } from 'pharmacy-common/types/user.types'
import { AuthenticatedRoute } from '@/components/AuthenticatedRoute'
import { Healing, LocalPharmacy, VpnKey } from '@mui/icons-material'

export function PharmacistDashboardLayout() {
  const { setSidebarLinks } = useSidebar()

  useEffect(() => {
    setSidebarLinks([
      {
        to: '/pharmacist-dashboard/medicines/',
        text: 'View All Available Medicines',
        icon: <Healing />,
      },
      {
        to: 'pharmacist-dashboard/medicines/search-for-medicine/',
        text: 'Search For Medicine',
        icon: <Healing />,
      },

      {
        to: '/pharmacist-dashboard/medicines/sales-and-quantity',
        text: 'View Sales and Quantity',
        icon: <LocalPharmacy />,
      },
      {
        to: '/pharmacist-dashboard/medicines/addMedicine',
        text: 'Add Medicine',
        icon: <Healing />,
      },
      {
        to: '/pharmacist-dashboard/medicines/allUses',
        text: 'Filter By Medicinal Use',
        icon: <Healing />,
      },
      {
        to: '/pharmacist-dashboard/change-password',
        text: 'Change Password',
        icon: <VpnKey />,
      },
    ])
  }, [setSidebarLinks])

  return (
    <AuthenticatedRoute requiredUserType={UserType.Pharmacist}>
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </AuthenticatedRoute>
  )
}
