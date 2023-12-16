import { getAllOrders, getPatientApi } from '@/api/order'
import { CardPlaceholder } from '@/components/CardPlaceholder'
import { useAuth } from '@/hooks/auth'
import { Copyright } from '@mui/icons-material'
import { Button, Grid, Paper, Table, TableCell, TableRow } from '@mui/material'
import { Container } from '@mui/system'
import { useQuery } from 'react-query'
import Deposits from '../components/Deposits'
import { AllChats } from '@/components/chats/AllChats'
import Title from '../components/Title'
import { Link } from 'react-router-dom'
import { viewPatientInfo } from '@/api/patient'

export function PatientDashboardHome() {
  const { user } = useAuth()

  const patientQuery = useQuery({
    queryKey: ['patient', user!.username],
    queryFn: () => getPatientApi(user!.username),
    enabled: !!user,
  })

  const queryApi = useQuery({
    queryKey: ['patientapi', user?.username],
    queryFn: () => viewPatientInfo(user!.modelId),
  })

  console.log('patient', queryApi)

  const orderQuery = useQuery({
    queryKey: 'allOrders',
    queryFn: getAllOrders,
  })

  if (patientQuery.isLoading) {
    return <CardPlaceholder />
  }

  const filteredOrders = orderQuery.data?.data.data?.filter(
    (order: any) => order.status === 'pending'
  )
  console.log(filteredOrders)

  return (
    <>
      <div>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid
            container
            spacing={4}
            justifyContent="center"
            paddingBottom={4}
            paddingRight={6}
          >
            <Grid item xs={12} md={4} lg={4}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 310,
                  borderRadius: '17px',
                  color: 'white ',
                  bgcolor: 'primary.main',
                }}
              >
                <Deposits wallet={patientQuery?.data?.data.data.walletMoney} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Paper
                sx={{
                  paddingX: 2,
                  paddingY: 1,
                  height: 310,
                  borderRadius: '17px',
                  overflow: 'auto',
                  width: '100%',
                  scrollbarWidth: 'thin', // For Firefox
                  '&::-webkit-scrollbar': {
                    width: '0em', // Set the width of the scrollbar
                  },
                }}
              >
                <AllChats />
              </Paper>
            </Grid>
          </Grid>

          {/* Recent Orders */}
          <Grid
            item
            xs={12}
            paddingLeft={0}
            justifyContent="center"
            paddingBottom={4}
            paddingRight={6}
          >
            <Paper
              sx={{
                m: 0,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderRadius: '17px',
              }}
            >
              <Title>Pending Orders</Title>
              <Table>
                <TableRow>
                  <TableCell>
                    <strong>Order Id</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Total</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Payment Method</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Address</strong>
                  </TableCell>
                  <TableCell>
                    <strong>City</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Country</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Created At</strong>
                  </TableCell>
                </TableRow>
                {filteredOrders?.map((order: any) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.total} E£</TableCell>

                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>{order.address.address}</TableCell>
                    <TableCell>{order.address.city}</TableCell>
                    <TableCell>{order.address.country}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleTimeString([], {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </TableCell>

                    <TableCell>
                      <Link to={`/patient-dashboard/viewOrder/${order._id}`}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          View Order
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </Table>
            </Paper>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </div>
    </>
  )
}
