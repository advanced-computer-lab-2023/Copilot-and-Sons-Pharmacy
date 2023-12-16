import { getAllOrders, cancelOrderApi } from '@/api/order'
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  CardActions,
  Link,
} from '@mui/material'
import { useQuery } from 'react-query'
import { useAlerts } from '@/hooks/alerts'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { AlertsBox } from '@/components/AlertsBox'
import { CardPlaceholder } from '@/components/CardPlaceholder'
import { faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

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

  console.log(data?.data.data)

  function getStatusColor(status: string) {
    switch (status) {
      case 'delivered':
        return 'rgb(20, 168, 0)'
      case 'pending':
        return '#FFBE00'
      case 'cancelled':
        return 'red'
      default:
        return 'black'
    }
  }

  return (
    <Grid container spacing={2}>
      {data?.data.data?.map((order: OrderType) => (
        <Grid item xs={12} sm={6} md={6} key={order._id}>
          <Card
            sx={{ backgroundColor: 'background.default', borderRadius: '17px' }}
          >
            <CardContent>
              <Typography variant="h6">
                Order ID <span style={{ fontWeight: 'bold' }}>{order._id}</span>
              </Typography>

              <div style={{ display: 'flex', justifyContent: 'start' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    flexDirection: 'column',
                  }}
                >
                  <FontAwesomeIcon
                    icon={faMoneyCheckAlt}
                    style={{
                      color: 'gray',
                      fontSize: '40px ',
                      paddingBottom: '8px',
                    }}
                  />

                  <Typography variant="body1"> {order.total} EGP</Typography>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems:
                      order.status === 'pending' ? 'flex-start' : 'start',
                    padding: order.status === 'pending' ? '0px' : '25px',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="body1">
                    Paid using {order.paymentMethod}
                  </Typography>
                  <Typography variant="body1">
                    Delivered to {order.address.address} , {order.address.city}{' '}
                    , {order.address.country}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ color: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </Typography>
                  <Typography variant="body1">
                    At {new Date(order.createdAt).toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="green">
                    {order.status === 'pending' &&
                      'Order price will be refunded to your wallet upon cancelling'}
                  </Typography>
                </div>
              </div>

              <CardActions
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  alignItems: 'start',
                }}
              >
                <Link
                  href={`/patient-dashboard/viewOrder/${order._id}`}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '17px',
                    color: 'gray',
                  }}
                >
                  <span>View More Details</span>
                  <ArrowForwardIcon
                    style={{ fontSize: '17px', marginLeft: '5px' }}
                  />
                </Link>
                {order.status === 'pending' && (
                  <Button
                    onClick={handleCancelOrder(order._id)}
                    style={{
                      padding: 0,
                      textTransform: 'none',
                      marginTop: '2px',
                      marginBottom: '0',
                    }}
                  >
                    <Typography variant="button" style={{ color: 'red' }}>
                      Cancel Order
                    </Typography>
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
