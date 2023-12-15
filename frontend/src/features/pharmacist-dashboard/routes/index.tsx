import { RouteObject } from 'react-router-dom'
import { PharmacistDashboardLayout } from '../components/PharmacistDashboardLayout'
import { PharmacistDashboardHome } from './pharmacistDashboardHome'

import { AddMedicine } from '@/features/medicine-dashboard/routes/AddMedicine'
import { EditMedicine } from '@/features/medicine-dashboard/routes/EditMedicine'
import FilteredMedicines from '@/features/medicine-dashboard/routes/FilterMedicines'
import MedicinalUses from '@/features/medicine-dashboard/routes/ViewAllMedicinalUses'
import ViewAllMedicines from '@/features/medicine-dashboard/routes/ViewAllMedicines'
import ViewMedicineSalesAndQuantity from '@/features/medicine-dashboard/routes/ViewMedicineSalesAndQuantity'
import SearchForMedicine from '@/features/medicine-dashboard/routes/searchForMedicine'
import ChangePassword from '@/features/auth/routes/ChangePassowrd'
import { ChatWithDoctors } from './ChatWithDoctors'
import { Wallet } from './Wallet'

export const pharmacistDashboardRoutes: RouteObject[] = [
  {
    element: <PharmacistDashboardLayout />,
    children: [
      {
        path: '',
        element: <PharmacistDashboardHome />,
      },
      {
        path: 'change-password',
        element: <ChangePassword />,
      },
      {
        path: 'medicines',
        children: [
          {
            path: '',
            element: <ViewAllMedicines />,
          },
          {
            path: 'sales-and-quantity',
            element: <ViewMedicineSalesAndQuantity />,
          },
          {
            path: 'search-for-medicine',
            element: <SearchForMedicine />,
          },
          {
            path: 'editMedicine/:name',
            element: <EditMedicine />,
          },
          {
            path: 'addMedicine',
            element: <AddMedicine />,
          },

          {
            path: 'allUses',
            element: <MedicinalUses />,
          },

          { path: 'allUses/:name', element: <FilteredMedicines /> },
        ],
      },
      { path: 'wallet', element: <Wallet /> },

      { path: 'doctors', element: <ChatWithDoctors /> },
    ],
  },
]
