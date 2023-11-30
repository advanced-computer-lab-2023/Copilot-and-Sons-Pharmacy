import { viewAlternativeMedicine } from '@/api/medicine'
import IMedicine from '@/types/medicine.type'
import Grid from '@mui/material/Grid'
import Container from '@mui/system/Container'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MedicineCard from '../../../components/MedicineCard'

export const ViewAlternativeMedicine = () => {
  const { id } = useParams()

  const [medicines, setMedicines] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await viewAlternativeMedicine(id!)
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
            <MedicineCard medicine={medicine} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
