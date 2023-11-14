import { RouteObject } from 'react-router-dom'
import { PatientDashboardLayout } from '../components/PatientDashboardLayout'
import { PatientDashboardHome } from './PatientDashboardHome'
import { DeliveryAddresses } from './DeliveryAddresses'
import ViewAllMedicines from '@/features/medicine-dashboard/routes/ViewAllMedicines'
import SearchForMedicine from '@/features/medicine-dashboard/routes/searchForMedicine'
import MedicinalUses from '@/features/medicine-dashboard/routes/ViewAllMedicinalUses'
import FilteredMedicines from '@/features/medicine-dashboard/routes/FilterMedicines'
import ChangePassword from '@/features/auth/routes/ChangePassowrd'

import AllOrders from '@/features/patient-dashboard/routes/AllOrders'

import Checkout from '@/features/patient-dashboard/routes/Checkout'
import ViewOrder from './ViewOrder'

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
        ],
      },
    ],
  },
]
