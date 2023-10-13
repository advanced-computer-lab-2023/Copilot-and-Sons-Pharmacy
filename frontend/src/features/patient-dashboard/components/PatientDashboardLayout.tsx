
import {  Container } from '@mui/material'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useSidebar } from '../../../hooks/sidebar';
import MedicationIcon from '@mui/icons-material/Medication';

export function PatientDashboardLayout() {
  const { setSidebarLinks } = useSidebar()

  useEffect(() => {
    setSidebarLinks([
      {
        to:"/medicines/",
        text:"view all Medicines",
        icon:<MedicationIcon/>
  
      },

  
])
}
  , [setSidebarLinks])

  return (

      <Container maxWidth="xs">

        <Outlet />
      </Container>

  )
}
