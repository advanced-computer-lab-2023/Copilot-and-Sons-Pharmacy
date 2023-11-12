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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>
        Total price: <span style={{ color: 'red' }}>{json.total}</span>
      </h1>

      {loading === false && (
        <>
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
              variant={paymentMethod === 'Cash' ? 'outlined' : 'contained'}
              onClick={() => setPaymentMethod('Cash')}
            >
              Cash
            </Button>
            <Button
              variant={paymentMethod === 'Wallet' ? 'outlined' : 'contained'}
              onClick={() => setPaymentMethod('Wallet')}
            >
              Wallet
            </Button>
            <Button
              variant={
                paymentMethod === 'Credit card' ? 'outlined' : 'contained'
              }
              onClick={() => setPaymentMethod('Credit card')}
            >
              Credit card
            </Button>
          </div>
          {paymentMethod !== 'Credit card' && (
            <Button
              variant="contained"
              style={{ marginTop: '70px', color: 'white', alignSelf: 'center' }}
              onClick={() => {
                json.paymentMethod = paymentMethod
                executeCheckout(json)
              }}
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
        </>
      )}
      {loading === true && <CircularProgress style={{ alignSelf: 'center' }} />}
    </div>
  )
}

export default Checkout
