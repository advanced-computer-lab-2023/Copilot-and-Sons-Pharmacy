
import { useSidebar } from '../../../hooks/sidebar'
import Container from '@mui/material/Container'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import MedicationIcon from '@mui/icons-material/Medication';

export function PharmacistDashboardLayout() {
  const { setSidebarLinks } = useSidebar()

  useEffect(() => {
    setSidebarLinks([
      {
        to:'/medicines/',
        text:'Medicines',
        icon:<MedicationIcon/>
      }
    ])
  }, [setSidebarLinks])

  return (
      <Container maxWidth="xs">
        <Outlet />
      </Container>

  )
}
