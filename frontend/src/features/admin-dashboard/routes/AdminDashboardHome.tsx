import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'

import ChangePassword from '@/features/auth/routes/ChangePassowrd'
import { Dashboard } from '@mui/icons-material'
import AddingAdmin from './AddingAdmin'
import { Users } from './Users'

export function AdminDashboardHome() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          variant="h2"
          marginBottom={2}
          textAlign="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Dashboard fontSize="inherit" color="primary" />
          Welcome to your Admin dashboard!
        </Typography>
        <Box
          sx={{
            backgroundColor: 'primary.main',
            height: 5,
            width: 500,
            margin: 'auto',
          }}
        ></Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" marginBottom={2} textAlign="center">
          All Users
        </Typography>
        <Card sx={{ height: 700, overflow: 'scroll' }}>
          <Users />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={2}>
          <Typography variant="h4" textAlign="center">
            Add Admin
          </Typography>
          <Card>
            <CardContent>
              <AddingAdmin />
            </CardContent>
          </Card>
          <Box>
            <Card>
              <CardContent>
                <ChangePassword />
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  )
}
