import { CartModel } from '../../schemas/cart.model'
import Patient from '../../schemas/patient.schema'
import userModel from '../../schemas/user.model'
import AppError from '../../utils/appError'
import { FAIL } from '../../utils/httpStatusText'

export async function removeItemFromCartService(
  medicineId: any,
  username: any
) {
  const patientUser = await userModel.findOne({ username })
  const user = await Patient.findOne({ user: patientUser?._id })

  const cart = await CartModel.findOne({ _id: user?.cart })

  const medicineIndex = cart?.items.findIndex(
    (item: any) => item.medicine == medicineId
  )

  if (medicineIndex != undefined && medicineIndex == -1) {
    throw new AppError('No medicine with this id in the cart!', 404, FAIL)
  } else {
    cart?.items.splice(medicineIndex || -1, 1)
    await cart?.save()

    return cart
  }
}
