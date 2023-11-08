import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActions, Button } from '@mui/material'
import IMedicine from '../types/medicine.type'
import { Link } from 'react-router-dom'
import { UserType } from 'pharmacy-common/types/user.types'
import { OnlyAuthenticated } from './OnlyAuthenticated'
import { Stack } from '@mui/system'
import { addToCartApi } from '@/api/cart'
import { useCart } from '@/providers/cartProvider'
import { ToastContainer, toast } from 'react-toastify'

export default function MedicineCard(props: { medicine: IMedicine }) {
  const { addToCartProvider } = useCart()

  async function buy(medicine: any) {
    const item = {
      medicine,
      quantity: 1,
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
            <Button
              color="primary"
              disabled={false}
              variant="contained"
              onClick={() => buy(props.medicine)}
            >
              Add to Cart
            </Button>
          </OnlyAuthenticated>
          <OnlyAuthenticated requiredUserType={UserType.Pharmacist}>
            <Link to={`editMedicine/${props.medicine.name}`}>
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
