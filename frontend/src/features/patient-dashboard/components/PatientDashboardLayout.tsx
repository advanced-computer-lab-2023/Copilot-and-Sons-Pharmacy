import { Container } from '@mui/material'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useSidebar } from '../../../hooks/sidebar'
import {
  Healing,
  LocalShipping,
  LocationCity,
  MedicationOutlined,
  Home,
  VpnKey,
} from '@mui/icons-material'
import { AuthenticatedRoute } from '@/components/AuthenticatedRoute'
import { UserType } from 'pharmacy-common/types/user.types'
import CartDrawer from '../routes/CartDrawer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStethoscope } from '@fortawesome/free-solid-svg-icons'

export function PatientDashboardLayout() {
  const { setSidebarLinks } = useSidebar()

  useEffect(() => {
    setSidebarLinks([
      {
        to: '/patient-dashboard',
        text: 'Home',
        icon: <Home />,
      },

      {
        to: '/patient-dashboard/medicines/',
        text: 'Medicines',
        icon: <Healing />,
      },
      {
        to: '/patient-dashboard/delivery-addresses',
        text: 'Delivery Addresses',
        icon: <LocationCity />,
      },

      {
        to: '/patient-dashboard/orders',
        text: 'Orders',
        icon: <LocalShipping />,
      },

      {
        to: '/patient-dashboard/pharmacists',
        text: 'Chat With Pharmacists',
        icon: <MedicationOutlined />,
      },
      {
        to: '/patient-dashboard/change-password',
        text: 'Change Password',
        icon: <VpnKey />,
      },

      {
        to: '/patient-dashboard/clinic',
        text: 'Your Clinic',
        icon: <FontAwesomeIcon icon={faStethoscope} />,
      },
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSidebarLinks])

  return (
    <AuthenticatedRoute requiredUserType={UserType.Patient}>
      <Container maxWidth="xl">
        <CartDrawer />
        <Outlet />
      </Container>
    </AuthenticatedRoute>
  )
}
