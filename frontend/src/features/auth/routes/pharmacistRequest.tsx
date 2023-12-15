import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  TextField,
  Typography,
  Grid,
  RadioGroup,
  Radio,
  Box,
  Container,
  FormControlLabel,
  LinearProgress,
  Button,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { pharmacistRequest } from '@/api/pharmacist'

export const Register = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [affilation, setAffiliation] = useState('')
  const [major, setMajor] = useState('')
  const [university, setUniversity] = useState('')
  const [graduationYear, setGraduationYear] = useState('')
  const [degree, setDegree] = useState('')
  const [fieldValue, setFieldValue] = useState({ files: new Array(3) })

  const steps = [
    'Personal Information',
    'Educational Background',
    'Document Upload',
  ]

  const handleFileChange = (event: any, index: any) => {
    const newFiles = Array.from(event.currentTarget.files)
    setFieldValue((prevValues) => {
      const updatedFiles: any = [...prevValues.files]
      updatedFiles[index] = newFiles

      return { ...prevValues, files: updatedFiles }
    })
  }

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  async function submit(e: any) {
    setIsLoading(true)
    console.log('submit')
    console.log(fieldValue.files)
    e.preventDefault()
    const requiredFields = [
      name,
      email,
      username,
      password,
      dateOfBirth,
      hourlyRate,
      affilation,
      major,
      university,
      graduationYear,
      degree,
    ]

    if (requiredFields.some((field) => field.trim() === '')) {
      toast.error('Please fill out all the required fields.')
      setIsLoading(false)

      return
    }

    // Check if any file is selected
    if (
      fieldValue.files.some(
        (files) => files === undefined || files.length === 0
      )
    ) {
      toast.error('Please choose files for document upload.')
      setIsLoading(false)

      return
    }

    const formData = new FormData()

    formData.append('name', name)
    formData.append('email', email)
    formData.append('username', username)
    formData.append('password', password)
    formData.append('dateOfBirth', dateOfBirth)
    formData.append('hourlyRate', hourlyRate)
    formData.append('affilation', affilation)
    formData.append('educationalBackground[major]', major)
    formData.append('educationalBackground[university]', university)
    formData.append('educationalBackground[graduationYear]', graduationYear)
    formData.append('educationalBackground[degree]', degree)
    formData.append('status', 'Pending')

    // formData.append('documents', fieldValue.files)
    for (let i = 0; i < fieldValue.files.length; i++) {
      formData.append('documents', fieldValue.files[i][0])
    }

    console.log(fieldValue.files[0])

    try {
      await pharmacistRequest(formData)
      toast.success('Your request has been sent successfully')
    } catch (err: any) {
      console.log(err)
      toast.error(err.message)
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Name"
                value={name}
                type="text"
                onChange={(e) => {
                  setName(e.target.value)
                }}
                placeholder="Enter your Name"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                id="standard-basic"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                placeholder="Enter your email address"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="standard-basic"
                type="text"
                label="Username"
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
                value={username}
                placeholder="Enter userrname"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="standard-basic"
                type="password"
                label="Password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                placeholder="Enter password"
                value={password}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date of Birth"
                InputLabelProps={{ shrink: true }}
                id="standard-basic"
                type="date"
                onChange={(e) => {
                  setDateOfBirth(e.target.value)
                }}
                placeholder="Enter date of birth"
                value={dateOfBirth}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="standard-basic"
                type="number"
                label="Excpected Hourly Rate"
                onChange={(e) => {
                  setHourlyRate(e.target.value)
                }}
                value={hourlyRate}
                placeholder="Enter hourly rate in EGP"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="affilation"
                id="standard-basic"
                type="text"
                onChange={(e) => {
                  setAffiliation(e.target.value)
                }}
                placeholder="Enter affiliation"
                value={affilation}
                required
              />
            </Grid>
          </Grid>
        )
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Major"
                type="text"
                required
                onChange={(e) => {
                  setMajor(e.target.value)
                }}
                placeholder="Enter your major"
                value={major}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="standard-basic"
                label="University"
                type="text"
                onChange={(e) => {
                  setUniversity(e.target.value)
                }}
                placeholder="Enter your university"
                value={university}
                required
              />
            </Grid>
            <Grid item xs={12}>
              {/* <label>Graduation Year </label> */}
              <TextField
                fullWidth
                id="standard-basic"
                required
                label="Graduation Year"
                type="number"
                onChange={(e) => {
                  setGraduationYear(e.target.value)
                }}
                placeholder="Enter graduation year"
                value={graduationYear}
              />
            </Grid>
            <Grid item xs={12}>
              <label>Select your latest Degree </label>

              <RadioGroup
                onChange={(e) => {
                  setDegree(e.target.value)
                }}
                value={degree}
              >
                <FormControlLabel
                  value="Associate degree"
                  control={<Radio />}
                  label="Associate degree"
                />
                <FormControlLabel
                  value="Bachelor's degree"
                  control={<Radio />}
                  label="Bachelor's degree"
                />
                <FormControlLabel
                  value="Master's degree"
                  control={<Radio />}
                  label="Master's degree"
                />
                <FormControlLabel
                  value="Doctoral degree"
                  control={<Radio />}
                  label="Doctoral degree"
                />
              </RadioGroup>
            </Grid>
          </Grid>
        )
      case 2:
        return (
          <Grid container spacing={2}>
            {['ID', 'Medical License', 'Degree'].map((docType, index) => (
              <Grid item xs={12} key={index}>
                <div
                  style={{
                    marginBottom: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <label style={{ marginBottom: '5px', textAlign: 'left' }}>
                    Upload your {docType}
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      id={`${docType.toLowerCase()}File`}
                      name={`${docType.toLowerCase()}File`}
                      type="file"
                      onChange={(event) => handleFileChange(event, index)}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor={`${docType.toLowerCase()}File`}>
                      <Button
                        component="span"
                        variant="contained"
                        color="primary"
                      >
                        Choose File
                      </Button>
                    </label>
                    {fieldValue.files[index] && fieldValue.files[index][0] && (
                      <div
                        style={{
                          marginLeft: '10px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Typography style={{ marginRight: '10px' }}>
                          {fieldValue.files[index][0].name}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        )
      default:
        return null
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        {/* Progress Bar */}
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <ToastContainer />
        {/* Progress Bar */}
        <LinearProgress
          variant="determinate"
          value={(activeStep / (steps.length - 1)) * 100}
        />

        {/* Step Indicator */}
        {/* Step Indicator */}
        <Typography variant="h6" align="center" gutterBottom>
          {steps[activeStep]}
        </Typography>
        <form onSubmit={submit}>
          {renderStep()}

          {activeStep == 2 && (
            <Grid container spacing={2} marginTop={'10px'}>
              <LoadingButton
                loading={isLoading}
                type="submit"
                fullWidth
                className="btn btn-primary"
                variant="contained"
              >
                Register
              </LoadingButton>
            </Grid>
          )}
          <div>
            {activeStep > 0 && (
              <LoadingButton onClick={handleBack}>Back</LoadingButton>
            )}
            {activeStep < steps.length - 1 && (
              <LoadingButton onClick={handleNext}>Next</LoadingButton>
            )}
          </div>
        </form>
      </Box>
    </Container>
  )
}

export default Register
