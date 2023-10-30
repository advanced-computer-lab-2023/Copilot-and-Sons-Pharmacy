import { RouteObject } from 'react-router-dom'
import { MedicineDashboardLayout } from '../components/MedicineDashboardLayout'
import ViewAllMedicines from './ViewAllMedicines'
import ViewMedicineSalesAndQuantity from './ViewMedicineSalesAndQuantity'
import SearchForMedicine from './searchForMedicine'

import MedicinalUses from './ViewAllMedicinalUses'
import FilteredMedicines from './FilterMedicines'

import { EditMedicine } from './EditMedicine'
import { AddMedicine } from './AddMedicine'

export const medicineRoutes: RouteObject[] = [
  {
    element: <MedicineDashboardLayout />,
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
]
