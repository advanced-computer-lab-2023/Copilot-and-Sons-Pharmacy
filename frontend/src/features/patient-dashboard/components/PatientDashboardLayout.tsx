import { Container } from '@mui/material'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useSidebar } from '../../../hooks/sidebar'
import MedicationIcon from '@mui/icons-material/Medication'
import { LocationCity } from '@mui/icons-material'

export function PatientDashboardLayout() {
  const { setSidebarLinks } = useSidebar()

  useEffect(() => {
    setSidebarLinks([
      {
        to: '/medicines/',
        text: 'Medicines',
        icon: <MedicationIcon />,
      },

      {
        to: '/patient-dashboard/delivery-addresses',
        text: 'Delivery Addresses',
        icon: <LocationCity />,
      },
    ])
  }, [setSidebarLinks])

  return (
    <Container maxWidth="xl">
      <Outlet />
    </Container>
  )
}
