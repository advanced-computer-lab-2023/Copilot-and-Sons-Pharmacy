import nodemailer from 'nodemailer'
import Pharmacist, { IPharmacist } from '../schemas/pharmacist'
import { addUserNotification } from './notification.service'
import User from '../schemas/user.model'

export async function fetchAllPharmacists(): Promise<IPharmacist[]> {
  console.log('Fetching all Pharmacists...')
  const allPharmacists = await Pharmacist.find({})

  return allPharmacists
}

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'el7a2niii@gmail.com',
    pass: 'bavi qann luqe evhy',
  },
  tls: {
    rejectUnauthorized: false,
  },
})

export async function sendNotification(emailAddress: string, medName: string) {
  const mailOptions = {
    from: 'el7a2niii@gmail.com',
    to: emailAddress,
    subject: 'Medicine Out Of Stock',
    text: `Hello!
   
   This is an automated notification to inform you that our current stock of ${medName} is depleted.
      
    Please take immediate action to restock this medicine.

    Thank-you
    El7a2ni Team
      `,
  }
  console.log(medName)

  try {
    await transporter.sendMail(mailOptions)
    console.log('Notification sent successfully.')
  } catch (error) {
    console.error('Error sending notification:', error)
  }
}

export async function sendNotificationOnTheSystem(
  username: string,
  medName: string
) {
  const notification = {
    description: `Medicine ${medName} is out of stock`,
    title: 'Medicine Restock',
  }
  console.log('senttttttttttttt')

  addUserNotification({ username, notification })
}

export async function sendNotificationToAll(medName: string) {
  console.log('hi i am sending notifications now')
  const allPharmacists = await fetchAllPharmacists()

  allPharmacists.forEach(async (pharmacist) => {
    const emailAddress = pharmacist.email
    const pharmacistUser = await User.findById(pharmacist?.user).lean()
    const pharmacistUsername = pharmacistUser?.username

    if (pharmacistUsername) {
      console.log(pharmacistUsername)
      await sendNotificationOnTheSystem(pharmacistUsername, medName)
    }

    await sendNotification(emailAddress, medName)
  })
}
