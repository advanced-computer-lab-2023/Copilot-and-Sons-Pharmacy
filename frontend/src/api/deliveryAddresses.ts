import {
  AddDeliveryAddressRequest,
  AddDeliveryAddressResponse,
  DeleteDeliveryAddressResponse,
  GetAllDeliveryAddressesResponse,
  UpdateDeliveryAddressRequest,
  UpdateDeliveryAddressResponse,
} from 'pharmacy-common/types/deliveryAddress.types'
import { api } from '.'

export function getDeliveryAddresses(patientUsername: string) {
  return api
    .get<GetAllDeliveryAddressesResponse>(
      `/patients/${patientUsername}/delivery-addresses`
    )
    .then((response) => response.data)
}

export function addDeliveryAddress(
  patientUsername: string,
  data: AddDeliveryAddressRequest
) {
  return api
    .post<AddDeliveryAddressResponse>(
      `/patients/${patientUsername}/delivery-addresses`,
      data
    )
    .then((response) => response.data)
}

export function deleteDeliveryAddress(
  patientUsername: string,
  deliveryAddressId: string
) {
  return api.delete<DeleteDeliveryAddressResponse>(
    `/patients/${patientUsername}/delivery-addresses/${deliveryAddressId}`
  )
}

export function updateDeliveryAddress(
  patientUsername: string,
  deliveryAddressId: string,
  data: UpdateDeliveryAddressRequest
) {
  return api.put<UpdateDeliveryAddressResponse>(
    `/patients/${patientUsername}/delivery-addresses/${deliveryAddressId}`,
    data
  )
}
