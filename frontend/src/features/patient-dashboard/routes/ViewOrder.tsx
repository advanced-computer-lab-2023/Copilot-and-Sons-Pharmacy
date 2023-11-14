import { getOrderDetails } from '@/api/order'
import IMedicine from '@/types/medicine.type'
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export default function ViewOrder() {
  const { id } = useParams()

  const { data, error, isLoading } = useQuery('order', () =>
    getOrderDetails(id!)
  )

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    console.log(error)

    return <p>Error fetching orders</p>
  }

  console.log(data)
  const { _doc, medicines } = data!.data.data

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5">Order Details</Typography>
          <Typography>Status: {_doc.status}</Typography>
          <Typography>Total: {_doc.total}</Typography>
          <Typography>Payment Method: {_doc.paymentMethod}</Typography>
          <Typography>
            Created At: {new Date(_doc.createdAt).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h5" mt={2} textAlign="center">
        Ordered Items
      </Typography>

      <Grid container spacing={2} mt={2}>
        {medicines.map((medicine: IMedicine) => (
          <Grid item xs={12} md={6} lg={4} key={medicine._id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={medicine.Image}
                alt={medicine.name}
              />

              <CardContent>
                <Stack direction="row" justifyContent="space-between">
                  <div>
                    <Typography gutterBottom variant="h5" component="div">
                      {medicine.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {medicine.quantity}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body2" color="text.secondary">
                      Price: {medicine.price}
                    </Typography>
                  </div>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
