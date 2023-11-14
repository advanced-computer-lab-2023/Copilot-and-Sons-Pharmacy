import { useSidebar } from '../../../hooks/sidebar'
import Container from '@mui/material/Container'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { UserType } from 'pharmacy-common/types/user.types'
import { AuthenticatedRoute } from '@/components/AuthenticatedRoute'
import { Healing, LocalPharmacy, VpnKey } from '@mui/icons-material'
import { PharmacistStatus } from 'pharmacy-common/types/pharmacist.types'
import { getPharmacist } from '@/api/pharmacist'
import { useAuth } from '@/hooks/auth'
import { useQuery } from 'react-query'

export function PharmacistDashboardLayout() {
  const { setSidebarLinks } = useSidebar()
  const { user } = useAuth()

  const pharmacistQuery = useQuery({
    queryKey: ['pharmacist', user!.username],
    queryFn: () => getPharmacist(user!.username),
    enabled: !!user,
  })

  useEffect(() => {
    if (!user) {
      return
    }

    if (pharmacistQuery.isLoading) {
      return setSidebarLinks([])
    }

    if (pharmacistQuery.data?.pharmacist?.status === PharmacistStatus.Pending) {
      setSidebarLinks([])

      return
    }

    if (
      pharmacistQuery.data?.pharmacist?.status === PharmacistStatus.Rejected
    ) {
      setSidebarLinks([])

      return
    }

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
  }, [setSidebarLinks, user, pharmacistQuery])

  return (
    <AuthenticatedRoute requiredUserType={UserType.Pharmacist}>
      <Container maxWidth="xl">
        <Outlet />
        {pharmacistQuery.data?.pharmacist?.status ===
          PharmacistStatus.Pending && <h2> Your request is pending </h2>}
        {pharmacistQuery.data?.pharmacist?.status ===
          PharmacistStatus.Rejected && <h2> Your request is rejected </h2>}
      </Container>
    </AuthenticatedRoute>
  )
}
