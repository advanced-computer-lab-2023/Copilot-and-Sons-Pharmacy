import { Container, Grid } from '@mui/material'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { filterByMedicinalUse } from '../../../api/medicine'
import MedicineCard from '../../../components/MedicineCard'

const FilteredMedicines = () => {
  const { name } = useParams()

  const {
    data: medicines,
    isLoading,
    isError,
  } = useQuery('patient', () => filterByMedicinalUse(name!))
  console.log(medicines)

  return (
    <Container>
      <Grid container rowSpacing={4}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching patient</p>}
        {medicines && Array.isArray(medicines.data) ? (
          medicines.data.map((medicine: any) => (
            <Grid item xs={12} md={6} lg={4} key={medicine.id}>
              <MedicineCard medicine={medicine} />
            </Grid>
          ))
        ) : (
          <p>No data found</p>
        )}
      </Grid>
    </Container>
  )
}

export default FilteredMedicines
