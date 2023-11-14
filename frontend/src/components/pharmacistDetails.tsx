import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { styled } from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button, CardActions } from '@mui/material'
import { Collapse } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail'
import format from 'date-fns/format'
import {
  acceptPharmacistRequest,
  rejectPharmacistRequest,
} from '@/api/pharmacist'
import { toast } from 'react-toastify'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand: _, ...other } = props

  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

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
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

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
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={pharmacist.name}
        subheader={`Sent ${formatDistanceToNow(new Date(pharmacist.createdAt), {
          addSuffix: true,
        })}`}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary">
          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton aria-label="Email">
              <MailIcon />
            </IconButton>
          </a>
          {pharmacist.email}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>
            <p>
              <strong>Username : </strong>
              {pharmacist.user.username}
            </p>
            <p>
              <strong>Date of Birth : </strong>
              {dateOfBirthFormatted}
            </p>
            <p>
              <strong>Hourly Rate : </strong>
              {pharmacist.hourlyRate} $
            </p>
            <p>
              <strong>Affiliation : </strong>
              {pharmacist.affilation}
            </p>
            <p>
              <strong>Status : </strong>
              {pharmacist.status}
            </p>
            <p>
              <strong>Major : </strong>
              {pharmacist.educationalBackground.major}
            </p>
            <p>
              <strong>University : </strong>
              {pharmacist.educationalBackground.university}
            </p>
            <p>
              <strong>Graduation Year : </strong>
              {pharmacist.educationalBackground.graduationYear}
            </p>
            <p>
              <strong>Degree : </strong>
              {pharmacist.educationalBackground.degree}
            </p>
            <p>
              <strong>Documents : </strong>
              {pharmacist.documents.map((document: string) => (
                <iframe width={'400'} height={'300'} src={document} />
              ))}
            </p>
          </Typography>
        </CardContent>
        {pharmacist.status === 'Pending' && (
          <CardActions>
            <Button
              size="small"
              variant="contained"
              color="success"
              onClick={() => {
                handleAccept(pharmacist._id)
              }}
            >
              {' '}
              Accept
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() => {
                handleReject(pharmacist._id)
              }}
            >
              {' '}
              Reject
            </Button>
          </CardActions>
        )}
      </Collapse>
    </Card>
  )
}
