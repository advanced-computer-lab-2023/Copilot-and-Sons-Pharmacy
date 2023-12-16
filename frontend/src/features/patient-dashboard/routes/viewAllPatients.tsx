import { useQuery } from 'react-query'
import { viewAllPatients } from '../../../api/patient'

import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Button } from '@mui/material'

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
  {
    field: 'dateOfBirth',
    headerName: 'Date of Birth',
    flex: 1,
    valueGetter: (params) => {
      const date = new Date(params.row.dateOfBirth)

      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    },
  },
  {
    field: 'viewPatient',
    headerName: 'View more info',
    flex: 1,
    renderCell: (params) => (
      <Button
        variant="contained"
        onClick={() => {
          window.location.href = `/admin-dashboard/viewPatients/info/${params.row.id}`
        }}
      >
        View Patient
      </Button>
    ),
  },
]

const ViewPatients = () => {
  const {
    data: patients,
    isLoading,
    isError,
  } = useQuery('patients', viewAllPatients)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error fetching patients</p>
  }

  const rows = patients?.data.map((patient) => ({
    id: patient._id,
    name: patient.name,
    email: patient.email,
    dateOfBirth: patient.dateOfBirth,
  }))

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid rows={rows} columns={columns} checkboxSelection={false} />
    </div>
  )
}

export default ViewPatients
