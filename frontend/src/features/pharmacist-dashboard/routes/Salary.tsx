import { AlertsBox } from '@/components/AlertsBox'
import { CardPlaceholder } from '@/components/CardPlaceholder'
import { Card, CardContent, Typography } from '@mui/material'
import { useQuery } from 'react-query'

import { getPharmacist } from '@/api/pharmacist'
import { useAuth } from '@/hooks/auth'

export function Salary() {
  const { user } = useAuth()
  const query = useQuery({
    queryKey: ['pharmacist', user!.username],
    queryFn: () => getPharmacist(user!.username),
    enabled: !!user,
  })

  if (query.isLoading) {
    return <CardPlaceholder />
  }

  const res = query.data

  if (res == null) {
    return <AlertsBox />
  }

  return (
    <Card
      sx={{
        textAlign: 'center',
        border: 'none',
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    >
      <CardContent>
        <Typography color="primary.main">Available Balance:</Typography>
        <Typography variant="h3" color="text.primary">
          {`EGP + ${res?.pharmacist?.walletMoney.toFixed(2)} `}
        </Typography>
      </CardContent>
    </Card>
  )
}
