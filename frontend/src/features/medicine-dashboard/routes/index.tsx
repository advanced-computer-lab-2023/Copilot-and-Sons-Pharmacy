import { RouteObject } from 'react-router-dom'
import { MedicineDashboardLayout } from '../components/MedicineDashboardLayout'
import  ViewAllMedicines  from './ViewAllMedicines'
import ViewMedicineSalesAndQuantity from './ViewMedicineSalesAndQuantity'

import { EditMedicine } from './editMedicine'
import { AddMedicine } from './AddMedicine'

export const medicineRoutes: RouteObject[] = [
  {
    element: <MedicineDashboardLayout />,
    children: [
      {
        path: '',
        element: <ViewAllMedicines/>,
      },
      {
        path: 'sales-and-quantity',
        element: <ViewMedicineSalesAndQuantity/>,
      },
      {
        path: 'editMedicine/:name',
        element: <EditMedicine/>,
      },
       {
        path: 'addMedicine',
        element: < AddMedicine />,
      },
    ],
  },
]
