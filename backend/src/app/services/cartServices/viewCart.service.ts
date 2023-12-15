import { CartModel, ICart } from '../../schemas/cart.model'
import { HealthPackageDocument } from '../../schemas/healthPackage.model'
import Patient from '../../schemas/patient.schema'
import userModel from '../../schemas/user.model'
import { applyDiscount } from '../medicine/discount.service'

export async function viewCartService(username: any) {
  const patientUser = await userModel.findOne({ username })
  const patient = await Patient.findOne({ user: patientUser?._id }).populate<{
    healthPackage: HealthPackageDocument
  }>('healthPackage')

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

  return user?.cart.items.map((item) => ({
    medicine: {
      ...item.medicine.toJSON(),
      discountedPrice: patient
        ? applyDiscount(item.medicine, patient)
        : item.medicine.price,
    },
    quantity: item.quantity,
    byPrescription: item.byPrescription,
  }))
}

async function createNewCart(patientUser: any) {
  const newCart = new CartModel({ items: [] })
  await newCart.save()
  patientUser.cart = newCart._id
  await patientUser.save()

  return newCart
}
