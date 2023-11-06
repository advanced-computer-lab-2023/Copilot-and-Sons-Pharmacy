import { z } from 'zod'

export const DeliveryAddressBaseValidator = z.object({
  address: z.string(),
  city: z.string(),
  country: z.string(),
})

export const AddDeliveryAddressValidator = DeliveryAddressBaseValidator

export const UpdateDeliveryAddressValidator = DeliveryAddressBaseValidator
