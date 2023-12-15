import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActions, Button, IconButton, TextField, Chip } from '@mui/material'
import IMedicine from '../types/medicine.type'
import { Link } from 'react-router-dom'
import { UserType } from 'pharmacy-common/types/user.types'
import { OnlyAuthenticated } from './OnlyAuthenticated'
import { Box, Stack } from '@mui/system'
import { addToCartApi } from '@/api/cart'
import { useCart } from '@/hooks/cartHook'
import { ToastContainer, toast } from 'react-toastify'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { archiveMedicineApi, unarchiveMedicineApi } from '@/api/medicine'
import { DetailsCard } from './DetailsCard'
import {
  Archive,
  CurrencyPound,
  Edit,
  Healing,
  Medication,
  MedicationOutlined,
} from '@mui/icons-material'

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
  const { addToCartProvider } = useCart()

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
      toast.success('Added to cart!', {
        position: 'top-right',
      })
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
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={props.medicine.Image}
        alt=""
      />
      <CardContent>
        <ToastContainer />
        <Stack direction="row" justifyContent="space-between">
          <Typography gutterBottom variant="h5" component="div">
            {props.medicine.name}
          </Typography>
          {props.medicine.quantity == 0 && (
            <Chip color="error" label="Out of stock" />
          )}
        </Stack>
        <Typography variant="body1" color="text.secondary">
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
              value: props.medicine.price,
              icon: <CurrencyPound />,
            },
          ]}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Stack direction="row" spacing={2}>
          <OnlyAuthenticated requiredUserType={UserType.Patient}>
            {props.medicine.quantity != 0 && (
              <BuyButton medicine={props.medicine} />
            )}

            {props.medicine.quantity == 0 && (
              <Link
                to={`/patient-dashboard/medicines/view-alternative-medicine/${props.medicine._id}`}
              >
                <Button color="primary" variant="contained">
                  view alternatives
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
            >
              Add to Prescription
            </Button>
          </OnlyAuthenticated>
        </Stack>
      </CardActions>
    </Card>
  )
}

// function handlePrescriptionClick(): void {
//   console.log('User has prescription')
//   toast.dismiss()
//   toast.error('Sorry we can not accept a prescription now', {
//     position: 'top-right',
//   })
// }
