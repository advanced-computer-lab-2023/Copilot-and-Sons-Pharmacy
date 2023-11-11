import AppError from '../utils/appError'
import { ERROR } from '../utils/httpStatusText'
import { OrderModel } from '../schemas/order.model'
import Medicine from '../schemas/medicine.model'
import { CartModel } from '../schemas/cart.model'

export const cancelOrderService = async (ID: string) => {
  try {
    const order = await OrderModel.findById(ID)

    if (!order) {
      throw new AppError('Order not found', 404, ERROR)
    }

    if (order.status === 'cancelled') {
      throw new AppError('Order already cancelled', 400, ERROR)
    }

    const cart = await CartModel.findById(order.cartID)

    if (!cart) {
      throw new AppError("Cart doesn't exist", 404, ERROR)
    }

    for (const item of cart.items) {
      const medicine = await Medicine.findById(item.medicine)

      if (!medicine) {
        throw new AppError('Medicine not found', 404, ERROR)
      }

      medicine.quantity += item.quantity
      await medicine.save()
    }

    order.status = 'cancelled'
    await order.save()

    return order
  } catch (error) {
    throw new AppError('Could not cancel order', 400, ERROR)
  }
}
