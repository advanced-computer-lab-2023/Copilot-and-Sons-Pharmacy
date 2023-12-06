import { AlertsBox } from '@/components/AlertsBox'
import { CardPlaceholder } from '@/components/CardPlaceholder'
import { Card, CardContent, Typography } from '@mui/material'
import { useQuery } from 'react-query'

import { useAuth } from '@/hooks/auth'

import { getPatientApi } from '@/api/order'

export function Wallet() {
  const { user } = useAuth()
  const query = useQuery({
    queryKey: ['patient', user!.username],
    queryFn: () => getPatientApi(user!.username),
    enabled: !!user,
  })

  if (query.isLoading) {
    return <CardPlaceholder />
  }

  const res = query.data?.data?.data

  if (res == null) {
    return <AlertsBox />
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          {`Wallet Money: ${res?.walletMoney.toFixed(2)} EGP`}
        </Typography>
      </CardContent>
    </Card>
  )
}
