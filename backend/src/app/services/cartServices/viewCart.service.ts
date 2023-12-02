import { CartModel, ICart } from '../../schemas/cart.model'
import Patient from '../../schemas/patient.schema'
import userModel from '../../schemas/user.model'

export async function viewCartService(username: any) {
  const patientUser = await userModel.findOne({ username })
  const patient = await Patient.findOne({ user: patientUser?._id })
  let cart = await CartModel.findOne({ _id: patient?.cart })

  if (cart == undefined && patientUser != null && patientUser != undefined) {
    console.log('Creating a new cart...')
    cart = await createNewCart(patient)
  }

  const user = await patient?.populate<{
    cart: ICart
  }>({
    path: 'cart',
    populate: {
      path: 'items.medicine',
      model: 'Medicine', // Replace with the correct model name
    },
  })

  return user?.cart.items
}

async function createNewCart(patientUser: any) {
  const newCart = new CartModel({ items: [] })
  await newCart.save()
  patientUser.cart = newCart._id
  await patientUser.save()

  return newCart
}
