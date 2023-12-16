import { Container } from '@mui/system'
import { CardPlaceholder } from '@/components/CardPlaceholder'
import { useAuth } from '@/hooks/auth'
import { useQuery } from 'react-query'
import { getPharmacist } from '@/api/pharmacist'
import { AllChats } from '@/components/chats/AllChats'
import { Copyright } from '@mui/icons-material'
import { Grid, Paper } from '@mui/material'
import Deposits from '../components/Deposits'
import { AlertsBox } from '@/components/AlertsBox'
import { PharmacistStatus } from 'pharmacy-common/types/pharmacist.types'

export function PharmacistDashboardHome() {
  const { user } = useAuth()
  const pharmacistQuery = useQuery({
    queryKey: ['pharmacist', user!.username],
    queryFn: () => getPharmacist(user!.username),
    enabled: !!user,
  })

  if (pharmacistQuery.isLoading) {
    return <CardPlaceholder />
  }

  const res = pharmacistQuery.data

  if (res == null) {
    return <AlertsBox />
  }

  console.log(res.pharmacist)

  return (
    <>
      {res.pharmacist.status === PharmacistStatus.Accepted && (
        <div>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 1 }}>
            <Grid
              container
              spacing={4}
              justifyContent="center"
              paddingBottom={4}
              paddingRight={6}
              flexDirection={'column'}
            >
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 310,
                    borderRadius: '17px',
                    color: 'white ',
                    bgcolor: 'primary.main',
                  }}
                >
                  <Deposits wallet={res?.pharmacist?.walletMoney} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    paddingX: 2,
                    paddingY: 2,
                    height: 'fit-content',
                    borderRadius: '17px',
                    overflow: 'auto',
                    width: '100%',
                    scrollbarWidth: 'thin', // For Firefox
                    '&::-webkit-scrollbar': {
                      width: '0em', // Set the width of the scrollbar
                    },
                  }}
                >
                  <AllChats />
                </Paper>
              </Grid>
            </Grid>

            <Copyright sx={{ pt: 4 }} />
          </Container>
        </div>
      )}
    </>
  )
}
