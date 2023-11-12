import { getAllOrders } from '@/api/order'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { useQuery } from 'react-query'

export default function AllOrders() {
  const { data, error, isLoading } = useQuery('allOrders', getAllOrders)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    console.log(error)

    return <p>Error fetching orders</p>
  }

  type OrderType = {
    _id: string
    total: number
    status: string
    createdAt: string
    paymentMethod: string
    address: {
      address: string
      city: string
      country: string
    }
    // Add other properties as needed
  }

  console.log('Orders:', data?.data.data)

  return (
    <Grid container spacing={2}>
      {data?.data.data?.map((order: OrderType) => (
        <Grid item xs={12} sm={6} md={4} key={order._id}>
          <Card>
            <CardContent>
              <Typography variant="h6">Order ID: {order._id}</Typography>
              <Typography variant="body2">Total: {order.total}</Typography>
              <Typography variant="body2">Status: {order.status}</Typography>
              <Typography variant="body2">
                Payment Method: {order.paymentMethod}
              </Typography>
              <Typography variant="body2">
                Adress: {order.address.address} , {order.address.city} ,{' '}
                {order.address.country}{' '}
              </Typography>
              <Typography variant="body2">
                Created At: {new Date(order.createdAt).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
