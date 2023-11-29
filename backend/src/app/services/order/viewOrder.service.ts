import AppError from '../../utils/appError'
import { ERROR } from '../../utils/httpStatusText'
import { OrderModel } from '../../schemas/order.model'
import { CartModel } from '../../schemas/cart.model'
import Medicine from '../../schemas/medicine.model'

export const viewOrderService = async (id: string) => {
  try {
    const order = await OrderModel.findById(id)

    if (order) {
      const cartItem = await CartModel.findById(order.cartID)
      const medicines = []

      for (let i = 0; i < cartItem!.items.length; i++) {
        const medicineId = cartItem!.items[i].medicine
        const medicineQuantitiy = cartItem!.items[i].quantity

        // Fetch the associated Medicine using its ID
        const medicine = await Medicine.findById(medicineId)

        // Push the result into the 'medicines' array
        if (medicine) {
          medicine.quantity = medicineQuantitiy
          medicines.push(medicine)
        } else {
          console.error(`Medicine with ID ${medicineId} not found`)
        }
      }

      const resp = {
        ...order,
        medicines,
      }

      return resp
    } else {
      throw new AppError('could not view order ', 400, ERROR)
    }
  } catch (error) {
    console.log(error)
    throw new AppError('could not view order ', 400, ERROR)
  }
}
