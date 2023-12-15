import PharmacistDetails from '../../../components/pharmacistDetails'
import { Container, Grid } from '@mui/material'
import { useQuery } from 'react-query'
import { CardPlaceholder } from '@/components/CardPlaceholder'
import { getApprovedPharmacists } from '@/api/admin'
import { ToastContainer } from 'react-toastify'

const GetApprovedPharmacists = () => {
  const query = useQuery({
    queryKey: ['approved-pharmacists'],
    queryFn: () => getApprovedPharmacists(),
  })

  if (query.isLoading) {
    return <CardPlaceholder />
  }

  if (query.data == null) {
    return <div>error</div>
  }

  return (
    <Container>
      <ToastContainer />
      {/* can replace container with civ */}
      {/* <div>
        {pharmacists && pharmacists.map((pharmacist) => (
            <PharmacistDetails key={pharmacist._id} pharmacist={pharmacist} />
        ))}
      </div> */}
      {/* to allign vertically  */}
      <Grid container spacing={1}>
        {query.data.map((pharmacist) => (
          <Grid item sm={6} md={4} key={pharmacist._id}>
            <PharmacistDetails pharmacist={pharmacist} query={query} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default GetApprovedPharmacists
