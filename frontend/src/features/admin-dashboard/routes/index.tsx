import { RouteObject } from 'react-router-dom'
import { AdminDashboardLayout } from '../components/AdminDashboardLayout'
import { AdminDashboardHome } from './AdminDashboardHome'

import AddingAdmin from './AddingAdmin'
import { RemoveUser } from './removeUser'

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

      },
      {
        path:'remove-user',
        element:<RemoveUser/>

      }

    ],
  },
]
