import { RouteObject } from 'react-router-dom'
import { AdminDashboardLayout } from '../components/AdminDashboardLayout'
import { AdminDashboardHome } from './AdminDashboardHome'

import AddingAdmin from './AddingAdmin'

import GetApprovedPharmacists from './GetApprovedPharmacists'

import { RemoveUser } from './RemoveUser'
import { ToastContainer } from 'react-toastify'
import GetPharmacists from './getPendingPharmacists'

export const adminDashboardRoutes: RouteObject[] = [
  {
    element: <AdminDashboardLayout />,
    children: [
      {
        path: '',
        element: <AdminDashboardHome />,
      },
      {
        path: 'add-admin',
        element: (
          <>
            {' '}
            <ToastContainer />
            <AddingAdmin />
          </>
        ),
      },
      {
        path: 'remove-user',
        element: <RemoveUser />,
      },
      {
        path: 'get-approved-pharmacists',
        element: <GetApprovedPharmacists />,
      },
      {
        path: 'get-pending-pharmacists',
        element: <GetPharmacists />,
      },
    ],
  },
]
