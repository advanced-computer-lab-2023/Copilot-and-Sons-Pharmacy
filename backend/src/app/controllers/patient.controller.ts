import { Request, Response } from 'express'
import registerService from '../services/register.service'
import { SUCCESS } from '../utils/httpStatusText'
import asyncWrapper from '../middlewares/asyncWrapper'
import { fetchAllPatients } from '../services/viewAllPatients'
import getPatientByUsername from '../services/getPatient.service'
import { changePassowrd } from '../services/changePassword'
import { sendOTP, verifyOTP, updatePassword } from '../services/forgotPassowrd'
import { ERROR } from './../utils/httpStatusText'
import AppError from '../utils/appError'

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
      res.status(400).json({ error: 'Email not provided' })

      return
    }

    try {
      const result = await updatePassword(email, newPassword)
      res.json({ success: SUCCESS, message: result })
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }
)

export const changeUserPassword = asyncWrapper(
  async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body
    const username = req.username
    await changePassowrd(username!, oldPassword, newPassword)
    console.log(username)
    res.json({
      success: SUCCESS,
      message: 'Password changed successfulu',
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

export const getPatient = asyncWrapper(async (req: Request, res: Response) => {
  const patient = await getPatientByUsername(req.params.username)
  res.status(201).json({ status: SUCCESS, data: patient })
})
