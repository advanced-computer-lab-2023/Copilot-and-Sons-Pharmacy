import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {
  CardActions,
  Button,
  IconButton,
  TextField,
  Backdrop,
  Chip,
} from '@mui/material'
import IMedicine from '../types/medicine.type'
import { Link } from 'react-router-dom'
import { UserType } from 'pharmacy-common/types/user.types'
import { OnlyAuthenticated } from './OnlyAuthenticated'
import { Box, Stack } from '@mui/system'
import { addToCartApi } from '@/api/cart'
import { useCart } from '@/hooks/cartHook'
import { toast } from 'react-toastify'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { archiveMedicineApi, unarchiveMedicineApi } from '@/api/medicine'
import { useAuth } from '@/hooks/auth'
import {
  Archive,
  CurrencyPound,
  Edit,
  Healing,
  Masks,
  Medication,
  MedicationOutlined,
  ShoppingCart,
} from '@mui/icons-material'
import { DetailsCard } from './DetailsCard'
import { DiscountedPrice } from './DiscountedPrice'

function handleArchive(medicinename: string) {
  return async () => {
    try {
      await archiveMedicineApi(medicinename)
      toast.success('Archived Successfully!', {
        position: 'top-right',
      })
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (e: any) {
      toast.error(e.message, {
        position: 'top-right',
      })
    }
  }
}

function handleUnarchive(medicinename: string) {
  return async () => {
    try {
      await unarchiveMedicineApi(medicinename)
      toast.success('Unarchived Successfully!', {
        position: 'top-right',
      })
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (e: any) {
      toast.error(e.message, {
        position: 'top-right',
      })
    }
  }
}

function BuyButton(props: { medicine: IMedicine }) {
  const { addToCartProvider, setCartOpen } = useCart()

  async function buy(medicine: any) {
    const item = {
      medicine,
      quantity: 1,
    }

    if (medicine.requiresPrescription) {
      const prescriptionButton = document.createElement('button')
      prescriptionButton.textContent = 'Have Prescription'
      prescriptionButton.addEventListener('click', () => {
        console.log('User has prescription')
      })
      // toast.warning(
      //   <Paper>
      //     <h4>This medicine requires a prescription.</h4>
      //     <div style={{ marginTop: '8px' }}>
      //       <Button
      //         variant="outlined"
      //         fullWidth
      //         color="success"
      //         style={{ marginBottom: '10px' }}
      //         onClick={handlePrescriptionClick}
      //       >
      //         Have Prescription
      //       </Button>
      //       <Button
      //         variant="outlined"
      //         color="error"
      //         fullWidth
      //         onClick={() => toast.dismiss()}
      //       >
      //         Close
      //       </Button>
      //     </div>
      //   </Paper>,
      //   {
      //     position: toast.POSITION.TOP_RIGHT,
      //   }
      // )
      toast.error('This medicine requires a prescription.', {
        position: 'top-right',
      })

      return
    }

    try {
      await addToCartApi(medicine._id, 1)
      toast.success(
        <>
          Added to your cart!{' '}
          <Button color="success" onClick={() => setCartOpen(true)}>
            View Cart
          </Button>
        </>,
        {
          position: 'top-right',
        }
      )
      addToCartProvider(item)
    } catch (e) {
      toast.error('There is not enough stock for this product!', {
        position: 'top-right',
      })
    }
  }

  return (
    <Button
      color="primary"
      disabled={false}
      variant="contained"
      onClick={() => buy(props.medicine)}
      startIcon={<ShoppingCart />}
    >
      Add to Cart
    </Button>
  )
}

// async function addToPrescription(medicinename: string) {
//   try {
//     await addtoPrescriptionApi(medicinename)
//     toast.success('Added to Prescription!', {
//       position: 'top-right',
//     })
//   } catch (e: any) {
//     toast.error(e.message, {
//       position: 'top-right',
//     })
//   }
// }

export default function MedicineCard(props: {
  medicine: IMedicine
  onAddToPrescription?: (medicine: {
    name: string
    quantity: number
    dosage: string
  }) => void
}) {
  const [quantity, setQuantity] = useState(1)
  const [dosage, setDosage] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const auth = useAuth()
  const userType = auth.user?.type

  const Overlay = () => (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isOpen}
      onClick={() => setIsOpen(false)}
    >
      <Card
        sx={{
          maxWidth: 400,
          margin: 'auto',
          borderRadius: 2,
        }}
      >
        <CardContent>
          <img
            src={props.medicine.Image}
            alt=""
            style={{ width: '100%', height: 'auto' }}
          />
          <Typography
            variant="h5"
            style={{ fontWeight: 'bold' }}
            color="primary.main"
            textAlign="center"
          >
            {props.medicine.name}
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            {props.medicine.description}
          </Typography>

          <Box height={30} />

          <DetailsCard
            noCard
            fields={[
              {
                label: 'Medical Uses',
                value: props.medicine.medicinalUse.join(', '),
                icon: <MedicationOutlined />,
              },
              {
                label: 'Main Active Ingredient',
                value: props.medicine.activeIngredients[0],
                icon: <Medication />,
              },
              {
                label: 'Active Ingredients',
                value: props.medicine.activeIngredients.slice(1).join(', '),
                icon: <Healing />,
              },
              {
                label: 'Price',
                value: (
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <DiscountedPrice
                      originalPrice={props.medicine.price}
                      discountedPrice={props.medicine.discountedPrice}
                    />

                    {props.medicine.quantity == 0 && (
                      <Chip color="error" label="Out of stock" />
                    )}
                  </Stack>
                ),
                icon: <CurrencyPound />,
              },
              {
                label: 'Requires Prescription',
                value: props.medicine.requiresPrescription ? 'Yes' : 'No',
                icon: <Masks />,
              },
            ]}
          />
        </CardContent>
      </Card>
    </Backdrop>
  )

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToPrescription = () => {
    if (!dosage || dosage === '' || dosage.trim() === '') {
      toast.error('Please enter dosage', {
        position: 'top-right',
      })

      return
    }

    if (props.onAddToPrescription) {
      const medicineToAdd = {
        name: props.medicine.name,
        quantity,
        dosage,
      }
      props.onAddToPrescription(medicineToAdd)
    }

    setDosage('')
    setQuantity(1)
  }

  return (
    <>
      <Card
        sx={{
          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
          transition: 'box-shadow 0.3s',
          border: '1px solid #ccc',
          height: userType === UserType.Doctor ? 440 : 380,
          position: 'relative',
          '&:hover': {
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        <CardContent
          onClick={() => setIsOpen(true)}
          style={{ padding: '20px', textAlign: 'center' }}
        >
          <CardMedia
            component="img"
            height="150"
            image={props.medicine.Image}
            alt="medicine image"
            style={{ marginBottom: '20px' }}
          />
          <Typography
            mt={2}
            textAlign="center"
            variant="h5"
            style={{ fontWeight: 'bold' }}
            color="primary.main"
          >
            {props.medicine.name}
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
            justifyContent="center"
          >
            <DiscountedPrice
              originalPrice={props.medicine.price}
              discountedPrice={props.medicine.discountedPrice}
              fontSize="23px"
              // fontWeight="bold"
            />

            {props.medicine.quantity == 0 && (
              <Chip color="error" label="Out of stock" />
            )}
          </Stack>

          {props.medicine.requiresPrescription && (
            <Chip
              sx={{ mt: 1 }}
              color="warning"
              label="Requires Prescription"
            />
          )}
        </CardContent>
        <CardActions
          sx={{
            position: 'absolute', // Set position to absolute for absolute positioning
            bottom: 10, // Position the buttons at the bottom
            width: '100%', // Make the buttons take the full width
            justifyContent: 'center', // Center the buttons horizontally
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Add a semi-transparent white background to the buttons
            padding: '10px', // Add some padding to the buttons
          }}
        >
          <Stack direction="row" spacing={2}>
            <OnlyAuthenticated requiredUserType={UserType.Patient}>
              {props.medicine.quantity != 0 && (
                <BuyButton medicine={props.medicine} />
              )}

              {props.medicine.quantity == 0 && (
                <Link
                  to={`/patient-dashboard/medicines/view-alternative-medicine/${props.medicine._id}`}
                >
                  <Button
                    color="primary"
                    variant="contained"
                    startIcon={<Medication />}
                  >
                    View Alternatives
                  </Button>
                </Link>
              )}
            </OnlyAuthenticated>
            <OnlyAuthenticated requiredUserType={UserType.Pharmacist}>
              <Link
                to={`/pharmacist-dashboard/medicines/editMedicine/${props.medicine.name}`}
              >
                <Button
                  color="secondary"
                  disabled={false}
                  variant="contained"
                  startIcon={<Edit />}
                >
                  Edit
                </Button>
              </Link>
              {props.medicine.status === 'unarchived' && (
                <Button
                  color="secondary"
                  disabled={false}
                  variant="contained"
                  onClick={handleArchive(props.medicine.name)}
                  startIcon={<Archive />}
                >
                  Archive
                </Button>
              )}
              {props.medicine.status === 'archived' && (
                <Button
                  color="secondary"
                  disabled={false}
                  variant="contained"
                  onClick={handleUnarchive(props.medicine.name)}
                  startIcon={<Archive />}
                >
                  Unarchive
                </Button>
              )}
            </OnlyAuthenticated>
            <OnlyAuthenticated requiredUserType={UserType.Doctor}>
              <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <IconButton onClick={handleDecrementQuantity}>
                  <RemoveIcon />
                </IconButton>
                <span>{quantity}</span>
                <IconButton onClick={handleIncrementQuantity}>
                  <AddIcon />
                </IconButton>

                <TextField
                  label="Dosage"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  variant="outlined"
                />
                <Button
                  color="secondary"
                  disabled={false}
                  variant="contained"
                  onClick={() => handleAddToPrescription()}
                  style={{ marginTop: '10px' }}
                >
                  Add to Prescription
                </Button>
              </div>
            </OnlyAuthenticated>
          </Stack>
        </CardActions>
      </Card>
      <Overlay />
    </>
  )
}

// function handlePrescriptionClick(): void {
//   console.log('User has prescription')
//   toast.dismiss()
//   toast.error('Sorry we can not accept a prescription now', {
//     position: 'top-right',
//   })
// }
