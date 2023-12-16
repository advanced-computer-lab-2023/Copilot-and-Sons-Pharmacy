import { DoctorDashboardLayout } from '../components/DoctorDashboardLayout'
import ViewAllMedicines from '@/features/medicine-dashboard/routes/ViewAllMedicines'
import { ChatWithPharmacists } from './ChatWithPharmacists'

// eslint-disable-next-line react-refresh/only-export-components
const RedirectToClinic = () => {
  const token = localStorage.getItem('token')
  window.location.href = `http://localhost:5173/doctor-dashboard?token=${token}`

  return null // This component doesn't render anything, it just redirects
}

export const DoctorDashboardRoutes = [
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
      {
        path: 'clinic',
        element: <RedirectToClinic />,
      },
    ],
  },
]
