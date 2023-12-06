import { AlertsBox } from '@/components/AlertsBox'
import { CardPlaceholder } from '@/components/CardPlaceholder'
import { Card, CardContent, Typography } from '@mui/material'
import { useQuery } from 'react-query'

import { getPharmacist } from '@/api/pharmacist'
import { useAuth } from '@/hooks/auth'

export function Wallet() {
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
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          {`Wallet Money: ${res?.pharmacist?.walletMoney.toFixed(2)} EGP`}
        </Typography>
      </CardContent>
    </Card>
  )
}
