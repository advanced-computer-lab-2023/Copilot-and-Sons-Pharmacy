import { RouteObject } from 'react-router-dom'
import {PharmacistDashboardLayout } from '../components/PharmacistDashboardLayout'
import {PharmacistDashboardHome } from './pharmacistDashboardHome'

export const pharmacistDashboardRoutes: RouteObject[] = [
  {
    element: <PharmacistDashboardLayout />,
    children: [
      {
        path: '',
        element: < PharmacistDashboardHome />,
      },
    ],
  },
]
