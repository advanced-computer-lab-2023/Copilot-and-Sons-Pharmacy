import { CartModel } from '../../schemas/cart.model'
import { OrderModel } from '../../schemas/order.model'

export const searchReportByDate = async (date: string) => {
  console.log(date)
  //typecast date to date type
  const DateType = new Date(date)
  DateType.setDate(DateType.getDate() + 2)
  console.log(DateType.getDate(), DateType.getMonth(), DateType.getFullYear())

  const startDate = new Date(
    DateType.getFullYear(),
    DateType.getMonth(),
    DateType.getDate()
  )
  const endDate = new Date(
    DateType.getFullYear(),
    DateType.getMonth(),
    DateType.getDate() + 1
  )

  const orders = await OrderModel.find({
    date: { $gte: startDate, $lt: endDate },
  })

  console.log(DateType)
  const medicineMap = new Map()

  const orderPromises = orders.map(async (order) => {
    const cart = await CartModel.findById(order.cartID)
      .lean()
      .populate('items.medicine')
    const cartItems = cart?.items

    if (cartItems) {
      for (const cartItem of cartItems) {
        const medicine = cartItem.medicine

        if (medicine) {
          if (medicineMap.has(medicine.name)) {
            const medicineQuantity = medicineMap.get(medicine.name)
            medicineMap.set(medicine.name, medicineQuantity + cartItem.quantity)
          } else {
            medicineMap.set(medicine.name, cartItem.quantity)
          }
        } else {
          console.log('no cart')
        }
      }
    }
  })

  await Promise.all(orderPromises)

  const medicineArray = Array.from(medicineMap, ([name, quantity]) => ({
    name,
    sales: quantity,
  }))

  return medicineArray
}

export const searchReportByMonth = async (month: string) => {
  console.log(month)
  const DateType = new Date(month)
  DateType.setDate(DateType.getDate() + 2)

  const startDate = new Date(DateType.getFullYear(), DateType.getMonth())
  const endDate = new Date(DateType.getFullYear(), DateType.getMonth() + 1)

  const orders = await OrderModel.find({
    date: { $gte: startDate, $lt: endDate },
  })

  console.log(DateType)
  const medicineMap = new Map()

  const orderPromises = orders.map(async (order) => {
    const cart = await CartModel.findById(order.cartID)
      .lean()
      .populate('items.medicine')
    const cartItems = cart?.items

    if (cartItems) {
      for (const cartItem of cartItems) {
        const medicine = cartItem.medicine

        if (medicine) {
          if (medicineMap.has(medicine.name)) {
            const medicineQuantity = medicineMap.get(medicine.name)
            medicineMap.set(medicine.name, medicineQuantity + cartItem.quantity)
          } else {
            medicineMap.set(medicine.name, cartItem.quantity)
          }
        } else {
          console.log('no cart')
        }
      }
    }
  })

  await Promise.all(orderPromises)

  const medicineArray = Array.from(medicineMap, ([name, quantity]) => ({
    name,
    sales: quantity,
  }))

  return medicineArray
}
