import React, { useState } from 'react'
import { AddAdminValidator } from '../../../validators/admin.validator.ts'
import { toast } from 'react-toastify'
import { AddAdmin } from '../../../api/admin.ts'
import 'react-toastify/dist/ReactToastify.css'

import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
} from '@mui/material'

type errors = {
  [key: string]: string
}

const AdminAdd: React.FC = () => {
  const [formData, setFormData] = useState<{
    username: string
    password: string
    email: string
  }>({
    username: '',
    password: '',
    email: '',
  })

  const [errors, setError] = useState<errors>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    try {
      AddAdminValidator.pick({
        [name]: true,
      }).parse({ [name]: value })

      setError((prevErrors) => ({ ...prevErrors, [name]: '' }))
    } catch (error: any) {
      setError((prevErrors) => ({
        ...prevErrors,
        [name]: error.issues.map((issue: any) => issue.message).join(', '),
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await AddAdmin(formData)

      await toast.success('Admin is added Successfuly!', {
        position: 'top-right',
      })
    } catch (errorAdmin: any) {
      console.log(errorAdmin)
      await toast.error(errorAdmin.message, {
        position: 'top-right',
      })
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" align="center" gutterBottom>
            Add Admin
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                error={Boolean(errors.username)}
                helperText={errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
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
                value={formData.password}
                onChange={handleInputChange}
                required
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </Grid>
          </Grid>
          <Button
            sx={{ marginTop: '20px' }}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            ADD ADMIN
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default AdminAdd
