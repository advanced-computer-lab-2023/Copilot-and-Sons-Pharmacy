import { useEffect, useState } from 'react'
import {
  viewMedicinesQuantityAndSales,
  viewMedicinesQuantityAndSalesByDate,
  viewMedicinesQuantityAndSalesByMonth,
} from '../api/medicine'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import LoadingButton from '@mui/lab/LoadingButton'
import { useMutation } from 'react-query'
import { useAlerts } from '@/hooks/alerts'
import { OnlyAuthenticated } from './OnlyAuthenticated'
import { UserType } from 'pharmacy-common/types/user.types'

const ViewMedicineSalesAndQuantityComponent = () => {
  const [medicines, setMedicines] = useState([])
  const [date, setDate] = useState<Date | null>(null)
  const [month, setMonth] = useState<Date | null>(null)
  const [filterBy, setFilterBy] = useState('none')
  const [isFiltering, setIsFiltering] = useState(false)
  const alert = useAlerts()

  const mutationFilterByMonth = useMutation(
    'viewMedicinesQuantityAndSalesByMonth',
    viewMedicinesQuantityAndSalesByMonth,
    {
      onSuccess: (data) => {
        console.log(data)
        setIsFiltering(true)

        return data.data
      },
      onError: () => {
        alert.addAlert({
          message: 'Failed! Try again',
          severity: 'error',
        })

        setIsFiltering(false)
        setFilterBy('none')
      },
    }
  )
  const mutationFilterByDate = useMutation(
    'viewMedicinesQuantityAndSalesByDate',
    viewMedicinesQuantityAndSalesByDate,
    {
      onSuccess: (data) => {
        console.log(data)
        setIsFiltering(true)

        return data.data
      },
    }
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await viewMedicinesQuantityAndSales()
        const medicines = response.data.data
        medicines.forEach((medicine: any) => {
          medicine.id = medicine._id
        })
        setMedicines(medicines)
      } catch (error) {
        console.error('Error fetching medicines: ', error)
      }
    }

    fetchData()
  }, [])

  const columns = [
    { field: 'name', headerName: 'Medicine Name', width: 300 },
    { field: 'quantity', headerName: 'Quantity', type: 'number', width: 120 },
    { field: 'sales', headerName: 'Sales', type: 'number', width: 120 },
  ]

  return (
    <Box sx={{ height: 'auto', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '10px',
        }}
      >
        <OnlyAuthenticated requiredUserType={UserType.Pharmacist}>
          <LoadingButton
            // loading={filterBy === 'date'}
            onClick={() => {
              setFilterBy('date')
              setIsFiltering(false)
              setDate(null)
            }}
            // variant="outlined"
            style={{ margin: '10px' }}
            variant={filterBy !== 'date' ? 'contained' : 'outlined'}
            sx={{ margin: '10px' }}
          >
            Date Filter
          </LoadingButton>
        </OnlyAuthenticated>
        <LoadingButton
          // loading={filterBy === 'month'}
          onClick={() => {
            setFilterBy('month')
            setIsFiltering(false)
            setMonth(null)
          }}
          variant={filterBy !== 'month' ? 'contained' : 'outlined'}
          sx={{ margin: '10px' }}
        >
          Month Filter
        </LoadingButton>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '10px',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            {filterBy === 'date' && (
              <DatePicker
                label="Filter by date"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue)
                  setIsFiltering(false)
                }}
              />
            )}

            {filterBy === 'month' && (
              <DatePicker
                label={'Filter by month'}
                views={['year', 'month']}
                value={month}
                onChange={(newValue) => {
                  setMonth(newValue)
                  setIsFiltering(false)
                  console.log(newValue)
                }}
              />
            )}
          </DemoContainer>
        </LocalizationProvider>
        {filterBy !== 'none' && (
          <LoadingButton
            loading={
              mutationFilterByMonth.isLoading || mutationFilterByDate.isLoading
            }
            onClick={() => {
              if (!isFiltering) {
                if (filterBy === 'month') {
                  if (month) mutationFilterByMonth.mutate(month)
                }

                if (filterBy === 'date') {
                  if (date) mutationFilterByDate.mutate(date)
                }

                return
              } else setIsFiltering(!isFiltering)

              setFilterBy('none')
            }}
            variant="contained"
            sx={{ margin: '10px' }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '10px',
            }}
            color={isFiltering ? 'error' : 'success'}
          >
            {isFiltering ? 'Clear Filter' : 'Filter'}
          </LoadingButton>
        )}
      </div>
      <DataGrid
        rows={medicines.map((medicine: any) => {
          let sales = medicine.sales

          if (isFiltering) sales = 0

          if (filterBy === 'month') {
            // console.log(mutationFilterByMonth.data?.data?.data)
            mutationFilterByMonth.data?.data?.data.forEach(
              (medicineSales: any) => {
                if (medicineSales.name === medicine.name)
                  sales = medicineSales.sales
              }
            )
          }

          if (filterBy === 'date') {
            mutationFilterByDate.data?.data?.data.forEach(
              (medicineSales: any) => {
                if (medicineSales.name === medicine.name)
                  sales = medicineSales.sales
              }
            )
          }

          return {
            id: medicine._id,
            name: medicine.name,
            quantity: medicine.quantity,
            sales,
          }
        })}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  )
}

export default ViewMedicineSalesAndQuantityComponent
