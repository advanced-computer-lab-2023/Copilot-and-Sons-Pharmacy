import { Card, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'

export function DetailsCard({
  fields,
  children,
  noCard = false,
}: React.PropsWithChildren<{
  fields: {
    icon?: React.ReactNode
    label: string
    value: any
  }[]
  noCard?: boolean
}>) {
  const details = (
    <Stack spacing={2}>
      {fields.map((f) =>
        f.icon ? (
          <Stack direction="row" spacing={2} alignItems="center">
            {f.icon}
            <Stack spacing={-1}>
              <Typography variant="overline" color="text.secondary">
                {f.label}
              </Typography>
              <Typography variant="body1">{f.value}</Typography>
            </Stack>
          </Stack>
        ) : (
          <Stack spacing={-1}>
            <Typography variant="overline" color="text.secondary">
              {f.label}
            </Typography>
            <Typography variant="body1">{f.value}</Typography>
          </Stack>
        )
      )}
    </Stack>
  )

  if (noCard) {
    return details
  }

  return (
    <Card variant="outlined">
      <CardContent>{details}</CardContent>
      {children}
    </Card>
  )
}
