import { useEffect, useState } from 'react'
import { Button, Container, Grid } from '@mui/material'
import MedicineCard from '../../../components/MedicineCard'
import {
  viewAllMedicines,
  viewUnarchivedMedicines,
} from '../../../api/medicine'
import IMedicine from '../../../types/medicine.type'
import { UserType } from 'pharmacy-common/types/user.types'
import { OnlyAuthenticated } from '@/components/OnlyAuthenticated'
import { toast } from 'react-toastify'
import { addtoPrescriptionApi } from '@/api/doctor'
import { useAuth } from '@/hooks/auth'

const ViewAllMedicines = () => {
  const { user } = useAuth()
  const [medicines, setMedicines] = useState([])

  const [prescriptionList, setPrescriptionList] = useState<any>([])

  useEffect(() => {
    const storedPrescriptionList = localStorage.getItem('prescriptionList')

    if (storedPrescriptionList) {
      const parsedPrescriptionList = JSON.parse(storedPrescriptionList)
      console.log(parsedPrescriptionList)
      setPrescriptionList(parsedPrescriptionList)
    } else {
      // Set a default value if there is no item in local storage
      setPrescriptionList([])
    }
  }, [])

  useEffect(() => {
    // Update local storage whenever prescriptionList changes
    if (prescriptionList.length > 0) {
      localStorage.setItem('prescriptionList', JSON.stringify(prescriptionList))
    }

    console.log('local list', localStorage.getItem('prescriptionList'))
  }, [prescriptionList])

  const updatePrescriptionList = () => {
    // Save the updated prescriptionList to local storage
    localStorage.setItem('prescriptionList', JSON.stringify(prescriptionList))
  }

  const addToPrescription = (medicineItem: any) => {
    if (prescriptionList.some((item: any) => item.name === medicineItem.name)) {
      toast.error('Medicine already added to prescription!', {
        position: 'top-right',
      })
    } else {
      setPrescriptionList((prevList: any) => [...prevList, medicineItem])
      updatePrescriptionList()
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await viewAllMedicines()

        if (user?.type === UserType.Patient) {
          response = await viewUnarchivedMedicines()
        }

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
          {localStorage.getItem('PrescriptionId')
            ? 'Update Prescription'
            : 'Submit Prescription'}
        </Button>
      </OnlyAuthenticated>
    </Container>
  )
}

export default ViewAllMedicines
