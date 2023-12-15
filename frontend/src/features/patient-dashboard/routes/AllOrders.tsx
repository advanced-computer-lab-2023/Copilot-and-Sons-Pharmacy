import { getAllOrders, cancelOrderApi } from '@/api/order'
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  CardActions,
} from '@mui/material'
import { useQuery } from 'react-query'
import { useAlerts } from '@/hooks/alerts'
import { useState } from 'react'

import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { AlertsBox } from '@/components/AlertsBox'
import { CardPlaceholder } from '@/components/CardPlaceholder'

export default function AllOrders() {
  const [loading, setLoading] = useState(false)

  const alert = useAlerts()

  const query = useQuery({
    queryKey: 'allOrders',
    queryFn: getAllOrders,
  })

  if (query.isLoading) {
    return <CardPlaceholder />
  }

  const data = query.data

  if (data == null) {
    return <AlertsBox />
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

  const handleCancelOrder = (id: string) => async () => {
    try {
      setLoading(true)

      await cancelOrderApi(id).then(() => query.refetch())
      alert.addAlert({
        message: 'Order cancelled successfully',
        severity: 'success',
      })
    } catch (err: any) {
      setLoading(false)
      console.log(err)
      alert.addAlert({
        message: err.message,
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid container spacing={2}>
      {data?.data.data?.map((order: OrderType) => (
        <Grid item xs={17} sm={6} md={4} key={order._id}>
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
              <Typography variant="caption" color="green">
                {order.status === 'pending' &&
                  'Wallet or credit payments will be refunded to your wallet upon cancelling'}
              </Typography>
              <CardActions>
                <Link to={`/patient-dashboard/viewOrder/${order._id}`}>
                  <Button variant="contained" color="primary" size="small">
                    View Order
                  </Button>
                </Link>
                {order.status === 'pending' && (
                  <Button
                    variant="contained"
                    onClick={handleCancelOrder(order._id)}
                    style={{ marginLeft: 'auto' }}
                    size="small"
                  >
                    Cancel Order
                  </Button>
                )}
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      ))}
      {loading === true && <CircularProgress style={{ alignSelf: 'center' }} />}
    </Grid>
  )
}
