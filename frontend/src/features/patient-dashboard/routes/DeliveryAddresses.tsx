import {
  addDeliveryAddress,
  deleteDeliveryAddress,
  getDeliveryAddresses,
  updateDeliveryAddress,
} from '@/api/deliveryAddresses'
import { ApiForm } from '@/components/ApiForm'
import { CardPlaceholder } from '@/components/CardPlaceholder'
import { DetailsCard } from '@/components/DetailsCard'
import { useAlerts } from '@/hooks/alerts'
import { Delete, Edit } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Alert, Button, CardActions, Grid } from '@mui/material'
import { Stack } from '@mui/system'
import {
  AddDeliveryAddressRequest,
  GetAllDeliveryAddressesResponse,
  UpdateDeliveryAddressRequest,
} from 'pharmacy-common/types/deliveryAddress.types'
import {
  AddDeliveryAddressValidator,
  UpdateDeliveryAddressValidator,
} from 'pharmacy-common/validators/deliveryAddress.validator'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useSearchParams } from 'react-router-dom'

function DeliveryAddress({
  address,
}: {
  address: GetAllDeliveryAddressesResponse[0]
}) {
  const [editing, setEditing] = useState(false)
  const [searchParams, _] = useSearchParams()
  const username = searchParams.get('username')
  const queryClient = useQueryClient()

  const { addAlert } = useAlerts()

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteDeliveryAddress(username!, id),
    onSuccess: () => {
      queryClient.invalidateQueries(['delivery-addresses'])
      addAlert({
        message: 'Address deleted successfully.',
        severity: 'success',
      })
    },
  })

  if (editing) {
    return (
      <ApiForm<UpdateDeliveryAddressRequest>
        initialDataFetcher={async () => address}
        queryKey={['delivery-addresses', address._id]}
        successMessage="Address updated successfully."
        action={(data) => updateDeliveryAddress(username!, address._id, data)}
        buttonText="Update"
        fields={[
          { label: 'Address', property: 'address' },
          { label: 'City', property: 'city' },
          { label: 'Country', property: 'country' },
        ]}
        validator={UpdateDeliveryAddressValidator}
        onSuccess={() => {
          setEditing(false)
          queryClient.invalidateQueries(['delivery-addresses'])
        }}
      />
    )
  }

  return (
    <DetailsCard
      key={address._id}
      fields={[
        { label: 'Address', value: address.address },
        { label: 'City', value: address.city },
        { label: 'Country', value: address.country },
      ]}
    >
      <CardActions>
        <Stack direction="row" spacing={2}>
          <LoadingButton
            variant="outlined"
            onClick={() => deleteMutation.mutateAsync(address._id)}
            loading={deleteMutation.isLoading}
            color="error"
            startIcon={<Delete />}
          >
            Delete
          </LoadingButton>
          <Button
            variant="outlined"
            onClick={() => setEditing(!editing)}
            color="primary"
            startIcon={<Edit />}
          >
            Edit
          </Button>
        </Stack>
      </CardActions>
    </DetailsCard>
  )
}

export function DeliveryAddresses() {
  const [searchParams, _] = useSearchParams()
  const username = searchParams.get('username')

  const query = useQuery({
    queryKey: 'delivery-addresses',
    queryFn: () => getDeliveryAddresses(username!),
    enabled: !!username,
  })

  if (query.isLoading) {
    return <CardPlaceholder />
  }

  return (
    <Stack spacing={2}>
      <ApiForm<AddDeliveryAddressRequest>
        action={(data) => addDeliveryAddress(username!, data)}
        onSuccess={() => query.refetch()}
        fields={[
          { label: 'Address', property: 'address' },
          { label: 'City', property: 'city' },
          { label: 'Country', property: 'country' },
        ]}
        validator={AddDeliveryAddressValidator}
        successMessage="Address added successfully."
      />

      {query.data?.length === 0 && (
        <Alert severity="info">No delivery addresses found.</Alert>
      )}
      <Grid container spacing={2}>
        {query.data?.map((address) => (
          <Grid item md={4} xs={12}>
            <DeliveryAddress address={address} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}
