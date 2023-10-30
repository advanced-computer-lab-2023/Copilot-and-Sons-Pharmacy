import { Container, Grid, Card, CardContent, Typography } from '@mui/material'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { viewAllMedicinalUses } from '../../../api/medicine'

const MedicinalUses = () => {
  const {
    data: medicinalUses,
    isLoading,
    isError,
  } = useQuery('medicinalUses', viewAllMedicinalUses)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error fetching patients</p>
  }

  return (
    <Container>
      <Grid container columnSpacing={4}>
        {medicinalUses?.data.map((use) => (
          <Grid item key={use} xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography>
                  MedicinalUse:
                  <Link to={use}>{use}</Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default MedicinalUses
