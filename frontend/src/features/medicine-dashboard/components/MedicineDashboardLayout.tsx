
import { useSidebar } from '../../../hooks/sidebar'
import { Container } from '@mui/material'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import HealingIcon from '@mui/icons-material/Healing';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';

export function MedicineDashboardLayout() {
    const { setSidebarLinks } = useSidebar()

    useEffect(() => {
      setSidebarLinks([
        {
          to: '/medicines/',
          text: 'view All Available Medicines',
          icon: <HealingIcon />,
        },
  
        {
          to: '/medicines/sales-and-quantity',
          text: 'view Sales and Quantity',
          icon: <LocalPharmacyIcon />,
        },
        {
          to: '/medicines/addMedicine',
          text: 'Add Medicine',
          icon: <HealingIcon  />,
        },
 
      ])
    }, [setSidebarLinks])
  return (

      <Container sx={{ width: '100%' }}>
        <Outlet />
      </Container>

  )
}
