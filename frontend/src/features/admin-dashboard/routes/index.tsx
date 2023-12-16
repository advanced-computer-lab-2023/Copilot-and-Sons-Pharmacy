import { RouteObject } from 'react-router-dom'
import { AdminDashboardLayout } from '../components/AdminDashboardLayout'
import { AdminDashboardHome } from './AdminDashboardHome'

import AddingAdmin from './AddingAdmin'

import GetApprovedPharmacists from './GetApprovedPharmacists'

import { RemoveUser } from './RemoveUser'
import GetPharmacists from './getPendingPharmacists'
import ViewAllMedicines from '@/features/medicine-dashboard/routes/ViewAllMedicines'
import ViewPatients from '@/features/patient-dashboard/routes/viewAllPatients'
import PatientInfo from '@/features/patient-dashboard/routes/viewPatient'
import SearchForMedicine from '@/features/medicine-dashboard/routes/searchForMedicine'
import MedicinalUses from '@/features/medicine-dashboard/routes/ViewAllMedicinalUses'
import FilteredMedicines from '@/features/medicine-dashboard/routes/FilterMedicines'
import ChangePassword from '@/features/auth/routes/ChangePassowrd'
import ViewMedicineSalesAndQuantity from './ViewMedicineSalesAndQuantity'
import { useEffect } from 'react'

const token = localStorage.getItem('token')

// eslint-disable-next-line react-refresh/only-export-components
const RedirectToClinic = () => {
  useEffect(() => {
    // Navigate to the clinic URL
    window.location.href = `http://localhost:5173/admin-dashboard?token=${token}`
  })

  return null // This component doesn't render anything, it just redirects
}

export const adminDashboardRoutes: RouteObject[] = [
  {
    element: <AdminDashboardLayout />,
    children: [
      {
        path: '',
        element: <AdminDashboardHome />,
      },
      {
        path: 'change-password',
        element: <ChangePassword />,
      },
      {
        path: 'add-admin',
        element: <AddingAdmin />,
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
      {
        path: 'medicines',
        children: [
          {
            path: '',
            element: <ViewAllMedicines />,
          },
          {
            path: 'search-for-medicine',
            element: <SearchForMedicine />,
          },
          {
            path: 'allUses',
            element: <MedicinalUses />,
          },
          {
            path: 'allUses/:name',
            element: <FilteredMedicines />,
          },
        ],
      },
      {
        path: 'viewPatients',
        element: <ViewPatients />,
      },
      {
        path: 'viewPatients/info/:id',
        element: <PatientInfo />,
      },
      {
        path: 'sales-and-quantity',
        element: <ViewMedicineSalesAndQuantity />,
      },
      {
        path: 'clinic',
        element: <RedirectToClinic />,
      },
    ],
  },
]
