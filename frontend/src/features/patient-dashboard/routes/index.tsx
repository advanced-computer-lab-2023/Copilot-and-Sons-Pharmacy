import { RouteObject } from 'react-router-dom'
import { PatientDashboardLayout } from '../components/PatientDashboardLayout'
import { PatientDashboardHome } from './PatientDashboardHome'
import ViewPatients from './viewAllPatients'
import PatientInfo from './viewPatient'

export const patientDashboardRoutes: RouteObject[] = [
  {
    element: <PatientDashboardLayout />,
    children: [
      {
        path: '',
        element: <PatientDashboardHome />,
      },
      {
        path: 'viewPatients',
        element: <ViewPatients />,
      },
      {
        path: 'viewPatients/info/:id',
        element: <PatientInfo />,
      },
    ],
  },
]
