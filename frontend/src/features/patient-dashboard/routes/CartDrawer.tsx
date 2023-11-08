import React, { useEffect } from 'react'
import {
  Drawer,
  Button,
  IconButton,
  CardActions,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
} from '@mui/material'
import {
  fetchCartApi,
  incrementQuantityApi,
  decrementQuantityApi,
  removeFromCartApi,
  updateQuantityApi,
} from '@/api/cart'
import { useCart } from '../../../providers/cartProvider'
import { ArrowRightAltOutlined, Close } from '@mui/icons-material'
import { ToastContainer, toast } from 'react-toastify'

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    removeFromCartProvider,
    totalPrice,
    incrementQuantityProvider,
    updateQuantityProvider,
    decrementQuantityProvider,
    addToCartProvider,
    clearCartProvider,
  } = useCart()

  useEffect(() => {
    viewCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fetch the cart data from the backend when the component mounts
  async function viewCart() {
    const response = await fetchCartApi()
    const cartData = response.data.data
    clearCartProvider()
    cartData.forEach((item: any) => addToCartProvider(item))
  }

  const removeFromCart = async (productId: any) => {
    removeFromCartProvider(productId)
    await removeFromCartApi(productId)
  }

  const incrementQuantity = async (medicine: any, quantity: number) => {
    if (medicine.quantity < quantity + 1)
      toast.error('There is not enough stock for This product!', {
        position: 'top-right',
      })
    else {
      incrementQuantityProvider(medicine._id)
      await incrementQuantityApi(medicine._id, quantity)
    }
  }

  const decrementQuantity = async (productId: any, quantity: number) => {
    if (quantity == 1) removeFromCart(productId)
    else {
      decrementQuantityProvider(productId)
      await decrementQuantityApi(productId, quantity)
    }
  }

  const updateQuantity = async (medicine: any, newQuantity: number) => {
    if (isNaN(newQuantity)) return

    if (newQuantity < 1) {
      toast.error('Quantity cannot be less than 1', {
        position: 'top-right',
      })

      return
    }

    if (medicine.quantity < newQuantity) {
      toast.error('There is not enough stock for This product!', {
        position: 'top-right',
      })

      return
    }

    updateQuantityProvider(medicine._id, newQuantity)
    await updateQuantityApi(medicine._id, newQuantity)
  }

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      style={{ height: '100%' }}
    >
      <IconButton color="primary" onClick={onClose} style={{ right: 150 }}>
        <Close />
      </IconButton>
      <ToastContainer />
      <div style={{ width: 350 }}>
        <Grid container spacing={2} style={{ overflow: 'auto', height: 590 }}>
          {cart.map((item: any) => (
            <Grid item xs={12} key={item.medicine._id}>
              <Card style={{ margin: 25 }}>
                <CardContent>
                  <img
                    src={item.medicine.Image}
                    alt={item.medicine.name}
                    style={{ width: 100, height: 100 }}
                  />
                  <Typography variant="h5" style={{ fontSize: 16 }}>
                    {item.medicine.name}
                  </Typography>
                  <Typography variant="body2" style={{ fontSize: 14 }}>
                    ${item.medicine.price * item.quantity}
                  </Typography>
                  <Typography variant="body2" style={{ fontSize: 12 }}>
                    Quantity: {item.quantity}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => removeFromCart(item.medicine._id)}
                    style={{ fontSize: 12 }}
                  >
                    Remove
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() =>
                      incrementQuantity(item.medicine, item.quantity)
                    }
                    style={{ fontSize: 12 }}
                  >
                    +
                  </Button>
                  <TextField
                    type="text"
                    label="Qty"
                    onBlur={(e) =>
                      updateQuantity(
                        item.medicine,
                        parseInt(e.target.value, 10)
                      )
                    }
                    size="small"
                    variant="outlined"
                    style={{ marginLeft: 10 }}
                    InputProps={{
                      style: { fontSize: 11 },
                    }}
                  />
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() =>
                      decrementQuantity(item.medicine._id, item.quantity)
                    }
                    style={{ fontSize: 12 }}
                  >
                    -
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                style={{ fontWeight: 'bold' }}
              >
                EGP {totalPrice.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Button variant="contained" color="primary" fullWidth>
          Checkout{' '}
          <ArrowRightAltOutlined style={{ marginLeft: 20, fontSize: 40 }} />
        </Button>
      </div>
    </Drawer>
  )
}

export default Cart
