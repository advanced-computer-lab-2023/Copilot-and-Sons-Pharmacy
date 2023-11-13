import { getAllOrders, cancelOrderApi } from '@/api/order'
import { Card, CardContent, Grid, Typography, Button } from '@mui/material'
import { useQuery } from 'react-query'
import { useAlerts } from '@/hooks/alerts'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

export default function AllOrders() {
  const [loading, setLoading] = useState(false)

  const alert = useAlerts()

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
  }

  console.log('Orders:', data?.data.data)

  const handleCancelOrder = (id: string) => async () => {
    try {
      setLoading(true)

      await cancelOrderApi(id)
      alert.addAlert({
        message: 'Order cancelled successfully',
        severity: 'success',
      })
      window.location.href = '/patient-dashboard/medicines/'
    } catch (err: any) {
      setLoading(false)
      console.log(err)
      alert.addAlert({
        message: err.message,
        severity: 'error',
      })
    }
  }

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
            <Button variant="contained" onClick={handleCancelOrder(order._id)}>
              Cancel Order
            </Button>
          </Card>
        </Grid>
      ))}
      {loading === true && <CircularProgress style={{ alignSelf: 'center' }} />}
    </Grid>
  )
}
