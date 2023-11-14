import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActions, Button, Paper } from '@mui/material'
import IMedicine from '../types/medicine.type'
import { Link } from 'react-router-dom'
import { UserType } from 'pharmacy-common/types/user.types'
import { OnlyAuthenticated } from './OnlyAuthenticated'
import { Stack } from '@mui/system'
import { addToCartApi } from '@/api/cart'
import { useCart } from '@/hooks/cartHook'
import { ToastContainer, toast } from 'react-toastify'

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
      toast.warning(
        <Paper>
          <h4>This medicine requires a prescription.</h4>
          <div style={{ marginTop: '8px' }}>
            <Button
              variant="outlined"
              fullWidth
              color="success"
              style={{ marginBottom: '10px' }}
              onClick={handlePrescriptionClick}
            >
              Have Prescription
            </Button>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={() => toast.dismiss()}
            >
              Close
            </Button>
          </div>
        </Paper>,
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      )

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

export default function MedicineCard(props: { medicine: IMedicine }) {
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
        <Typography gutterBottom variant="h5" component="div">
          {props.medicine.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description :{props.medicine.description}
          <br />
          Medical Use: {props.medicine.medicinalUse.join(', ')}
          <br />
          Active Ingrediants:{props.medicine.activeIngredients.join(', ')}
          <br />
          price: {props.medicine.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Stack direction="row" spacing={2}>
          <OnlyAuthenticated requiredUserType={UserType.Patient}>
            <BuyButton medicine={props.medicine} />
          </OnlyAuthenticated>
          <OnlyAuthenticated requiredUserType={UserType.Pharmacist}>
            <Link
              to={`/pharmacist-dashboard/medicines/editMedicine/${props.medicine.name}`}
            >
              <Button color="secondary" disabled={false} variant="contained">
                Edit
              </Button>
            </Link>
          </OnlyAuthenticated>
        </Stack>
      </CardActions>
    </Card>
  )
}

function handlePrescriptionClick(): void {
  console.log('User has prescription')
  toast.dismiss()
  toast.error('Sorry we can not accept a prescription now', {
    position: 'top-right',
  })
}
