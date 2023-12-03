import { IOrderDocument, OrderModel } from '../../schemas/order.model'
import Patient from '../../schemas/patient.schema'
import User from '../../schemas/user.model'

export async function fetchAllOrders(id: string): Promise<IOrderDocument[]> {
  const user = await User.findOne({ username: id })
  const patient = await Patient.findOne({ user: user?._id })
  const patientId = patient?._id

  const allOrders = await OrderModel.find({ patientID: patientId })

  return allOrders
}
