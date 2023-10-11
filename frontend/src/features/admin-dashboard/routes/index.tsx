import { RouteObject } from 'react-router-dom'
import { AdminDashboardLayout } from '../components/AdminDashboardLayout'
import { AdminDashboardHome } from './AdminDashboardHome'
import AddingAdmin from './AddingAdmin'
import GetApprovedPharmacists from './GetApprovedPharmacists'

export const adminDashboardRoutes: RouteObject[] = [
  {
    element: <AdminDashboardLayout />,
    children: [
      {
        path: '',
        element: <AdminDashboardHome />,
      },
      {
        path:'add-admin',
        element:<AddingAdmin/>

      }
      ,
      {
        path:'get-approved-pharmacists',
        element:<GetApprovedPharmacists/>

      }

    ],
  },
]
