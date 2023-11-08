import { APIError } from '../../errors'
import { CartModel } from '../../schemas/cart.model'
import Medicine from '../../schemas/medicine.model'
import Patient from '../../schemas/patient.schema'
import userModel from '../../schemas/user.model'
import AppError from '../../utils/appError'
import { FAIL } from '../../utils/httpStatusText'

export async function addToCartService(item: any, username: any) {
  const { medicineId, quantity } = item
  const medicine = await Medicine.findById(medicineId)

  if (!medicine) {
    throw new AppError('no Medicine with this name exists!', 404, FAIL)
  }

  const patientUser = await userModel.findOne({ username })
  const user = await Patient.findOne({ user: patientUser?._id })
  const cart = await CartModel.findOne({ _id: user?.cart })
  const medicineIndex = cart?.items.findIndex(
    (item:any) => item.medicine == medicineId
  )

  if (medicineIndex != undefined && medicineIndex > -1) {
    const medicineItem = cart?.items[medicineIndex]

    if (medicineItem != undefined && cart) {
      if(medicine.quantity< ~~quantity + ~~medicineItem.quantity)
      throw new APIError("this quantity is not available in stock",404,FAIL);
      medicineItem.quantity = ~~quantity + ~~medicineItem.quantity
      
      cart.items[medicineIndex] = medicineItem
    }
  } else {
    if(medicine.quantity< ~~quantity )
    throw new APIError("this quantity is not available in stock",404,FAIL);
    cart?.items?.push({ medicine: medicineId, quantity })
  }

  await cart?.save()

  return cart
}
