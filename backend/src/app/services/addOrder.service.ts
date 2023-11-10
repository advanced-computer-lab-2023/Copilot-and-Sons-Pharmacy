import Patient from '../schemas/patient.schema'
import AppError from '../utils/appError'
import { ERROR } from '../utils/httpStatusText'
import { IOrder, IOrderDocument, OrderModel } from '../schemas/order.model'
import Medicine from '../schemas/medicine.model'
import { CartModel } from '../schemas/cart.model'

export const addOrderService = async (info: IOrder) => {
  try {
    const { patientID, total, date } = info
    const patient = await Patient.findById(patientID)
    if (!patient) throw new AppError('Patient not found', 404, ERROR)
    const cartObj = await CartModel.findById(patient.cart)
    if (!cartObj) throw new AppError('Cart not found', 404, ERROR)

    const cartID = patient.cart
    const newOrder: IOrderDocument = new OrderModel({
      patientID,
      total,
      date,
      cartID,
    })
    const cartItems = cartObj.items // array of cart items
    console.log('cart items are ')
    console.log(cartItems)

    cartItems.forEach(async (item: any) => {
      const medicine = await Medicine.findById(item.medicine)

      if (!medicine) throw new AppError('Medicine not found', 404, ERROR)
      //   console.log(medicine.quantity)
      //     console.log(item.quantity)
      if (medicine.quantity < item.quantity)
        throw new AppError(
          `Medicine ${medicine.name} is out of stock`,
          400,
          ERROR
        )
      medicine.quantity = medicine.quantity - item.quantity
      await medicine.save()
    })

    await newOrder.save()
    const orders = patient.orders
    orders.push(newOrder.id)

    const newCart = new CartModel({
      items: [],
    })

    await newCart.save()
    patient.orders = orders
    patient.cart = newCart.id
    console.log('new cart id is ' + newCart.id)
    await patient.save()

    return newOrder
  } catch (error) {
    console.log(error)
    throw new AppError('could not add order ', 400, ERROR)
  }
}
