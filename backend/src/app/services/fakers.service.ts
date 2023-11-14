import Administrator from '../schemas/administrator.model'
import { faker } from '@faker-js/faker'
import Pharmacist from '../schemas/pharmacist'
import Medicine from '../schemas/medicine.model'
import Patient from '../schemas/patient.schema'
import User from '../schemas/user.model'
import { UserType } from 'pharmacy-common/types/user.types'
import { hash } from 'bcrypt'
import { CartModel } from '../schemas/cart.model'
import { bcryptSalt } from '../config'

// Generate a random long number to be used in usernames to avoid duplicated usernames
function randomLongId() {
  return Math.floor(Math.random() * 100000000000000).toString()
}

// Generate a random short number to be used in emails to avoid duplicated emails
function randomShortId() {
  return Math.floor(Math.random() * 10000).toString()
}

// Generate a random username with a prefix, for example prefix = 'doctor' gives 'doctor_123456789'
function randomUsername(prefix: string) {
  return prefix + '_' + randomLongId()
}

// Generate a random email, 'mathewhany_1234243@gmail.com'
function randomEmail() {
  return faker.internet.userName() + '_' + randomShortId() + '@gmail.com'
}

export async function createFakeAdmin({
  username = randomUsername('admin'),
}: {
  username?: string
} = {}) {
  const user = await User.create({
    username,
    password: await hash('admin', bcryptSalt),
    type: UserType.Admin,
  })

  const admin = await Administrator.create({
    user: user.id,
    email: randomEmail(),
  })

  return await admin.populate('user')
}

export async function createFakePharmacist({
  username = randomUsername('pharmacist'),
  status = 'Accepted',
}: {
  username?: string
  status?: string
} = {}) {
  const user = await User.create({
    username,
    password: await hash('pharmacist', bcryptSalt),
    type: UserType.Pharmacist,
  })

  const pharmacist = await Pharmacist.create({
    user: user.id,
    name: faker.person.fullName(),
    email: randomEmail(),
    dateOfBirth: faker.date.past(),
    hourlyRate: faker.number.float({
      min: 10,
      max: 100,
    }),
    affilation: faker.company.name(),
    status,
    educationalBackground: {
      major: faker.helpers.arrayElement([
        'Pharmacy',
        'Medicine',
        'Chemistry',
        'Biology',
      ]),
      university: faker.company.name(),
      graduationYear: faker.date.future().getFullYear(),
      degree: faker.helpers.arrayElement([
        'Associate degree',
        "Bachelor's degree",
        "Master's degree",
        'Doctoral degree',
      ]),
    },
  })

  return await pharmacist.populate('user')
}

export async function createFakePatient({
  username = randomUsername('patient'),
}: {
  username?: string
} = {}) {
  const user = await User.create({
    username,
    password: await hash('patient', bcryptSalt),
    type: UserType.Patient,
  })
  const newCart = new CartModel({ items: [] })
  await newCart.save()

  const patient = await Patient.create({
    user: user.id,
    name: faker.person.fullName(),
    email: randomEmail(),
    dateOfBirth: faker.date.past(),
    gender: faker.helpers.arrayElement(['Male', 'Female']),
    mobileNumber: faker.phone.number(),
    cart: newCart._id,
    emergencyContact: {
      fullName: faker.person.fullName(),
      mobileNumber: faker.phone.number(),
      relation: faker.helpers.arrayElement([
        'Son',
        'Daughter',
        'Wife',
        'Husband',
      ]),
    },
    deliveryAddresses: [],
    orders: [],
    walletMoney: faker.number.float({
      min: 10000,
      max: 20000,
    }),
  })

  return await patient.populate('user')
}

export async function createFakeMedicine() {
  return await Medicine.create({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    quantity: faker.number.int({
      min: 0,
      max: 100,
    }),
    Image: faker.image.url(),
    activeIngredients: [
      faker.commerce.productMaterial(),
      faker.commerce.productMaterial(),
      faker.commerce.productMaterial(),
    ],
    medicinalUse: [
      faker.commerce.productMaterial(),
      faker.commerce.productMaterial(),
      faker.commerce.productMaterial(),
    ],
    sales: faker.number.int({
      min: 0,
      max: 100,
    }),
    requiresPrescription: faker.helpers.arrayElement([true, false]),
  })
}

export async function seed() {
  //mongoose.connection.db.dropDatabase()

  const admin = await createFakeAdmin({ username: 'admin' })
  const pharmacist = await createFakePharmacist({ username: 'pharmacist' })
  const patient = await createFakePatient({ username: 'patient' })

  for (let i = 0; i < 3; i++) {
    await createFakePharmacist({
      status: 'Pending',
    })
  }

  for (let i = 0; i < 10; i++) {
    await createFakeMedicine()
  }

  return {
    admin,
    pharmacist,
    patient,
  }
}
