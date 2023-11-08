import { RouteObject } from 'react-router-dom'
import { PatientDashboardLayout } from '../components/PatientDashboardLayout'
import { PatientDashboardHome } from './PatientDashboardHome'
import { DeliveryAddresses } from './DeliveryAddresses'
import ViewAllMedicines from '@/features/medicine-dashboard/routes/ViewAllMedicines'
import SearchForMedicine from '@/features/medicine-dashboard/routes/searchForMedicine'
import MedicinalUses from '@/features/medicine-dashboard/routes/ViewAllMedicinalUses'
import FilteredMedicines from '@/features/medicine-dashboard/routes/FilterMedicines'
import Checkout from "@/features/patient-dashboard/routes/Checkout";

export const patientDashboardRoutes: RouteObject[] = [
  {
    element: <PatientDashboardLayout />,
    children: [
      {
        path: '',
        element: <PatientDashboardHome />,
      },
      {
        path: 'delivery-addresses',
        element: <DeliveryAddresses />,
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
            path:'checkout',
            element: <Checkout/>
          }
        ],
      },
    ],
  },
]
