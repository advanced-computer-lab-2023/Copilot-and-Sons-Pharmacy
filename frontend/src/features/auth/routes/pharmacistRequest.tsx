import { useState } from 'react'
import { toast } from 'react-toastify'
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
  IconButton,
  InputAdornment,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { pharmacistRequest } from '@/api/pharmacist'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Step1Schema, Step2Schema } from '@/validators/pharmacist.validator'
import { z } from 'zod'

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

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

  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [dateOfBirthError, setDateOfBirthError] = useState('')
  const [hourlyRateError, setHourlyRateError] = useState('')
  const [affiliationError, setAffiliationError] = useState('')

  const [majorError, setMajorError] = useState('')
  const [universityError, setUniversityError] = useState('')
  const [graduationYearError, setGraduationYearError] = useState('')
  const [degreeError, setDegreeError] = useState('')

  const validateStep1 = () => {
    try {
      Step1Schema.parse({
        name,
        email,
        username,
        password,
        dateOfBirth: new Date(dateOfBirth),
        hourlyRate: Number(hourlyRate),
        affiliation: affilation,
      })

      setNameError('')
      setEmailError('')
      setUsernameError('')
      setPasswordError('')
      setHourlyRateError('')
      setAffiliationError('')
      setDateOfBirthError('')

      if (hourlyRate === '') {
        setHourlyRateError('Enter hourly Rate')

        return false
      }

      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        setNameError(
          error.errors.find((err) => err.path[0] === 'name')?.message || ''
        )
        setEmailError(
          error.errors.find((err) => err.path[0] === 'email')?.message || ''
        )
        setUsernameError(
          error.errors.find((err) => err.path[0] === 'username')?.message || ''
        )
        setPasswordError(
          error.errors.find((err) => err.path[0] === 'password')?.message || ''
        )
        setHourlyRateError(
          error.errors.find((err) => err.path[0] === 'hourlyRate')?.message ||
            ''
        )
        setAffiliationError(
          error.errors.find((err) => err.path[0] === 'affiliation')?.message ||
            ''
        )
        setDateOfBirthError(
          error.errors.find((err) => err.path[0] === 'dateOfBirth')?.message ||
            ''
        )

        if (hourlyRate === '') {
          setHourlyRateError(' hourly Rate is required ')
        }
      }

      return false
    }
  }

  const validateStep2 = () => {
    try {
      Step2Schema.parse({
        major,
        university,
        graduationYear: Number(graduationYear),
        degree,
      })

      setMajorError('')
      setUniversityError('')
      setGraduationYearError('')
      setDegreeError('')

      if (graduationYear === '') {
        setGraduationYearError(' graduation year is required')

        return false
      }

      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMajorError(
          error.errors.find((err) => err.path[0] === 'major')?.message || ''
        )
        setUniversityError(
          error.errors.find((err) => err.path[0] === 'university')?.message ||
            ''
        )
        setGraduationYearError(
          error.errors.find((err) => err.path[0] === 'graduationYear')
            ?.message || ''
        )
        setDegreeError(
          error.errors.find((err) => err.path[0] === 'degree')?.message || ''
        )

        if (graduationYear === '') {
          setGraduationYearError(' graduation year is required')
        }
      }

      return false
    }
  }

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
    switch (activeStep) {
      case 0:
        if (validateStep1()) {
          setActiveStep((prevStep) => prevStep + 1)
        }

        break
      case 1:
        if (validateStep2()) {
          setActiveStep((prevStep) => prevStep + 1)
        }

        break
      case 2:
        setActiveStep((prevStep) => prevStep + 1)

        break
      default:
        break
    }
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

    // Check if any file is selected
    if (fieldValue.files.every((files) => !files || files.length === 0)) {
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
                error={!!nameError}
                helperText={nameError}
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
                error={!!emailError}
                helperText={emailError}
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
                error={!!usernameError}
                helperText={usernameError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="standard-basic"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                placeholder="Enter password"
                value={password}
                required
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        <FontAwesomeIcon
                          icon={showPassword ? faEye : faEyeSlash}
                          className="fa-regular"
                          id="togglePasswordIcon"
                          style={{
                            fontSize: '16px',
                            background: 'transparent',
                          }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                error={!!dateOfBirthError}
                helperText={dateOfBirthError}
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
                error={!!hourlyRateError}
                helperText={hourlyRateError}
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
                error={!!affiliationError}
                helperText={affiliationError}
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
                error={!!majorError}
                helperText={majorError}
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
                error={!!universityError}
                helperText={universityError}
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
                error={!!graduationYearError}
                helperText={graduationYearError}
              />
            </Grid>
            <Grid item xs={12}>
              <label>Select your latest Degree *</label>

              <RadioGroup
                onChange={(e) => {
                  setDegree(e.target.value)
                }}
                value={degree}
                aria-required="true"
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
              {degreeError && (
                <Typography variant="body2" color="error">
                  {degreeError}
                </Typography>
              )}
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
                    Upload your {docType} *
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
