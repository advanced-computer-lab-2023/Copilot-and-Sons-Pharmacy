import Medicine from '../../schemas/medicine.model'
import { PrescriptionModel } from '../../schemas/prescription.model'
import { APIError } from '../../errors'
import { CartModel } from '../../schemas/cart.model'
import Patient from '../../schemas/patient.schema'
import userModel from '../../schemas/user.model'
import AppError from '../../utils/appError'
import { FAIL } from '../../utils/httpStatusText'

export async function addPrescriptiontoCartService(
  prescriptionId: any,
  username: any
) {
  const prescription = await PrescriptionModel.findById(prescriptionId)

  if (prescription?.medicine) {
    for (let i = 0; i < prescription?.medicine.length; i++) {
      const medicinetoAdd = await Medicine.findOne({
        name: prescription?.medicine[i]?.name,
      })

      await addToCartMedicine(
        {
          medicineId: medicinetoAdd?._id,
          quantity: prescription?.medicine[i]?.quantity,
        },
        username,
        prescriptionId
      )
    }
  }

  await PrescriptionModel.updateOne(
    { _id: prescriptionId },
    { $set: { isFilled: true } }
  )
}

export async function addToCartMedicine(
  item: any,
  username: any,
  prescriptionId: any
) {
  const { medicineId, quantity } = item
  const medicine = await Medicine.findById(medicineId)

  if (!medicine) {
    throw new AppError('no Medicine with this name exists!', 404, FAIL)
  }

  const patientUser = await userModel.findOne({ username })
  const user = await Patient.findOne({ user: patientUser?._id })
  let cart = await CartModel.findOne({ _id: user?.cart })

  if (cart == undefined && patientUser != null && patientUser != undefined) {
    console.log('Creating a new cart...')
    cart = await createNewCart(user)
  }

  const medicineIndex = cart?.items.findIndex((item: any) =>
    item.medicine.equals(medicineId)
  )

  if (medicineIndex != undefined && medicineIndex > -1) {
    const medicineItem = cart?.items[medicineIndex]

    if (medicineItem != undefined && cart) {
      if (medicine.quantity < ~~quantity + ~~medicineItem.quantity)
        throw new APIError('this quantity is not available in stock', 404, FAIL)

      if (medicineItem.byPrescription == null) {
        medicineItem.byPrescription = prescriptionId
      }

      medicineItem.quantity = ~~quantity + ~~medicineItem.quantity

      cart.items[medicineIndex] = medicineItem
    }
  } else {
    if (medicine.quantity < ~~quantity)
      throw new APIError('this quantity is not available in stock', 404, FAIL)
    cart?.items?.push({
      medicine: medicineId,
      quantity,
      byPrescription: prescriptionId,
    })
  }

  await cart?.save()

  return cart
}

async function createNewCart(patientUser: any) {
  const newCart = new CartModel({ items: [] })
  await newCart.save()
  patientUser.cart = newCart._id
  await patientUser.save()

  return newCart
}
