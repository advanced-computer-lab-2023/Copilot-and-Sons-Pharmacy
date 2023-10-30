import { Router } from 'express'
import asyncWrapper from '../middlewares/asyncWrapper'
import {
  AddDeliveryAddressRequest,
  AddDeliveryAddressResponse,
  GetAllDeliveryAddressesRequest,
  GetAllDeliveryAddressesResponse,
  UpdateDeliveryAddressRequest,
  UpdateDeliveryAddressResponse,
} from 'pharmacy-common/types/deliveryAddress.types'
import {
  addDeliveryAddress,
  deleteDeliveryAddress,
  getAllDeliveryAddresses,
  updateDeliveryAddress,
} from '../services/deliveryAddress.service'
import {
  AddDeliveryAddressValidator,
  UpdateDeliveryAddressValidator,
} from 'pharmacy-common/validators/deliveryAddress.validator'
import { validate } from '../middlewares/validation.middleware'

export const deliveryAddressRouter = Router()

deliveryAddressRouter.get(
  '/patients/:patientUsername/delivery-addresses',
  asyncWrapper<GetAllDeliveryAddressesRequest>(async (req, res) => {
    const deliveryAddresses = await getAllDeliveryAddresses(
      req.params.patientUsername
    )

    res.send(deliveryAddresses satisfies GetAllDeliveryAddressesResponse)
  })
)

deliveryAddressRouter.post(
  '/patients/:patientUsername/delivery-addresses',
  validate(AddDeliveryAddressValidator),
  asyncWrapper<AddDeliveryAddressRequest>(async (req, res) => {
    const deliveryAddresses = await addDeliveryAddress(
      req.params.patientUsername,
      req.body
    )

    res.send(deliveryAddresses satisfies AddDeliveryAddressResponse)
  })
)

deliveryAddressRouter.put(
  '/patients/:patientUsername/delivery-addresses/:deliveryAddressId',
  validate(UpdateDeliveryAddressValidator),
  asyncWrapper<UpdateDeliveryAddressRequest>(async (req, res) => {
    const deliveryAddresses = await updateDeliveryAddress(
      req.params.patientUsername,
      req.params.deliveryAddressId,
      req.body
    )

    res.send(deliveryAddresses satisfies UpdateDeliveryAddressResponse)
  })
)

deliveryAddressRouter.delete(
  '/patients/:patientUsername/delivery-addresses/:deliveryAddressId',
  asyncWrapper(async (req, res) => {
    await deleteDeliveryAddress(
      req.params.patientUsername,
      req.params.deliveryAddressId
    )

    res.status(204).send()
  })
)
