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
            <Button color="primary" disabled={false} variant="contained">
              Buy
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
