import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Button, Box } from "@mui/material";



export default function MedicineCard(props: { medicine: { Image: string | undefined; name: string , price:number,description:string,medicinalUse:[string] }; }) {
  return (
    <Card sx={{ maxWidth: 300,minWidth:300 , height: "370px"} }>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.medicine.Image}
          
          alt=""
        />
        <CardContent>
        <Box display="flex" justifyContent="center" width="100%">
          <Typography gutterBottom variant="h5" component="div">
            {props.medicine.name}
          </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{  height: "70px"}} >
          Description :{ props.medicine.description}
          <br/>
          Medical Use: {props.medicine.medicinalUse.join(', ')}
          <br/>
          price: {props.medicine.price}
   
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box display="flex" justifyContent="center" width="100%">
          <Button
            color="primary"
            disabled={false}
            size="small"
            variant="contained"
          >
            Buy
          </Button>
        </Box>
      </CardActions>
   </Card>
  );
}
