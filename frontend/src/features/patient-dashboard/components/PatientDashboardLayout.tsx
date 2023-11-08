import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useSidebar } from '../../../hooks/sidebar'
import { Healing, LocationCity, ShoppingCart } from '@mui/icons-material'
import { AuthenticatedRoute } from '@/components/AuthenticatedRoute'
import { UserType } from 'pharmacy-common/types/user.types'
import CartDrawer from '../routes/CartDrawer'
import { CartProvider } from '@/providers/cartProvider'

export function PatientDashboardLayout() {
  const { setSidebarLinks } = useSidebar()
  const [isCartOpen, setCartOpen] = useState(false)

  const toggleCart = () => {
    setCartOpen(!isCartOpen)
  }

  useEffect(() => {
    setSidebarLinks([
      {
        to: '/patient-dashboard/medicines/',
        text: 'View All Available Medicines',
        icon: <Healing />,
      },
      {
        to: '/patient-dashboard/medicines/search-for-medicine/',
        text: 'Search For Medicine',
        icon: <Healing />,
      },
      {
        to: '/patient-dashboard/medicines/allUses',
        text: 'Filter By Medicinal Use',
        icon: <Healing />,
      },

      {
        to: '/patient-dashboard/delivery-addresses',
        text: 'Delivery Addresses',
        icon: <LocationCity />,
      },

      { action: toggleCart, text: 'Cart', icon: <ShoppingCart /> },
    ])
  }, [setSidebarLinks])

  return (
    <CartProvider>
      <AuthenticatedRoute requiredUserType={UserType.Patient}>
        <Container maxWidth="xl">
          <CartDrawer isOpen={isCartOpen} onClose={toggleCart} />
          <Outlet />
        </Container>
      </AuthenticatedRoute>
    </CartProvider>
  )
}
