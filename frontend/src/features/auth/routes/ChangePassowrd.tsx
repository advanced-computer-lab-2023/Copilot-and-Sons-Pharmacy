import { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Typography } from '@mui/material'
import { CircularProgress } from '@mui/material'
import { toast } from 'react-toastify'
import { api } from '@/api'

interface ChangePasswordFormValues {
  oldPassword: string
  newPassword: string
}

export default function ChangePassword({
  onSuccess,
}: {
  onSuccess?: () => void
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const navigate = useNavigate()

  const validate = (values: ChangePasswordFormValues) => {
    const errors: Partial<ChangePasswordFormValues> = {}

    if (!values.oldPassword) {
      errors.oldPassword = 'Old password is required'
    }

    if (!values.newPassword) {
      errors.newPassword = 'New password is required'
    }

    return errors
  }

  const handleSubmit = async (values: ChangePasswordFormValues) => {
    setIsLoading(true)

    try {
      const { data } = await api.put('patient/changePassword', values)

      if (data.success === 'success') {
        toast.success('Password successfully changed', {
          position: 'top-right',
        })
        navigate('/auth/login')
        onSuccess?.()
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error changing password:', error.response.data)
        setError(error.response.data.error)
      } else {
        console.error('Unexpected error:', (error as Error).message)
        setPasswordError((error as Error).message)
      }

      setIsLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: { oldPassword: '', newPassword: '' },
    validate,
    onSubmit: handleSubmit,
  })

  return (
    <>
      <Typography variant="h6">Change Password</Typography>
      <div>
        {error !== null ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <></>
        )}

        <form onSubmit={formik.handleSubmit}>
          {}
          <TextField
            type="password"
            label="Old Password"
            variant="outlined"
            margin="normal"
            fullWidth
            id="oldPassword"
            name="oldPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.oldPassword}
            placeholder="Enter your old password"
            error={Boolean(formik.errors.oldPassword)}
            helperText={formik.errors.oldPassword || ''}
          />

          {}
          <TextField
            type="password"
            label="New Password"
            variant="outlined"
            margin="normal"
            fullWidth
            id="newPassword"
            name="newPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            placeholder="Enter your new password"
            error={Boolean(formik.errors.oldPassword || passwordError)}
            helperText={
              formik.errors.oldPassword || passwordError
                ? formik.errors.oldPassword || passwordError
                : ''
            }
          />

          {isLoading ? (
            <CircularProgress color="primary" size={24} />
          ) : (
            <Button type="submit" variant="contained" color="primary">
              Change Password
            </Button>
          )}
        </form>
      </div>
    </>
  )
}
