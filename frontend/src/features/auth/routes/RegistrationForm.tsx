import { z } from 'zod'
import { registerUser } from '../../../api/auth.ts'
import React, { useState, FormEvent } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
  FormControl,
  RadioGroup,
  FormLabel,
  Radio,
  FormControlLabel,
} from '@mui/material'
import {
  RegisterRequestValidator,
  emergencyContactValidator,
} from '../../../validators/user.validator.ts'
import { format, isDate } from 'date-fns'
type errors = {
  [key: string]: string
}
type FormState = {
  username: string
  name: string
  email: string
  password: string
  dateOfBirth: string | null
  gender: string
  mobileNumber: string
  emergencyContact: {
    fullName: string
    mobileNumber: string
    relation: string
  }
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    username: '',
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    gender: '',
    mobileNumber: '',
    emergencyContact: {
      fullName: '',
      mobileNumber: '',
      relation: '',
    },
  })

  const [errors, setErrors] = useState<errors>({})

  const [emergencyContactError, setEmergencyError] = useState<errors>({})

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      RegisterRequestValidator.parse(formData)
      setErrors({})
      setEmergencyError({})

      try {
        await registerUser(formData)
        toast.success('Registration was successful!', {
          position: 'top-right',
        })
      } catch (e: any) {
        toast.error(e.message, {
          position: 'top-right',
        })
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: errors = {}
        err.errors.forEach((validationError) => {
          const fieldName = validationError.path[0]

          if (typeof fieldName === 'string') {
            if (fieldName.startsWith('emergencyContact.')) {
              // Error in emergency contact fields
              const subField = fieldName.split('.')[1]
              emergencyContactError[subField] = validationError.message
            } else {
              // Error in other fields
              fieldErrors[fieldName] = validationError.message
            }
          }
        })
        setErrors(fieldErrors)
        setEmergencyError(emergencyContactError)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as {
      name: keyof FormState
      value: string
    }

    if (name.startsWith('emergencyContact.')) {
      const fieldName = name.split('.')[1]
      const updatedEmergencyContact = {
        ...formData.emergencyContact,
        [fieldName]: value,
      }

      setFormData({
        ...formData,
        emergencyContact: updatedEmergencyContact,
      })

      try {
        emergencyContactValidator
          .pick({
            [fieldName]: true,
          })
          .parse({ [fieldName]: value })

        setEmergencyError((prevErrors) => ({ ...prevErrors, [fieldName]: '' }))
      } catch (err: any) {
        const message: string = err.errors.find(
          (error: any) => error.path[0] === fieldName
        ).message
        setEmergencyError((prevErrors) => ({
          ...prevErrors,
          [fieldName]: message,
        }))
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }

    try {
      RegisterRequestValidator.pick({
        [name]: true,
      }).parse({ [name]: value })

      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
    } catch (error: any) {
      const message: string = error.errors.find(
        (err: any) => err.path[0] === name
      ).message
      setErrors((prevErrors) => ({ ...prevErrors, [name]: message }))
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="UserName"
                required
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                error={Boolean(errors?.username)}
                helperText={errors?.username || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                required
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                name="dateOfBirth"
                required
                InputLabelProps={{ shrink: true }}
                value={formData.dateOfBirth}
                onChange={(e) => {
                  try {
                    isDate(format(new Date(e.target.value), 'MM-dd-yyyy'))
                    setErrors({ ...errors, dateOfBirth: '' })
                    setFormData({ ...formData, dateOfBirth: e.target.value })
                  } catch (error) {
                    setErrors({
                      ...errors,
                      dateOfBirth: 'please choose a date',
                    })
                    setFormData({ ...formData, dateOfBirth: e.target.value })
                  }
                }}
                error={Boolean(errors.dateOfBirth)}
                helperText={errors.dateOfBirth}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="Female"
                    control={<Radio color="primary" />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Male"
                    control={<Radio color="primary" />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mobile Number"
                required
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                error={Boolean(errors.mobileNumber)}
                helperText={errors.mobileNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Emergency Contact Full Name"
                type="text"
                required
                name="emergencyContact.fullName"
                value={formData.emergencyContact.fullName}
                onChange={handleInputChange}
                error={Boolean(emergencyContactError.fullName)}
                helperText={emergencyContactError.fullName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Emergency Contact Mobile Number"
                name="emergencyContact.mobileNumber"
                required
                value={formData.emergencyContact.mobileNumber}
                onChange={handleInputChange}
                error={Boolean(emergencyContactError.mobileNumber)}
                helperText={emergencyContactError.mobileNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Emergency Contact Relation"
                name="emergencyContact.relation"
                required
                value={formData.emergencyContact.relation}
                onChange={handleInputChange}
                error={Boolean(emergencyContactError.relation)}
                helperText={emergencyContactError.relation}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default RegistrationForm
