import { RouteObject } from 'react-router-dom'
import { PatientDashboardLayout } from '../components/PatientDashboardLayout'
import { PatientDashboardHome } from './PatientDashboardHome'
import { DeliveryAddresses } from './DeliveryAddresses'
import ViewAllMedicines from '@/features/medicine-dashboard/routes/ViewAllMedicines'
import SearchForMedicine from '@/features/medicine-dashboard/routes/searchForMedicine'
import MedicinalUses from '@/features/medicine-dashboard/routes/ViewAllMedicinalUses'
import FilteredMedicines from '@/features/medicine-dashboard/routes/FilterMedicines'
import ChangePassword from '@/features/auth/routes/ChangePassowrd'
import { useEffect } from 'react'
import AllOrders from '@/features/patient-dashboard/routes/AllOrders'

import Checkout from '@/features/patient-dashboard/routes/Checkout'
import ViewOrder from './ViewOrder'
import { ViewAlternativeMedicine } from '@/features/medicine-dashboard/routes/ViewAlternativeMedicine'
// import { PrescriptionCheckout } from './PrescriptionCheckout'
import { ChatWithPharmacists } from '@/features/doctor-dashboard/routes/ChatWithPharmacists'
// import { PrescriptionCheckout } from './PrescriptionCheckout'
import { Wallet } from './Wallet'

const token = localStorage.getItem('token')

// eslint-disable-next-line react-refresh/only-export-components
const RedirectToClinic = () => {
  useEffect(() => {
    // Navigate to the clinic URL
    window.location.href = `http://localhost:5173/patient-dashboard?token=${token}`
  })

  return null // This component doesn't render anything, it just redirects
}

export const patientDashboardRoutes: RouteObject[] = [
  {
    element: <PatientDashboardLayout />,
    children: [
      {
        path: '',
        element: <PatientDashboardHome />,
      },
      {
        path: 'change-password',
        element: <ChangePassword />,
      },
      {
        path: 'delivery-addresses',
        element: <DeliveryAddresses />,
      },

      {
        path: 'orders',
        element: <AllOrders />,
      },
      {
        path: 'viewOrder/:id',
        element: <ViewOrder />,
      },
      // {
      //   path: 'prescriptionCheckout',
      //   element: < PrescriptionCheckout/>,
      // },
      {
        path: 'medicines',
        children: [
          {
            path: '',
            element: <ViewAllMedicines />,
          },
          {
            path: 'search-for-medicine',
            element: <SearchForMedicine />,
          },
          {
            path: 'allUses',
            element: <MedicinalUses />,
          },
          {
            path: 'allUses/:name',
            element: <FilteredMedicines />,
          },
          {
            path: 'checkout/:jsonString',
            element: <Checkout />,
          },

          {
            path: 'view-alternative-medicine/:id',
            element: <ViewAlternativeMedicine />,
          },
        ],
      },
      {
        path: 'pharmacists',
        element: <ChatWithPharmacists />,
      },
      {
        path: 'wallet',
        element: <Wallet />,
      },
      {
        path: 'clinic',
        element: <RedirectToClinic />,
      },
    ],
  },
]
