import React, { useState } from 'react'
import { Container, TextField, Button, Grid } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useQuery } from 'react-query'
import { searchForMedicine } from '../../../api/medicine'
import MedicineCard from '../../../components/MedicineCard'
import { addtoPrescriptionApi } from '@/api/doctor'
import { OnlyAuthenticated } from '@/components/OnlyAuthenticated'
import { UserType } from 'pharmacy-common/types/user.types'
import { toast } from 'react-toastify'

const SearchForMedicine: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const [prescriptionList, setPrescriptionList] = useState<any>([])

  const addToPrescription = (medicineItem: any) => {
    if (prescriptionList.some((item: any) => item.name === medicineItem.name)) {
      toast.error('Medicine already added to prescription!', {
        position: 'top-right',
      })
    } else {
      setPrescriptionList((prevList: any) => [...prevList, medicineItem])
      toast.success('Added to Prescription!', {
        position: 'top-right',
      })
    }
  }

  const handleSubmitPrescription = async () => {
    try {
      // Call the addtoPrescriptionApi with the prescriptionList
      await addtoPrescriptionApi(prescriptionList)

      // Assuming the API call was successful, you can clear the prescription list
      setPrescriptionList([])

      // Optionally, show a success message to the user
      toast.success('Prescription submitted successfully!', {
        position: 'top-right',
      })
    } catch (error) {
      // Handle any errors from the API call
      toast.error('Error submitting prescription. Please try again later.', {
        position: 'top-right',
      })
    }
  }

  const { data, isLoading, isError } = useQuery(
    ['medicineSearch', searchTerm],
    async () => {
      if (searchTerm) {
        const response = await searchForMedicine(searchTerm)
        console.log(response)

        return response.data
      }
    }
  )

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          label="Search for Medicine"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={() => {
            searchForMedicine(searchTerm)
          }}
          style={{ marginTop: '10px' }}
        >
          Search
        </Button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching data</p>
      ) : data ? (
        <Container>
          <Grid container rowSpacing={4}>
            {data && Array.isArray(data) ? (
              data.map((medicine: any) => (
                <Grid item xs={12} md={6} lg={4} key={medicine.id}>
                  <OnlyAuthenticated requiredUserType={UserType.Doctor}>
                    <MedicineCard
                      medicine={medicine}
                      onAddToPrescription={addToPrescription}
                    />
                  </OnlyAuthenticated>

                  <OnlyAuthenticated requiredUserType={UserType.Patient}>
                    <MedicineCard medicine={medicine} />
                  </OnlyAuthenticated>

                  <OnlyAuthenticated requiredUserType={UserType.Pharmacist}>
                    <MedicineCard medicine={medicine} />
                  </OnlyAuthenticated>
                </Grid>
              ))
            ) : (
              <p>No data found</p>
            )}
          </Grid>

          <OnlyAuthenticated requiredUserType={UserType.Doctor}>
            <div>
              <h3>Prescription List</h3>
              <ul>
                {prescriptionList.map((medicineItem: any) => (
                  <li key={medicineItem.name}>
                    {medicineItem.name} - {medicineItem.quantity} -{' '}
                    {medicineItem.dosage}
                    <Button
                      onClick={() => {
                        setPrescriptionList((prevList: any) =>
                          prevList.filter(
                            (item: any) => item.name !== medicineItem.name
                          )
                        )
                      }}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <Button
              color="secondary"
              disabled={false}
              variant="contained"
              onClick={() => handleSubmitPrescription()}
            >
              Submit Prescription
            </Button>
          </OnlyAuthenticated>
        </Container>
      ) : null}
    </Container>
  )
}

export default SearchForMedicine
