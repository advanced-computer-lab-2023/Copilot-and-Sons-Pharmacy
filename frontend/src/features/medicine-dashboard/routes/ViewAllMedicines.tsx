import { useEffect, useState } from 'react'
import { Button, Container, Grid } from '@mui/material'
import MedicineCard from '../../../components/MedicineCard'
import { viewAllMedicines } from '../../../api/medicine'
import IMedicine from '../../../types/medicine.type'
import { UserType } from 'pharmacy-common/types/user.types'
import { OnlyAuthenticated } from '@/components/OnlyAuthenticated'
import { toast } from 'react-toastify'
import { addtoPrescriptionApi } from '@/api/doctor'

const ViewAllMedicines = () => {
  const [medicines, setMedicines] = useState([])

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

  // async function h(medicinename: string) {
  //   try {
  //     await addtoPrescriptionApi(medicinename)
  //     toast.success('Added to Prescription!', {
  //       position: 'top-right',
  //     })
  //   } catch (e: any) {
  //     toast.error(e.message, {
  //       position: 'top-right',
  //     })
  //   }
  // }

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await viewAllMedicines()
        setMedicines(response.data.data)
      } catch (error) {
        console.error('Error fetching medicines: ', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Container>
      <Grid container spacing={4}>
        {medicines.map((medicine: IMedicine) => (
          <Grid item xs={12} md={6} lg={4} key={medicine._id}>
            <MedicineCard
              medicine={medicine}
              onAddToPrescription={addToPrescription}
            />
          </Grid>
        ))}
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
  )
}

export default ViewAllMedicines
