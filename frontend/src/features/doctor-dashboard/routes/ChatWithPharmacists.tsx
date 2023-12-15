import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@mui/material'
import { useQuery } from 'react-query'
import { CardPlaceholder } from '@/components/CardPlaceholder'
import { getApprovedPharmacists } from '@/api/admin'
import { PharmacistStatus } from 'pharmacy-common/types/pharmacist.types'
import { ChatButton } from '@/components/chats/ChatButton'
import { DetailsCard } from '@/components/DetailsCard'
import {
  Person,
  Money,
  LocalHospital,
  WorkspacePremium,
  School,
  StarBorder,
  Event,
  Message,
} from '@mui/icons-material'
import { DateRangeIcon } from '@mui/x-date-pickers'
import { format } from 'date-fns'
import { Stack } from '@mui/system'

const PharmacistDetails = ({ pharmacist }: any) => {
  const dateOfBirthFormatted = format(
    new Date(pharmacist.dateOfBirth),
    'MMMM d, yyyy'
  )

  return (
    <Card>
      <CardHeader
        title={
          <Stack>
            <Typography variant="h5" color="primary.main">
              {pharmacist.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {pharmacist.email}
            </Typography>
          </Stack>
        }
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <DetailsCard
              noCard
              fields={[
                {
                  icon: <Person />,
                  label: 'Username',
                  value: pharmacist.user.username,
                },
                {
                  icon: <DateRangeIcon />,
                  label: 'Date of Birth',
                  value: dateOfBirthFormatted,
                },
                {
                  icon: <Money />,
                  label: 'Hourly Rate',
                  value: pharmacist.hourlyRate.toFixed(2) + '$',
                },
                {
                  icon: <LocalHospital />,
                  label: 'Affiliation',
                  value: pharmacist.affilation,
                },
              ]}
            />{' '}
          </Grid>
          <Grid item xs={6}>
            <DetailsCard
              noCard
              fields={[
                {
                  icon: <WorkspacePremium />,
                  label: 'Major',
                  value: pharmacist.educationalBackground.major,
                },
                {
                  icon: <School />,
                  label: 'University',
                  value: pharmacist.educationalBackground.university,
                },
                {
                  icon: <Event />,
                  label: 'Graduation Year',
                  value: pharmacist.educationalBackground.graduationYear,
                },
                {
                  icon: <StarBorder />,
                  label: 'Degree',
                  value: pharmacist.educationalBackground.degree,
                },
              ]}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        {pharmacist.status === PharmacistStatus.Accepted && (
          <>
            <ChatButton otherUsername={pharmacist.user.username} fullWidth />
          </>
        )}
      </CardActions>
    </Card>
  )
}

export const ChatWithPharmacists = () => {
  const query = useQuery({
    queryKey: ['approved-pharmacists'],
    queryFn: () => getApprovedPharmacists(),
  })

  if (query.isLoading) {
    return <CardPlaceholder />
  }

  return (
    <Grid container spacing={1}>
      <Grid
        item
        xs={12}
        sx={{
          marginBottom: '20px',
        }}
      >
        <Typography
          variant="h2"
          marginBottom={2}
          textAlign="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Message fontSize="inherit" color="primary" />
          Chat with Pharmacists!
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
      {query.data!.map((pharmacist) => (
        <Grid item md={5} key={pharmacist._id}>
          <PharmacistDetails pharmacist={pharmacist} />
        </Grid>
      ))}
    </Grid>
  )
}
