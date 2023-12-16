import { Container, Card, CardContent, Typography } from '@mui/material'
import { useQuery } from 'react-query'
import { viewPatientInfo2 } from '../../../api/patient'
import { useParams } from 'react-router-dom'

const PatientInfo = () => {
  const { id } = useParams()
  const {
    data: patient,
    isLoading,
    isError,
  } = useQuery('patient', () => viewPatientInfo2(id!))

  const formatDate = (dateString: any) => {
    const date = new Date(dateString)

    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <Container style={{ height: '500px', width: '100%' }}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching patient</p>}
      {patient && (
        <Card variant="outlined" style={{ height: '100%' }}>
          <CardContent>
            <Typography
              variant="h4"
              component="div"
              sx={{ marginBottom: '20px' }}
            >
              Patient Information
            </Typography>

            <Typography sx={{ fontSize: '20px', marginBottom: '10px' }}>
              Name: {patient.data.name}
            </Typography>
            <Typography sx={{ fontSize: '20px', marginBottom: '10px' }}>
              Email: {patient.data.email}
            </Typography>
            <Typography sx={{ fontSize: '20px', marginBottom: '10px' }}>
              Date of Birth: {formatDate(patient.data.dateOfBirth)}
            </Typography>
            <Typography sx={{ fontSize: '20px', marginBottom: '10px' }}>
              Gender: {patient.data.gender}
            </Typography>
            <Typography sx={{ fontSize: '20px', marginBottom: '10px' }}>
              Mobile Number: {patient.data.mobileNumber}
            </Typography>
            <Typography sx={{ fontSize: '20px', marginBottom: '10px' }}>
              Emergency Contact: {patient.data.emergencyContact.fullName}
            </Typography>
            <Typography sx={{ fontSize: '20px', marginBottom: '10px' }}>
              Relation: {patient.data.emergencyContact.relation}
            </Typography>
            <Typography sx={{ fontSize: '20px', marginBottom: '10px' }}>
              Contact Number: {patient.data.emergencyContact.mobileNumber}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  )
}

export default PatientInfo
