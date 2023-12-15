import { Button, Container, Grid } from '@mui/material'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { filterByMedicinalUse } from '../../../api/medicine'
import MedicineCard from '../../../components/MedicineCard'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { addtoPrescriptionApi } from '@/api/doctor'
import { OnlyAuthenticated } from '@/components/OnlyAuthenticated'
import { UserType } from 'pharmacy-common/types/user.types'

const FilteredMedicines = () => {
  const [prescriptionList, setPrescriptionList] = useState<any>([])

  useEffect(() => {
    // Update local storage whenever prescriptionList changes
    if (prescriptionList.length > 0) {
      localStorage.setItem('prescriptionList', JSON.stringify(prescriptionList))
    }

    console.log('local list', localStorage.getItem('prescriptionList'))
  }, [prescriptionList])

  useEffect(() => {
    const storedPrescriptionList = localStorage.getItem('prescriptionList')

    if (storedPrescriptionList) {
      const parsedPrescriptionList = JSON.parse(storedPrescriptionList)
      console.log('starter local lost', parsedPrescriptionList)
      setPrescriptionList(parsedPrescriptionList)
    } else {
      // Set a default value if there is no item in local storage
      setPrescriptionList([])
    }
  }, [])

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
    if (prescriptionList.length === 0) {
      toast.error('Prescription is empty!', {
        position: 'top-right',
      })

      return
    }

    try {
      // Call the addtoPrescriptionApi with the prescriptionList
      await addtoPrescriptionApi(prescriptionList)

      // Assuming the API call was successful, you can clear the prescription list
      setPrescriptionList([])
      localStorage.setItem('prescriptionList', JSON.stringify([]))

      // Optionally, show a success message to the user
      if (localStorage.getItem('PrescriptionId')) {
        toast.success('Prescription updated successfully!', {
          position: 'top-right',
        })
      } else {
        toast.success('Prescription submitted successfully!', {
          position: 'top-right',
        })
      }
    } catch (error) {
      // Handle any errors from the API call
      toast.error('Error submitting prescription. Please try again later.', {
        position: 'top-right',
      })
    }
  }

  const { name } = useParams()

  const {
    data: medicines,
    isLoading,
    isError,
  } = useQuery('patient', () => filterByMedicinalUse(name!))
  console.log(medicines)

  return (
    <Container>
      <Grid container spacing={4}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching patient</p>}
        {medicines && Array.isArray(medicines.data) ? (
          medicines.data.map((medicine: any) => (
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
          {localStorage.getItem('PrescriptionId')
            ? 'Update Prescription'
            : 'Submit Prescription'}
        </Button>
      </OnlyAuthenticated>
    </Container>
  )
}

export default FilteredMedicines
