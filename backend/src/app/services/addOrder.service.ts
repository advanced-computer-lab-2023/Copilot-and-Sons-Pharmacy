import Patient from '../schemas/patient.schema'
import AppError from '../utils/appError'
import { ERROR } from '../utils/httpStatusText'
import { IOrder, IOrderDocument, OrderModel } from '../schemas/order.model'
import Medicine from '../schemas/medicine.model'

export const addOrderService = async (info: IOrder) => {
  try {
    const { patientID, cart, total, date } = info
    const patient = await Patient.findById(patientID)
    if (!patient) throw new AppError('Patient not found', 404, ERROR)

    const newOrder: IOrderDocument = new OrderModel({
      patientID,
      cart,
      total,
      date,
    })
    const cartItems = cart.items
    cartItems.forEach(async (item) => {
      const medicine = await Medicine.findById(item.medicine.id)
      if (!medicine) throw new AppError('Medicine not found', 404, ERROR)
      medicine.quantity = medicine.quantity - item.quantity
      await medicine.save()
    })

    await newOrder.save()
    const orders = patient.orders
    orders.push(newOrder.id)

    return newOrder
  } catch (error) {
    throw new AppError('could not add order ', 400, ERROR)
  }
}
