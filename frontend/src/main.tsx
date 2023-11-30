import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './routes'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AlertsProvider } from './providers/AlertsProvider'
import { SnackbarProvider } from 'notistack'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AuthProvider } from './providers/AuthProvider'

const queryClient = new QueryClient()

const router = createBrowserRouter(routes)

// Get the current URL
const currentUrl = new URL(window.location.href)

// Check if the "patientusername" parameter exists
const usernameParam = currentUrl.searchParams.get('patientusername')
console.log(usernameParam)

if (usernameParam) {
  // If the parameter exists, save it in localStorage
  localStorage.setItem('patientUsername', usernameParam)
}

const token = currentUrl.searchParams.get('token')
console.log(token)

if (token) {
  // If the parameter exists, save it in localStorage
  localStorage.setItem('token', token)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      />
      <AuthProvider>
        <AlertsProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router} />
          </LocalizationProvider>
        </AlertsProvider>
      </AuthProvider>
    </React.StrictMode>
  </QueryClientProvider>
)
