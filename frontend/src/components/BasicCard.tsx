import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function BasicCard(props: { medicine: { name: string,quantity:number,sales:number  }; }) {
  return (
    <Card sx={{ minWidth: 275,maxWidth:300 }}>
      <CardContent>
      <Typography gutterBottom variant="h5" component="div">
            {props.medicine.name}
          </Typography>
        <Typography variant="h5" component="div">
         Available quantity : {props.medicine.quantity}
        </Typography>
        <Typography variant="h5" component="div">
        Sales : {props.medicine.sales}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View More</Button>
      </CardActions>
    </Card>
  );
}
