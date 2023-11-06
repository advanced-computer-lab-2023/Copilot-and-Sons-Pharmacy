import { Request, Response } from 'express'
import registerService from '../services/register.service'
import { SUCCESS } from '../utils/httpStatusText'
import asyncWrapper from '../middlewares/asyncWrapper'
import { fetchAllPatients } from '../services/viewAllPatients'

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
