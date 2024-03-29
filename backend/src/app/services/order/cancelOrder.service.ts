import AppError from '../../utils/appError'
import { ERROR } from '../../utils/httpStatusText'
import { OrderModel } from '../../schemas/order.model'
import Medicine from '../../schemas/medicine.model'
import { CartModel } from '../../schemas/cart.model'
import Patient from '../../schemas/patient.schema'

export const cancelOrderService = async (ID: string) => {
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
    medicine.sales -= item.quantity
    await medicine.save()
  }

  // refund order total to wallet if payment method is wallet or card
  if (
    order.paymentMethod === 'Wallet' ||
    order.paymentMethod === 'Credit card'
  ) {
    const patient = await Patient.findById(order.patientID)

    if (!patient) {
      throw new AppError('Patient not found', 404, ERROR)
    }

    patient.walletMoney += order.total
    await patient.save()
  }

  order.status = 'cancelled'
  await order.save()

  return order
}
