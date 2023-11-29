import { DoctorDashboardLayout } from '../components/DoctorDashboardLayout'
import ViewAllMedicines from '@/features/medicine-dashboard/routes/ViewAllMedicines'
import SearchForMedicine from '@/features/medicine-dashboard/routes/searchForMedicine'
import MedicinalUses from '@/features/medicine-dashboard/routes/ViewAllMedicinalUses'
import FilteredMedicines from '@/features/medicine-dashboard/routes/FilterMedicines'
import { Link, RouteObject } from 'react-router-dom'

export const DoctorDashboardRoutes: RouteObject[] = [
  {
    element: <DoctorDashboardLayout />,
    children: [
      {
        path: '',
        children: [
          {
            path: 'medicines',
            element: (
              <>
                {' '}
                <ViewAllMedicines />{' '}
                <Link to="http://localhost:5173/">backto clinic </Link>
              </>
            ),
          },
          {
            path: 'medicines/search-for-medicine',
            element: <SearchForMedicine />,
          },
          {
            path: 'medicines/allUses',
            element: <MedicinalUses />,
          },
          {
            path: 'medicines/allUses/:name',
            element: <FilteredMedicines />,
          },
        ],
      },
    ],
  },
]
