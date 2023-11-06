import {
  AddDeliveryAddressRequest,
  GetAllDeliveryAddressesResponse,
  UpdateDeliveryAddressRequest,
} from 'pharmacy-common/types/deliveryAddress.types'
import Patient from '../schemas/patient.schema'
import { NotFoundError } from '../utils/appError'
import User from '../schemas/user.model'

export async function addDeliveryAddress(
  patientUsername: string,
  request: AddDeliveryAddressRequest
) {
  const user = await User.findOne({ username: patientUsername })

  if (!user) {
    throw new NotFoundError()
  }

  const patient = await Patient.findOneAndUpdate(
    { user: user.id },
    {
      $push: {
        deliveryAddresses: request,
      },
    },
    {
      new: true,
    }
  )

  if (!patient) {
    throw new NotFoundError()
  }

  return patient.deliveryAddresses as GetAllDeliveryAddressesResponse
}

export async function updateDeliveryAddress(
  patientUsername: string,
  deliveryAddressId: string,
  request: UpdateDeliveryAddressRequest
) {
  const user = await User.findOne({ username: patientUsername })

  if (!user) {
    throw new NotFoundError()
  }

  const patient = await Patient.findOneAndUpdate(
    { user: user.id, 'deliveryAddresses._id': deliveryAddressId },
    {
      $set: {
        'deliveryAddresses.$.address': request.address,
        'deliveryAddresses.$.city': request.city,
        'deliveryAddresses.$.country': request.country,
      },
    },
    {
      new: true,
    }
  )

  if (!patient) {
    throw new NotFoundError()
  }

  return patient.deliveryAddresses as GetAllDeliveryAddressesResponse
}

export async function deleteDeliveryAddress(
  patientUsername: string,
  deliveryAddressId: string
) {
  const user = await User.findOne({ username: patientUsername })

  if (!user) {
    throw new NotFoundError()
  }

  const patient = await Patient.findOneAndUpdate(
    { user: user.id },
    {
      $pull: {
        deliveryAddresses: {
          _id: deliveryAddressId,
        },
      },
    },
    {
      new: true,
    }
  )

  if (!patient) {
    throw new NotFoundError()
  }

  return patient.deliveryAddresses as GetAllDeliveryAddressesResponse
}

export async function getAllDeliveryAddresses(patientUsername: string) {
  const user = await User.findOne({ username: patientUsername })

  if (!user) {
    throw new NotFoundError()
  }

  const patient = await Patient.findOne({ user: user.id })

  if (!patient) {
    throw new NotFoundError()
  }

  return patient.deliveryAddresses as GetAllDeliveryAddressesResponse
}
