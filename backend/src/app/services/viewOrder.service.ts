import AppError from '../utils/appError'
import { ERROR } from '../utils/httpStatusText'
import { OrderModel } from '../schemas/order.model'

export const viewOrderService = async (id: string) => {
  try {
    const order = await OrderModel.findById(id)

    return order
  } catch (error) {
    console.log(error)
    throw new AppError('could not view order ', 400, ERROR)
  }
}
