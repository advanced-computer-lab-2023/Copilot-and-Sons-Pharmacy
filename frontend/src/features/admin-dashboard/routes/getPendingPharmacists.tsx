import { useState, useEffect } from 'react'

import PharmacistDetails from '../../../components/pharmacistDetails'
import { Container, Grid } from '@mui/material'
import { api } from '@/api'

const GetPharmacists = () => {
  const [pharmacists, setPharmacists] = useState<any[]>([])

  useEffect(() => {
    const fetchPharmacists = async () => {
      try {
        const response = await api.get('/admin/getPendingPharmacists')

        if (response.status === 200) {
          setPharmacists(response.data)
        }
      } catch (error) {
        // Handle errors here
        console.error('Error fetching data:', error)
      }
    }

    fetchPharmacists()
  }, [])

  return (
    <Container>
      {/* can replace container with civ */}
      {/* <div>
        {pharmacists && pharmacists.map((pharmacist) => (
            <PharmacistDetails key={pharmacist._id} pharmacist={pharmacist} />
        ))}
      </div> */}
      {/* to allign vertically  */}
      <Grid container>
        {pharmacists &&
          pharmacists.map((pharmacist: any) => (
            <Grid item sm={6} md={3} key={pharmacist._id}>
              <PharmacistDetails pharmacist={pharmacist} />
            </Grid>
          ))}
      </Grid>
    </Container>
  )
}

export default GetPharmacists
