import Patient from '../schemas/patient.schema'
import AppError from '../utils/appError'
import { ERROR } from '../utils/httpStatusText'
import { IOrder, IOrderDocument, OrderModel } from '../schemas/order.model'
import Medicine from '../schemas/medicine.model'
import { CartModel } from '../schemas/cart.model'

export const addOrderService = async (info: IOrder) => {
  const { patientID, total, date, address, paymentMethod } = info
  const patient = await Patient.findById(patientID)
  if (!patient) throw new AppError('Patient not found', 404, ERROR)
  const cartObj = await CartModel.findById(patient.cart)
  if (!cartObj) throw new AppError('Cart not found', 404, ERROR)

  const cartID = patient.cart
  console.log('payment method is ' + paymentMethod)
  const newOrder: IOrderDocument = new OrderModel({
    patientID,
    total,
    date,
    cartID,
    address,
    paymentMethod,
  })
  console.log('new order is ' + newOrder)
  const cartItems = cartObj.items // array of cart items
  // console.log('cart items are ')
  // console.log(cartItems)

  for (const item of cartItems) {
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
  }

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
}
