import { useEffect, useState } from 'react'
import { Container, Grid } from '@mui/material'
import BasicCard from '../../../components/BasicCard'
import { viewMedicinesQuantityAndSales } from '../../../api/medicine'

const ViewMedicineSalesAndQuantity = () => {
  const [medicines, setMedicines] = useState([])

  useEffect(() => {
    console.log('hey')

    const fetchData = async () => {
      try {
        const response = await viewMedicinesQuantityAndSales()
        setMedicines(response.data.data)
      } catch (error) {
        console.error('Error fetching medicines: ', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Container>
      <Grid container rowSpacing={4}>
        {medicines.map((medicine: any) => (
          <Grid item xs={12} md={6} lg={4} key={medicine._id}>
            <BasicCard medicine={medicine} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default ViewMedicineSalesAndQuantity
