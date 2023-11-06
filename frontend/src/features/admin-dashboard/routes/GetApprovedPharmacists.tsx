import { useState, useEffect } from 'react'
import axios from 'axios'
import PharmacistDetails from '../../../components/pharmacistDetails'
import { Container, Grid } from '@mui/material'

const GetApprovedPharmacists = () => {
  const [pharmacists, setPharmacists] = useState<any[]>([])

  useEffect(() => {
    const fetchPharmacists = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/admin/getAcceptedPharmacists'
        )

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
          pharmacists.map((pharmacist) => (
            <Grid item sm={6} md={3}>
              <PharmacistDetails key={pharmacist._id} pharmacist={pharmacist} />
            </Grid>
          ))}
      </Grid>
    </Container>
  )
}

export default GetApprovedPharmacists
