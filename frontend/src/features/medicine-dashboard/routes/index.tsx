import { RouteObject } from 'react-router-dom'
import { MedicineDashboardLayout } from '../components/MedicineDashboardLayout'
import  ViewAllMedicines  from './ViewAllMedicines'
import ViewMedicineSalesAndQuantity from './ViewMedicineSalesAndQuantity'
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
    ],
  },
]
