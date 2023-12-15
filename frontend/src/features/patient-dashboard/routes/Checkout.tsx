import { useParams } from 'react-router-dom'
import { addOrderApi } from '@/api/order'
import { useCart } from '@/hooks/cartHook'
import Button from '@mui/material/Button'
import { useState } from 'react'
import PaymentsIcon from '@mui/icons-material/Payments'
import PaymentIcon from '@mui/icons-material/Payment'
import StripCheckout from '../components/Checkout'
import { patchWallet } from '@/api/medicine'
import { useAlerts } from '@/hooks/alerts'
import CircularProgress from '@mui/material/CircularProgress'
import { CreditCard, Wallet } from '@mui/icons-material'
import { Card, CardContent, Typography } from '@mui/material'
import { DiscountedPrice } from '@/components/DiscountedPrice'
import { Container, Stack } from '@mui/system'

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('Cash')
  const alert = useAlerts()
  const { clearCartProvider } = useCart()
  const [loading, setLoading] = useState(false)

  const executeCheckout = async (order: any) => {
    try {
      setLoading(true)

      if (order.paymentMethod === 'Wallet') {
        await patchWallet(order.total)
      }

      await addOrderApi(order)
      clearCartProvider()

      //   toast.success('Your order has been sent successfully', {
      //     position: 'top-right',
      //   })
      alert.addAlert({
        message: 'Your order has been sent successfully',
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
      //   toast.error(err.message, {
      //     position: 'top-right',
      //   })
    }
  }

  const { jsonString } = useParams()
  const json = JSON.parse(jsonString!)

  return (
    <Container maxWidth="sm">
      <Stack
        display="flex"
        justifyContent="center"
        flexDirection="column"
        spacing={2}
      >
        <Card>
          <CardContent>
            <Stack justifyContent={'center'} alignItems={'center'}>
              <Typography
                textTransform={'uppercase'}
                color="text.secondary"
                variant="h3"
                style={{ alignSelf: 'center' }}
              >
                Total Price
              </Typography>

              <DiscountedPrice
                originalPrice={json.totalWithoutDiscount}
                discountedPrice={json.total}
                fontSize="4rem"
                discountFontSize="2rem"
                color="primary.main"
              />
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {loading === false && (
              <>
                {/* <Typography
                  textTransform={'uppercase'}
                  color="text.secondary"
                  variant="h3"
                  textAlign={'center'}
                  mb={2}
                >
                  Payment Method
                </Typography> */}

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: '30px',
                  }}
                >
                  <Button
                    variant={
                      paymentMethod === 'Cash' ? 'outlined' : 'contained'
                    }
                    onClick={() => setPaymentMethod('Cash')}
                    startIcon={<PaymentsIcon />}
                    size="large"
                  >
                    Cash
                  </Button>
                  <Button
                    variant={
                      paymentMethod === 'Wallet' ? 'outlined' : 'contained'
                    }
                    onClick={() => setPaymentMethod('Wallet')}
                    startIcon={<Wallet />}
                    size="large"
                  >
                    Wallet
                  </Button>
                  <Button
                    variant={
                      paymentMethod === 'Credit card' ? 'outlined' : 'contained'
                    }
                    onClick={() => setPaymentMethod('Credit card')}
                    startIcon={<CreditCard />}
                    size="large"
                  >
                    Credit card
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card
          sx={{
            backgroundColor: '#fff',
          }}
        >
          <CardContent>
            {paymentMethod !== 'Credit card' && (
              <Button
                variant="contained"
                onClick={() => {
                  json.paymentMethod = paymentMethod
                  executeCheckout(json)
                }}
                fullWidth
                size="large"
              >
                Pay
                {paymentMethod === 'Cash' && (
                  <PaymentsIcon style={{ marginLeft: '10px' }} />
                )}
                {paymentMethod === 'Wallet' && (
                  <PaymentIcon style={{ marginLeft: '10px' }} />
                )}
              </Button>
            )}
            {paymentMethod === 'Credit card' && (
              <StripCheckout
                handleSubmitCustom={() => {
                  json.paymentMethod = 'Credit card'
                  executeCheckout(json)
                }}
              />
            )}
          </CardContent>
        </Card>

        {loading === true && (
          <CircularProgress style={{ alignSelf: 'center' }} />
        )}
      </Stack>
    </Container>
  )
}

export default Checkout
