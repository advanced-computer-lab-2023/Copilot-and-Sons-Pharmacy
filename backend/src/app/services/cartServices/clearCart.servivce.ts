import { CartModel } from '../../schemas/cart.model'
import Patient from '../../schemas/patient.schema'
import { PrescriptionModel } from '../../schemas/prescription.model'
import userModel from '../../schemas/user.model'

export async function ClearCartService(username: any) {
  const patientUser = await userModel.findOne({ username })
  const user = await Patient.findOne({ user: patientUser?._id })

  const cart = await CartModel.findOne({ _id: user?.cart })

  if (!cart) {
    return null
  }

  cart.items.forEach(async (cartItem) => {
    if (cartItem.byPrescription !== null) {
      await PrescriptionModel.updateOne(
        { _id: cartItem.byPrescription },
        { $set: { isFilled: false } }
      )
    }
  })

  cart.items = []
  const updatedCart = await cart.save()

  return updatedCart
}
