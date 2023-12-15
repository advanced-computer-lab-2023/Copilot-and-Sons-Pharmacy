import { RouteObject } from 'react-router-dom'
import { authRoutes } from './features/auth/routes'
import { pharmacistDashboardRoutes } from './features/pharmacist-dashboard/routes'
import { adminDashboardRoutes } from './features/admin-dashboard/routes'
import { patientDashboardRoutes } from './features/patient-dashboard/routes'
import { BaseLayout } from './components/BaseLayout'
import { RedirectToDashboard } from './components/RedirectToDashboard'
import { medicineRoutes } from './features/medicine-dashboard/routes'
import ForgotPassword from './features/auth/routes/ForgotPassword'
import { DoctorDashboardRoutes } from './features/doctor-dashboard/routes'
import { CartProvider } from './providers/cartProvider'

export const routes: RouteObject[] = [
  {
    element: (
      <CartProvider>
        <BaseLayout />
      </CartProvider>
    ),
    children: [
      {
        path: '/',
        element: <RedirectToDashboard />,
      },
      {
        path: '/pharmacist-dashboard',
        children: pharmacistDashboardRoutes,
      },
      {
        path: '/patient-dashboard',
        children: patientDashboardRoutes,
      },
      {
        path: '/admin-dashboard',
        children: adminDashboardRoutes,
      },
      {
        path: '/medicine-dashboard',
        children: medicineRoutes,
      },
      {
        path: '/doctor-dashboard',
        children: DoctorDashboardRoutes,
      },
      {
        path: '/auth',
        children: authRoutes,
      },
      {
        path: '/medicines',
        children: medicineRoutes,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
    ],
  },
]
