import { useSidebar } from '../../../hooks/sidebar'
import { Container } from '@mui/material'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthenticatedRoute } from '@/components/AuthenticatedRoute'
import { UserType } from 'pharmacy-common/types/user.types'
import { Healing } from '@mui/icons-material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStethoscope } from '@fortawesome/free-solid-svg-icons'
import MessageIcon from '@mui/icons-material/Message'

export function DoctorDashboardLayout() {
  const { setSidebarLinks } = useSidebar()

  useEffect(() => {
    setSidebarLinks([
      {
        to: '/doctor-dashboard/',
        text: 'Medicines',
        icon: <Healing />,
      },
      {
        to: '/Doctor-dashboard/pharmacists',
        text: 'Chat with Pharmacists',
        icon: <MessageIcon />,
      },
      {
        to: '/doctor-dashboard/clinic',
        text: 'Your Clinic',
        icon: <FontAwesomeIcon icon={faStethoscope} />,
      },
    ])
  }, [setSidebarLinks])

  return (
    <AuthenticatedRoute requiredUserType={UserType.Doctor}>
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </AuthenticatedRoute>
  )
}
