import { z } from 'zod'
import { AddDeliveryAddressValidator } from '../validators/deliveryAddress.validator'

interface DeliveryAddressBase {
  _id: string
  address: string
  city: string
  country: string
}

export type AddDeliveryAddressRequest = z.infer<
  typeof AddDeliveryAddressValidator
>

export type AddDeliveryAddressResponse = DeliveryAddressBase[]

export type UpdateDeliveryAddressRequest = z.infer<
  typeof AddDeliveryAddressValidator
>

export type UpdateDeliveryAddressResponse = DeliveryAddressBase[]

export type DeleteDeliveryAddressResponse = void

export type GetAllDeliveryAddressesRequest = void

export type GetAllDeliveryAddressesResponse = DeliveryAddressBase[]
