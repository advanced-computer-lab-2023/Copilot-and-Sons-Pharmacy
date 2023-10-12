import { RouteObject } from 'react-router-dom'
import { AdminDashboardLayout } from '../components/AdminDashboardLayout'
import { AdminDashboardHome } from './AdminDashboardHome'

import AddingAdmin from './AddingAdmin'

import GetApprovedPharmacists from './GetApprovedPharmacists'

import { RemoveUser } from './removeUser'
import {  ToastContainer } from 'react-toastify';


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
        element:<>  <ToastContainer /><AddingAdmin/></>

      },
      {
        path:'remove-user',
        element:<RemoveUser/>

      }
      ,
      {
        path:'get-approved-pharmacists',
        element:<GetApprovedPharmacists/>

      }

    ],
  },
]
