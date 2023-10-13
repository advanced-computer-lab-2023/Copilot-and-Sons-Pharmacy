
import { Button, Container } from '@mui/material'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import  PersonIcon  from '@mui/icons-material/Person';
import { useSidebar } from '../../../hooks/sidebar';


export function PatientDashboardLayout() {
  const { setSidebarLinks } = useSidebar()

  useEffect(() => {
    setSidebarLinks([
      
     {
      to:"/patient-dashboard/viewPatients",
      text:"view all patients",
      icon: < PersonIcon/>,
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
