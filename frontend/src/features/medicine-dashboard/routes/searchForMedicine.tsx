import React, { useState } from 'react'
import { Container, TextField, Button, Grid } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useQuery } from 'react-query'
import { searchForMedicine } from '../../../api/medicine'
import MedicineCard from '../../../components/MedicineCard'

const SearchForMedicine: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const { data, isLoading, isError } = useQuery(
    ['medicineSearch', searchTerm],
    async () => {
      if (searchTerm) {
        const response = await searchForMedicine(searchTerm)
        console.log(response)

        return response.data
      }
    }
  )

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          label="Search for Medicine"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={() => {
            searchForMedicine(searchTerm)
          }}
          style={{ marginTop: '10px' }}
        >
          Search
        </Button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching data</p>
      ) : data ? (
        <Container>
          <Grid container rowSpacing={4}>
            {data && Array.isArray(data) ? (
              data.map((medicine: any) => (
                <Grid item xs={12} md={6} lg={4} key={medicine.id}>
                  <MedicineCard medicine={medicine} />
                </Grid>
              ))
            ) : (
              <p>No data found</p>
            )}
          </Grid>
        </Container>
      ) : null}
    </Container>
  )
}

export default SearchForMedicine
