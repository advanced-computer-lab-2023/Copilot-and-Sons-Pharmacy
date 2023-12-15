import 'react-toastify/dist/ReactToastify.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useFormik } from 'formik'
import { styled } from '@mui/material/styles'
import * as Yup from 'yup'
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
  Alert,
} from '@mui/material'
import { toast } from 'react-toastify'
import {
  searchForMedicine,
  useEditMedicineService,
} from '../../../api/medicine'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import IMedicine from '@/types/medicine.type'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('name is required'),
  price: Yup.number(),
  description: Yup.string(),
  quantity: Yup.number(),
  sales: Yup.number(),
  Image: Yup.string(),
  mainActiveIngredient: Yup.string(),
  activeIngredients: Yup.string().matches(
    /^(?!.*\s,)[^,]*(, [^,]+)*$/,
    'Input must be in the form "a, b, c, d, e, f" with spaces after commas'
  ),
  medicinalUse: Yup.string().matches(
    /^(?!.*\s,)[^,]*(, [^,]+)*$/,
    'Input must be in the form "a, b, c, d, e, f" with spaces after commas'
  ),
})
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

export function EditMedicine() {
  //calling the custom useRemoveUser hook to return the mutation from
  const mutation = useEditMedicineService()
  const [imageValue, setImageValue] = useState({ file: null } as any)

  //   Getting the medicine data
  const { name } = useParams()

  const [medicine, setMedicine] = useState<IMedicine>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await searchForMedicine(name!)
        setMedicine(response.data[0])
      } catch (error) {
        console.error('Error fetching medicines: ', error)
      }
    }

    fetchData()
  }, [])

  const initialValues = {
    name,
    price: 0,
    description: '',
    quantity: 0,
    Image: new File([], ''),
    mainActiveIngredient: '',
    activeIngredients: '',
    medicinalUse: '',
    sales: 0,
  }

  const handleEditedMedicine = (Medicine: typeof initialValues) => {
    // Call the mutation function with the username you want to delete
    const formData = new FormData()
    if (Medicine.price != 0) formData.append('price', Medicine.price.toString())
    if (Medicine.description != '')
      formData.append('description', Medicine.description)
    if (Medicine.quantity != 0)
      formData.append('quantity', Medicine.quantity.toString())
    if (Medicine.sales != 0) formData.append('sales', Medicine.sales.toString())
    if (imageValue != new File([], ''))
      formData.append('Image', imageValue.file)

    if (Medicine.mainActiveIngredient != '') {
      if (Medicine.activeIngredients != '') {
        formData.append(
          'activeIngredients',
          Medicine.mainActiveIngredient + ', ' + Medicine.activeIngredients
        )
      } else {
        formData.append(
          'activeIngredients',
          Medicine.mainActiveIngredient +
            ', ' +
            medicine?.activeIngredients.slice(1).join(', ')
        )
      }
    } else {
      if (Medicine.activeIngredients != '') {
        formData.append(
          'activeIngredients',
          medicine?.activeIngredients[0] + ', ' + Medicine.activeIngredients
        )
      }
    }

    if (Medicine.medicinalUse != '')
      formData.append('medicinalUse', Medicine.medicinalUse)

    mutation
      .mutateAsync({ name, medicine: formData })
      .then(() => {
        toast.success('Medicine Edited Successfuly!', {
          position: 'top-right',
        })
      })
      .catch(() => {
        toast.error(
          `couldn't Edit medicine , there is already a medicine with this name`,
          {
            position: 'top-right',
          }
        )
      })
  }

  const formik = useFormik<typeof initialValues>({
    initialValues,
    validationSchema,
    onSubmit: handleEditedMedicine,
  })

  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Edit Medicine
          </Typography>
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
                {formik.errors.name && formik.touched.name ? (
                  <Alert severity="warning">{formik.errors.name}</Alert>
                ) : (
                  ''
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText="please enter numbers only"
                />
                {formik.errors.price && formik.touched.price ? (
                  <Alert severity="warning">{formik.errors.price}</Alert>
                ) : (
                  ''
                )}
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
                {formik.errors.description && formik.touched.description ? (
                  <Alert severity="warning">{formik.errors.description}</Alert>
                ) : (
                  ''
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Quantity"
                  name="quantity"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText="please enter numbers only"
                />
                {formik.errors.quantity && formik.touched.quantity ? (
                  <Alert severity="warning">{formik.errors.quantity}</Alert>
                ) : (
                  ''
                )}
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image"
                  name="Image"
                  value={formik.values.Image}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.Image && formik.touched.Image ? (
                  <Alert severity="warning">{formik.errors.Image}</Alert>
                ) : (
                  ''
                )}
              </Grid> */}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Main Active Ingredient"
                  name="mainActiveIngredient"
                  value={formik.values.mainActiveIngredient}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  multiline
                />
                {formik.errors.mainActiveIngredient &&
                formik.touched.mainActiveIngredient ? (
                  <Alert severity="warning">
                    {formik.errors.activeIngredients}
                  </Alert>
                ) : (
                  ''
                )}
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
                  helperText="Please enter in this form {aIng1, aIng2, aIng3}"
                />
                {formik.errors.activeIngredients &&
                formik.touched.activeIngredients ? (
                  <Alert severity="warning">
                    {formik.errors.activeIngredients}
                  </Alert>
                ) : (
                  ''
                )}
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
                  helperText="Please enter in this form {mUse1, mUse2, mUse3}"
                />
                {formik.errors.medicinalUse && formik.touched.medicinalUse ? (
                  <Alert severity="warning">{formik.errors.medicinalUse}</Alert>
                ) : (
                  ''
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Sales"
                  name="sales"
                  value={formik.values.sales}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText="please enter numbers only"
                />
                {formik.errors.sales && formik.touched.sales ? (
                  <Alert severity="warning">{formik.errors.sales}</Alert>
                ) : (
                  ''
                )}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '10px',
                }}
              >
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Image
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      if (
                        event.currentTarget.files &&
                        event.currentTarget.files.length > 0
                      )
                        setImageValue({ file: event.currentTarget.files[0] })
                    }}
                  />
                </Button>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    color: 'grey',
                  }}
                >
                  {imageValue.file ? imageValue.file.name : 'No file selected'}
                </div>
              </div>
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
  )
}
