import { CartModel } from '../../schemas/cart.model'
import Medicine from '../../schemas/medicine.model'
import { OrderModel } from '../../schemas/order.model'

export const searchReportByDate = async (date: string) => {
  console.log(date)
  //typecast date to date type
  const DateType = new Date(date)
  DateType.setDate(DateType.getDate() + 2)
  console.log(DateType.getDate(), DateType.getMonth(), DateType.getFullYear())

  const orders = await OrderModel.find({})
  // console.log(orders)
  const allOrders = await OrderModel.find({})
  console.log(allOrders)
  console.log(DateType)
  const medicineMap = new Map()

  for (let i = 0; i < orders.length; i++) {
    if (
      orders[i].date.getMonth() == DateType.getMonth() &&
      orders[i].date.getFullYear() == DateType.getFullYear() &&
      orders[i].date.getDate() == DateType.getDate()
    ) {
      const order = orders[i]
      const cart = await CartModel.findById(order.cartID)
      const cartItems = cart?.items

      if (cartItems) {
        for (let j = 0; j < cartItems.length; j++) {
          const cartItem = cartItems[j]
          const medicine = await Medicine.findById(cartItem.medicine)

          if (medicine) {
            if (medicineMap.has(medicine.name)) {
              const medicineQuantity = medicineMap.get(medicine.name)
              medicineMap.set(
                medicine.name,
                medicineQuantity + cartItem.quantity
              )
            } else {
              medicineMap.set(medicine.name, cartItem.quantity)
            }
          } else {
            console.log('no cart')
          }
        }
      }
    }
  }

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

  const orders = await OrderModel.find({})

  const medicineMap = new Map()

  for (let i = 0; i < orders.length; i++) {
    if (
      orders[i].date.getMonth() == DateType.getMonth() &&
      orders[i].date.getFullYear() == DateType.getFullYear()
    ) {
      const order = orders[i]
      const cart = await CartModel.findById(order.cartID)
      const cartItems = cart?.items

      if (cartItems) {
        for (let j = 0; j < cartItems.length; j++) {
          const cartItem = cartItems[j]
          const medicine = await Medicine.findById(cartItem.medicine)

          if (medicine) {
            if (medicineMap.has(medicine.name)) {
              const medicineQuantity = medicineMap.get(medicine.name)
              medicineMap.set(
                medicine.name,
                medicineQuantity + cartItem.quantity
              )
            } else {
              medicineMap.set(medicine.name, cartItem.quantity)
            }
          } else {
            console.log('no cart')
          }
        }
      }
    }
  }

  const medicineArray = Array.from(medicineMap, ([name, quantity]) => ({
    name,
    sales: quantity,
  }))

  return medicineArray
}
