import { getDoctors } from '@/api/clinic'
import { CardPlaceholder } from '@/components/CardPlaceholder'
import { ChatButton } from '@/components/chats/ChatButton'
import { Grid, Card, CardHeader, Typography, CardActions } from '@mui/material'
import { useQuery } from 'react-query'

export function ChatWithDoctors() {
  const doctorsQuery = useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctors,
  })

  if (doctorsQuery.isLoading) {
    return <CardPlaceholder />
  }

  return (
    <Grid container spacing={3}>
      {doctorsQuery.data?.doctors.map((doctor) => (
        <Grid item xs={3}>
          <Card>
            <CardHeader
              title={
                <>
                  <Typography variant="h6">{doctor.name}</Typography>
                </>
              }
            />
            <CardActions style={{ justifyContent: 'center' }}>
              <ChatButton otherUsername={doctor.username} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
