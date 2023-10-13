import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import {
    TextField,
    Button,
    Container,
    Typography,
    Grid,
    Box,
    Alert
  } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useAddMedicineService } from '../../../api/medicine';
import { IMedicine } from '../../../../../backend/src/app/schemas/medicine.model';
// import { IMedicine } from '../../../../../backend/src/app/schemas/medicine.model';


 interface newMedicine{
    name: string;
    price: number;
    description: string;
    quantity: number;
    Image: string;
    activeIngredients: string;
    medicinalUse: string;
    sales: number;
  }

export function AddMedicine (){

    //calling the custom useRemoveUser hook to return the mutation from
    const mutation = useAddMedicineService();

  const handleAddNewMedicine = (Medicine:newMedicine) => {
    // Call the mutation function with the username you want to delete
    const newMedicine:IMedicine = {
        name: Medicine.name,
        price: Number(Medicine.price),
        description: Medicine.description,
        quantity: Number(Medicine.quantity),
        Image: Medicine.Image,
        activeIngredients: Medicine.activeIngredients.split(", "),
        medicinalUse: Medicine.medicinalUse.split(", "),
        sales:0
    }
    mutation.mutateAsync(newMedicine).then(()=>{toast.success('Medicine Added Successfuly!', {
        position: 'top-right',
      })}).catch((err)=>{toast.error(`couldn't add medicine , there is already a medicine with this name`, {
        position: 'top-right',
      })})
  };
  

  const initialValues:newMedicine = {name: "", price:0 , description: "" , quantity: 0, Image: "", activeIngredients: "", medicinalUse:"", sales:0};
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    price: Yup.number().required('price is required').min(1, "Price cannot be less than 1"),
    description: Yup.string().required('description is required'),
    quantity: Yup.number().required('quantity is required').min(1, "quantity cannot be less than 1"),
    Image: Yup.string().required('Image is required'),
    activeIngredients: Yup.string().required('activeIngredients is required').matches(/^(?!.*\s,)[^,]*(, [^,]+)*$/, 'Input must be in the form "a, b, c, d, e, f" with spaces after commas'),
    medicinalUse: Yup.string().required('medicinalUse is required').matches(/^(?!.*\s,)[^,]*(, [^,]+)*$/, 'Input must be in the form "a, b, c, d, e, f" with spaces after commas'),
  });

  let formik = useFormik<any>({
    initialValues,
    validationSchema,
    onSubmit:handleAddNewMedicine
  });

  return <>
      <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add New Medicine
        </Typography>
        <ToastContainer />
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            {formik.errors.name && formik.touched.name?<Alert severity="warning">{formik.errors.name}</Alert>:""}

            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                    value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText= "please enter numbers only"
              />
            {formik.errors.price && formik.touched.price?<Alert severity="warning" >{formik.errors.price}</Alert>:""}

            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                multiline
              />
            {formik.errors.description && formik.touched.description?<Alert severity="warning" >{formik.errors.description}</Alert>:""}

            </Grid>
            <Grid item xs={12}>
            <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText= "please enter numbers only"
              />
             {formik.errors.quantity && formik.touched.quantity?<Alert severity="warning" >{formik.errors.quantity}</Alert>:""}

            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image"
                name="Image"
                value={formik.values.Image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
             {formik.errors.Image && formik.touched.Image?<Alert severity="warning" >{formik.errors.Image}</Alert>:""}

            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Active Ingredients"
                name="activeIngredients"
                value={formik.values.activeIngredients}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                multiline
                helperText= "Please enter in this form {aIng1, aIng2, aIng3}"

              />
             {formik.errors.activeIngredients && formik.touched.activeIngredients?<Alert severity="warning" >{formik.errors.activeIngredients}</Alert>:""}

            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Medicinal Use"
                name="medicinalUse"
                value={formik.values.medicinalUse}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                multiline
                helperText= "Please enter in this form {mUse1, mUse2, mUse3}"
              />
             {formik.errors.medicinalUse && formik.touched.medicinalUse?<Alert severity="warning" >{formik.errors.medicinalUse}</Alert>:""}
            </Grid>

          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            ADD MEDICINE
          </Button>
        </form>
      </Box>
    </Container>

  </>
    
}