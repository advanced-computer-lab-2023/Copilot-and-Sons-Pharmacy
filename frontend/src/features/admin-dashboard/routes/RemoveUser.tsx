import 'react-toastify/dist/ReactToastify.css';
import { useRemoveUser } from "../../../api/admin.ts";
import { useFormik } from 'formik'
import * as Yup from 'yup';
import {
    TextField,
    Button,
    Container,
    Typography,
    Grid,
    Box,
  } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { Mutation } from 'react-query';


interface IdeleteData {
   username:string
}


export function RemoveUser (){

    //calling the custom useRemoveUser hook to return the mutation from
    const mutation = useRemoveUser();

  const handleRemoveUser = ({username}:String) => {
    // Call the mutation function with the username you want to delete
    console.log(username);
    mutation.mutateAsync(username).then(()=>{toast.success('User deleted Successfuly!', {
        position: 'top-right',
      })}).catch((err)=>{toast.error(`couldn't delete user ${err}`, {
        position: 'top-right',
      })})
    
    
    

  };
  

  const initialValues:IdeleteData = {username: ""};
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
  });

  let formik = useFormik<any>({
    initialValues,
    validationSchema,
    onSubmit:handleRemoveUser
  });

  return <>
               <Container maxWidth="sm">
    <Box sx={{ marginTop: 4 }}>
    <ToastContainer />
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h4" align="center" gutterBottom>
          Remove Pharmacist or Patient
        </Typography>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

        {formik.errors.username && formik.touched.username?<div color='red' >{formik.errors.username}</div>:""}

        </Grid>

        </Grid>
        <Button
       sx={{ marginTop: '20px' }}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
     
        >
        DELETE USER
        </Button>

      </form>
    </Box>
    </Container> 

  </>
    
}