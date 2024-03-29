import nodemailer from 'nodemailer'
import Pharmacist from '../schemas/pharmacist'
import Patient from '../schemas/patient.schema'
import User from '../schemas/user.model'
import { IUser } from '../schemas/user.model'
import bcrypt from 'bcrypt'
import OTPModel from '../schemas/otp'
import AppError from '../utils/appError'
import {
  getPasswordStrengthReason,
  isStrongPassword,
} from '../validators/password.validator'
import { ERROR } from '../utils/httpStatusText'
import { bcryptSalt } from './auth.service'
import Administrator from '../schemas/administrator.model'

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

async function generateOTP(email: string): Promise<string> {
  const length = 6
  const charset = '0123456789'
  let otp = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    otp += charset[randomIndex]
  }

  const expiresAt = new Date()
  expiresAt.setMinutes(expiresAt.getMinutes() + 10)
  const user = await verifyMail(email)

  if (user !== null) {
    const newOtp = new OTPModel({
      email,
      otp,
      expiresAt,
    })

    newOtp.save()
    console.log('OTP saved to the database successfully.')
  } else {
    throw new AppError('Mail not found', 401, ERROR)
  }

  return otp
}

export async function verifyMail(emailAddress: string) {
  let user: IUser | null = null
  const userPharmacist = await Pharmacist.findOne({ email: emailAddress })
  const userPatient = await Patient.findOne({ email: emailAddress })
  const userAdmin = await Administrator.findOne({ email: emailAddress })

  if (userPharmacist) {
    user = await User.findOne(userPharmacist.user)
  } else if (userPatient) {
    user = await User.findOne(userPatient.user)
  } else if (userAdmin) {
    user = await User.findOne(userAdmin.user)
  }

  if (user) return user
  else return null
}

export async function sendOTP(emailAddress: string) {
  const otp = await generateOTP(emailAddress)

  if (otp) {
    const mailOptions = {
      from: 'el7a2niii@gmail.com',
      to: emailAddress,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp} , please don't share this number with anyone. This code expires in 10 minutes`,
    }
    console.log(otp)

    try {
      await transporter.sendMail(mailOptions)
      console.log('OTP sent successfully.')
    } catch (error) {
      console.error('Error sending OTP:', error)
    }
  }
}

export async function verifyOTP(email: string, enteredOtp: string) {
  const allOTPs = await OTPModel.find({ email })

  const nonExpiredOTPs = allOTPs.filter((otp) => !isExpired(otp.expiresAt))

  const sentOtp = nonExpiredOTPs.find((otp) => otp.otp === enteredOtp)

  if (sentOtp) {
    await OTPModel.deleteMany({ email })

    return true
  } else throw new AppError('Incorrect verification code', 401, ERROR)
}

function isExpired(expiryDate: Date) {
  const currentDateTime = new Date()

  return currentDateTime > expiryDate
}

export async function updatePassword(email: string, newPassowrd: string) {
  const user = await verifyMail(email)

  if (user) {
    if (isStrongPassword(newPassowrd)) {
      try {
        const pass = await bcrypt.hash(newPassowrd, bcryptSalt)
        user.password = pass
        await user.save()
      } catch (error) {
        console.error('Error updating password:', error)
        throw new AppError('Password update failed', 500, ERROR)
      }
    } else {
      throw new AppError(getPasswordStrengthReason(newPassowrd), 401, ERROR)
    }
  }
}
