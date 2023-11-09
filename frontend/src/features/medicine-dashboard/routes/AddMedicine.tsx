import 'react-toastify/dist/ReactToastify.css'
import {useFormik} from 'formik'
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
import {ToastContainer, toast} from 'react-toastify'
import {useAddMedicineService} from '@/api/medicine'
import {useState} from "react";
import {api} from "@/api";

interface newMedicine {
    name: string
    price: number
    description: string
    quantity: number
    Image: File
    activeIngredients: string
    medicinalUse: string
    sales: number
}

export function AddMedicine() {
    //calling the custom useRemoveUser hook to return the mutation from
    const mutation = useAddMedicineService()
    const [fieldValue, setFieldValue] = useState({file: null} as any);
    const [file, setFile] = useState(null as any);
    const handleAddNewMedicine = (Medicine: newMedicine) => {
        const formData = new FormData();
        formData.append('Image', fieldValue.file)
        formData.append('name', Medicine.name)
        formData.append('price', Medicine.price.toString())
        formData.append('description', Medicine.description)
        formData.append('quantity', Medicine.quantity.toString())
        formData.append('activeIngredients', Medicine.activeIngredients)
        formData.append('medicinalUse', Medicine.medicinalUse)
        formData.append('sales', Medicine.sales.toString())
        mutation
            .mutateAsync(formData)
            .then(() => {
                toast.success('Medicine Added Successfuly!', {
                    position: 'top-right',
                })
            })
            .catch(() => {
                toast.error(
                    `couldn't add medicine , there is already a medicine with this name`,
                    {
                        position: 'top-right',
                    }
                )
            })
    }

    const initialValues: newMedicine = {
        name: '',
        price: 0,
        description: '',
        quantity: 0,
        Image: new File([], ''),
        activeIngredients: '',
        medicinalUse: '',
        sales: 0,
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('name is required'),
        price: Yup.number()
            .required('price is required')
            .min(1, 'Price cannot be less than 1'),
        description: Yup.string().required('description is required'),
        quantity: Yup.number()
            .required('quantity is required')
            .min(1, 'quantity cannot be less than 1'),
        Image: Yup.mixed().required('Image is required'),
        activeIngredients: Yup.string()
            .required('activeIngredients is required')
            .matches(
                /^(?!.*\s,)[^,]*(, [^,]+)*$/,
                'Input must be in the form "a, b, c, d, e, f" with spaces after commas'
            ),
        medicinalUse: Yup.string()
            .required('medicinalUse is required')
            .matches(
                /^(?!.*\s,)[^,]*(, [^,]+)*$/,
                'Input must be in the form "a, b, c, d, e, f" with spaces after commas'
            ),
    })

    const formik = useFormik<typeof initialValues>({
        initialValues,
        validationSchema,
        onSubmit: handleAddNewMedicine,
    })
    const handeChange = (event: any) => {
        console.log(event)
        const formData = new FormData();
        formData.append('Image', event.currentTarget.files[0])
        formik.setFieldValue('Image', formData)
    }
    return (
        <>
            <Container maxWidth="sm">
                <Box sx={{marginTop: 4}}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Add New Medicine
                    </Typography>
                    <ToastContainer/>
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
                        </Grid>
                        <Grid item xs={12}>
                            <label>Upload Medicine Image</label>
                            <input id="file" name="file" type="file" onChange={(event) => {
                                if (event.currentTarget.files && event.currentTarget.files.length > 0)
                                    setFieldValue({"file": event.currentTarget.files[0]});
                            }}/>
                            {/*<input*/}
                            {/*    type="file"*/}
                            {/*    accept="image/*"*/}
                            {/*    name="Image"*/}
                            {/*    onChange={(event) => {*/}
                            {/*        console.log("heelo")*/}
                            {/*        console.log(event.currentTarget.files)*/}
                            {/*        const files = event.currentTarget.files*/}
                            {/*        if (files && files.length > 0) {*/}
                            {/*            console.log("yes more than 1")*/}
                            {/*            const file = files[0]*/}
                            {/*            formik.setFieldValue('Image', file)*/}
                            {/*            formik.setFieldTouched('Image', true, false) // should not trigger validation yet*/}
                            {/*            formik.handleChange(handeChange)*/}
                            {/*        }*/}
                            {/*    }}*/}
                            {/*    onBlur={formik.handleBlur}*/}
                            {/*/>*/}
                            {formik.errors.Image && formik.touched.Image ? (
                                <div className="error-message">
                                    {formik.errors.Image.toString()}
                                </div>
                            ) : null}
                        </Grid>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{marginTop: 2}}
                        >
                            ADD MEDICINE
                        </Button>
                    </form>
                </Box>
            </Container>
        </>
    )
}
