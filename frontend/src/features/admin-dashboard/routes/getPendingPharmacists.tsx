import PharmacistDetails from '../../../components/pharmacistDetails'
import { Container, Grid } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import { CardPlaceholder } from '@/components/CardPlaceholder'
import { getPendingPharmacists } from '@/api/admin'
import { useQuery } from 'react-query'

const GetPharmacists = () => {
  const query = useQuery({
    queryKey: ['pending-pharmacists'],
    queryFn: () => getPendingPharmacists(),
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
      <Grid container spacing={2}>
        {query.data?.map((pharmacist: any) => (
          <Grid item sm={6} md={4} key={pharmacist._id}>
            <PharmacistDetails pharmacist={pharmacist} query={query} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default GetPharmacists
