import React, { useEffect, useState } from 'react'
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import {
  fetchCartApi,
  incrementQuantityApi,
  decrementQuantityApi,
  removeFromCartApi,
  updateQuantityApi,
  clearCartApi,
} from '@/api/cart'
import { useCart } from '../../../hooks/cartHook'
import { ArrowRightAltOutlined, Close, ExpandMore } from '@mui/icons-material'
import { ToastContainer, toast } from 'react-toastify'
import { getPatientApi } from '@/api/order'
import { useAuth } from '@/hooks/auth'
import { useQuery } from 'react-query'
import {
  addDeliveryAddress,
  getDeliveryAddresses,
} from '@/api/deliveryAddresses'
import {
  AddDeliveryAddressRequest,
  GetAllDeliveryAddressesResponse,
} from 'pharmacy-common/types/deliveryAddress.types'
import { Box, Stack } from '@mui/system'
import { ApiForm } from '@/components/ApiForm'
import { AddDeliveryAddressValidator } from 'pharmacy-common/validators/deliveryAddress.validator'

// import { useParams } from 'react-router-dom'

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

type DeliveryAddress = GetAllDeliveryAddressesResponse[0]

const DeliveryAddressPopup = ({
  onSelect,
}: {
  onSelect: (address: DeliveryAddress) => void
}) => {
  const { user } = useAuth()

  const query = useQuery({
    queryKey: ['delivery-addresses'],
    queryFn: () => getDeliveryAddresses(user!.username),
  })

  if (query.isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Stack spacing={1}>
        {query.data?.length == 0 && (
          <Alert severity="info">
            No delivery addresses to choose from, add a new one.
          </Alert>
        )}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            Add new address
          </AccordionSummary>
          <AccordionDetails>
            <ApiForm<AddDeliveryAddressRequest>
              action={(data) => addDeliveryAddress(user!.username, data)}
              onSuccess={() => query.refetch()}
              fields={[
                { label: 'Address', property: 'address' },
                { label: 'City', property: 'city' },
                { label: 'Country', property: 'country' },
              ]}
              validator={AddDeliveryAddressValidator}
              successMessage="Address added successfully."
              noCard
            />
          </AccordionDetails>
        </Accordion>

        <FormControl>
          <RadioGroup
            onChange={(e) => {
              const chosen = Number(e.target.value)
              onSelect(query.data![chosen])
            }}
          >
            {query.data?.map((address, i) => (
              <FormControlLabel
                key={i}
                control={<Radio />}
                value={i}
                label={`${address.address}, ${address.city}, ${address.country}`}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Stack>
    </>
  )
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

  const [addressDialogOpen, setAddressDialogOpen] = useState(false)
  const [address, setAddress] = useState<DeliveryAddress>()
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

  const removeallitems = async () => {
    await clearCartApi()
    clearCartProvider()
  }

  // const patientID = useParams<{ id: string }>().id

  // console.log(patientID)
  // console.log(typeof(patientID))

  function calculateTwoDaysFromNow(): string {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 2) // Add 2 days

    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Month is zero-based, so we add 1 and format
    const day = String(currentDate.getDate()).padStart(2, '0')

    const formattedDate = `${year}-${month}-${day}`

    return formattedDate
  }

  const username = useAuth().user?.username

  async function getPatientId() {
    const response = await getPatientApi(username)
    const patientID = response.data.data._id

    return patientID
  }

  async function handleCheckOut() {
    if (cart.length === 0) {
      toast.error('Please add some items to your cart first!', {
        position: 'top-right',
      })
    } else {
      const patientID = await getPatientId()

      const total = totalPrice
      const date = calculateTwoDaysFromNow()

      const order = {
        patientID,
        total,
        date,
        address,
      }
      const jsonString = JSON.stringify(order)
      //navigate to checkout page
      window.location.href = `/patient-dashboard/medicines/checkout/${jsonString}`

      console.log('order', order)
    }
  }

  return (
    <>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={onClose}
        style={{ height: '100%' }}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Button variant="contained" onClick={removeallitems}>
          remove all items
        </Button>
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
                      disabled={item.byPrescription != null}
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
                      disabled={item.byPrescription != null}
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
                      disabled={item.byPrescription != null}
                    />
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() =>
                        decrementQuantity(item.medicine._id, item.quantity)
                      }
                      style={{ fontSize: 12 }}
                      disabled={item.byPrescription != null}
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

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              if (cart.length === 0) {
                toast.error('Please add some items to your cart first !', {
                  position: 'top-right',
                })
              } else {
                setAddressDialogOpen(true)
              }
            }}
          >
            Checkout
            <ArrowRightAltOutlined style={{ marginLeft: 20, fontSize: 40 }} />
          </Button>
        </div>
      </Drawer>

      <Dialog
        open={addressDialogOpen}
        onClose={() => {
          setAddressDialogOpen(false)
          setAddress(undefined)
        }}
      >
        <DialogTitle>Delivery Address</DialogTitle>
        <DialogContent>
          <DeliveryAddressPopup
            onSelect={(address) => {
              setAddress(address)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              if (!address) {
                toast.error('You have to choose a delivery address', {
                  position: 'top-right',
                })
              } else {
                console.log(address)
                setAddressDialogOpen(false)
                setAddress(address)
                handleCheckOut()
              }
            }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Cart
