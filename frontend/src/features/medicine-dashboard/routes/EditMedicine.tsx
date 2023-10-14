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
import { useAddMedicineService, useEditMedicineService } from '../../../api/medicine';
import { useParams } from 'react-router-dom';




export function EditMedicine (){

    //calling the custom useRemoveUser hook to return the mutation from
    const mutation = useEditMedicineService();

  const handleEditedMedicine = (Medicine:editMedicine) => {
    // Call the mutation function with the username you want to delete
    const editedMedicine = {
        name: Medicine.name,
        edits: {
          
        }
    }
    if(Medicine.price!=0)
      editedMedicine.edits.price= Medicine.price;
    if(Medicine.description!="")
      editedMedicine.edits.description= Medicine.description;
    if(Medicine.quantity!=0)
      editedMedicine.edits.quantity= Medicine.quantity;
    if(Medicine.sales!=0)
      editedMedicine.edits.sales= Medicine.sales;
    if(Medicine.Image!="")
      editedMedicine.edits.Image= Medicine.Image;
    if(Medicine.activeIngredients!="")
      editedMedicine.edits.activeIngredients= Medicine.activeIngredients;
    if(Medicine.medicinalUse!="")
      editedMedicine.edits.medicinalUse= Medicine.medicinalUse;
    // console.log(editedMedicine)
    mutation.mutateAsync(editedMedicine).then(()=>{toast.success('Medicine Edited Successfuly!', {
        position: 'top-right',
      })}).catch((err)=>{toast.error(`couldn't Edit medicine , there is already a medicine with this name`, {
        position: 'top-right',
      })})
  };
  

//   Getting the medicine data
const { name } = useParams();
  
  
//  console.log(data?.data)  ;
// ----------------------------------------
  const initialValues = {name: name, price:0 , description: "" , quantity: 0, Image: "", activeIngredients: "", medicinalUse:"", sales:0};
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    price: Yup.number(),  
    description: Yup.string(),
    quantity: Yup.number(),
    sales: Yup.number(),
    Image: Yup.string(),
    activeIngredients: Yup.string().matches(/^(?!.*\s,)[^,]*(, [^,]+)*$/, 'Input must be in the form "a, b, c, d, e, f" with spaces after commas'),
    medicinalUse: Yup.string().matches(/^(?!.*\s,)[^,]*(, [^,]+)*$/, 'Input must be in the form "a, b, c, d, e, f" with spaces after commas'),
  });

  let formik = useFormik<any>({
    initialValues,
    validationSchema,
    onSubmit:handleEditedMedicine
  });

  return <>
      <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Edit Medicine
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
                disabled
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

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Sales"
                name="sales"
                    value={formik.values.sales}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText= "please enter numbers only"
              />
            {formik.errors.sales && formik.touched.sales?<Alert severity="warning" >{formik.errors.sales}</Alert>:""}

            </Grid>

          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            EDIT MEDICINE
          </Button>
        </form>
      </Box>
    </Container>

  </>
    
}