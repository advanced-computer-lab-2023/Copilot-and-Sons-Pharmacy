import Typography from '@mui/material/Typography'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
} from '@mui/material'
import MailIcon from '@mui/icons-material/Mail'
import format from 'date-fns/format'
import {
  acceptPharmacistRequest,
  rejectPharmacistRequest,
} from '@/api/pharmacist'
import { toast } from 'react-toastify'
import { Stack } from '@mui/system'
import { DetailsCard } from './DetailsCard'
import {
  Article,
  Event,
  LocalHospital,
  Money,
  PendingActions,
  Person,
  School,
  StarBorder,
  WorkspacePremium,
} from '@mui/icons-material'
import { DateRangeIcon } from '@mui/x-date-pickers'
import { PharmacistStatus } from 'pharmacy-common/types/pharmacist.types'
import { ChatButton } from './chats/ChatButton'

export default function PharmacistDetails({
  pharmacist,
  query,
}: {
  pharmacist: any
  query: any
}) {
  const dateOfBirthFormatted = format(
    new Date(pharmacist.dateOfBirth),
    'MMMM d, yyyy'
  )

  function handleAccept(id: any) {
    const promise = acceptPharmacistRequest(id).then(() => {
      query.refetch()
    })
    toast.promise(promise, {
      pending: 'Loading',
      success: 'Pharmacist Request Accepted Successfully!',
      error: 'error',
    })
  }

  function handleReject(id: any) {
    const promise = rejectPharmacistRequest(id).then(() => {
      query.refetch()
    })
    toast.promise(promise, {
      pending: 'Loading',
      success: 'Pharmacist Request Rejected Successfully!',
      error: 'error',
    })
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Stack>
          <Typography variant="h6">{pharmacist.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Sent&nbsp;
            {formatDistanceToNow(new Date(pharmacist.createdAt), {
              addSuffix: true,
            })}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
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
            { icon: <MailIcon />, label: 'Email', value: pharmacist.email },
            {
              icon: <LocalHospital />,
              label: 'Affiliation',
              value: pharmacist.affilation,
            },
            {
              icon: <PendingActions />,
              label: 'Status',
              value: pharmacist.status,
            },
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
            {
              icon: <Article />,
              label: 'Documents',
              value:
                pharmacist.documents.length > 0
                  ? pharmacist.documents.map((document: string) => (
                      <iframe width={'400'} height={'300'} src={document} />
                    ))
                  : 'None',
            },
          ]}
        />
      </AccordionDetails>
      <AccordionActions>
        {pharmacist.status === PharmacistStatus.Pending && (
          <>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                handleAccept(pharmacist._id)
              }}
            >
              Accept
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                handleReject(pharmacist._id)
              }}
            >
              Reject
            </Button>
          </>
        )}
        {pharmacist.status === PharmacistStatus.Accepted && (
          <ChatButton otherUsername={pharmacist.user.username} />
        )}
      </AccordionActions>
    </Accordion>
  )
}
