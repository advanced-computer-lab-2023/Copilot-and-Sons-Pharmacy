import { Request, Response } from 'express'
import registerService from '../services/register.service'
import { SUCCESS } from '../utils/httpStatusText'
import asyncWrapper from '../middlewares/asyncWrapper'
import { fetchAllPatients } from '../services/viewAllPatients'
import { changePassowrd } from '../services/changePassword'
import { sendOTP, verifyOTP, updatePassword } from '../services/forgotPassowrd'
import { ERROR } from './../utils/httpStatusText'

export const requestOTP = asyncWrapper(async (req: Request, res: Response) => {
  const { email } = req.body

  if (email) {
    await sendOTP(email)
    res.json({ success: SUCCESS, message: 'OTP sent successfully' })
  }
})

export const verifyOTPController = asyncWrapper(
  async (req: Request, res: Response) => {
    console.log('heyy i entered')
    const { otp, email } = req.body

    const isOTPValid = await verifyOTP(email, otp)

    if (isOTPValid) {
      res.json({ success: SUCCESS, message: 'OTP verified successfully' })
    } else {
      res.json({ error: ERROR, message: 'not verified' })
    }
  }
)

export const updatePasswordController = asyncWrapper(
  async (req: Request, res: Response) => {
    const { newPassword, email } = req.body

    if (!email) {
      res.json({ error: 'Email not provided' })

      return
    }

    await updatePassword(email, newPassword)

    res.json({ success: SUCCESS, message: 'Password updated successfully' })
  }
)

export const changeUserPassword = asyncWrapper(
  async (req: Request, res: Response) => {
    const { username, oldPassword, newPassword } = req.body
    await changePassowrd(username, oldPassword, newPassword)
    res.json({
      success: SUCCESS,
      message: 'Password changed successfulu',
      username,
    })
  }
)

export const getAllPatients = asyncWrapper(
  async (req: Request, res: Response) => {
    console.log('hi i am here')
    const patients = await fetchAllPatients()

    if (!patients) {
      console.log('not found')
    }

    console.log(patients)
    res.status(200).json({ success: SUCCESS, data: patients })
  }
)

export const registerController = asyncWrapper(
  async (req: Request, res: Response) => {
    const patient = await registerService(req.body)
    res.status(201).json({ status: SUCCESS, data: patient })
  }
)
