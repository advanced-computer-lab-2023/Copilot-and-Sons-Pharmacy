import { DoctorDashboardLayout } from '../components/DoctorDashboardLayout'
import ViewAllMedicines from '@/features/medicine-dashboard/routes/ViewAllMedicines'
import { RouteObject } from 'react-router-dom'
import { ChatWithPharmacists } from './ChatWithPharmacists'

export const DoctorDashboardRoutes: RouteObject[] = [
  {
    element: <DoctorDashboardLayout />,
    children: [
      {
        path: '',
        element: <ViewAllMedicines />,
      },
      {
        path: 'pharmacists',
        element: <ChatWithPharmacists />,
      },
    ],
  },
]
