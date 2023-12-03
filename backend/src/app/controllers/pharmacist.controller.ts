import { Request, Response } from 'express'
import asyncWrapper from '../middlewares/asyncWrapper'
import { addPharmacistService } from '../services/addPharmacist.service'
import { allowAdmins } from '../middlewares/auth.middleware'
import { acceptPharmacist } from '../services/acceptPharmacist.service'
import { SUCCESS } from '../utils/httpStatusText'
import {
  getPharmacistService,
  rejectPharmacist,
} from '../services/rejectPharmacist.service'

export const addPharmacist = asyncWrapper(
  async (req: Request, res: Response) => {
    const result = await addPharmacistService({
      ...req.body,
      documents: req.files as Express.Multer.File[],
    })

    res.json(result)
  }
)

//accept pharmacist request
export const acceptPharmacistRequest = asyncWrapper(async (req, res) => {
  asyncWrapper(allowAdmins)
  const pharmacist = await acceptPharmacist(req.params.id)
  const name = pharmacist!.name
  res.json({
    success: SUCCESS,
    message: 'Pharmacist Request accepted successfully',
    name,
  })
})

//reject pharmacist request
export const rejectPharmacistRequest = asyncWrapper(async (req, res) => {
  asyncWrapper(allowAdmins)
  const pharmacist = await rejectPharmacist(req.params.id)
  const name = pharmacist!.name
  res.json({
    success: SUCCESS,
    message: 'Pharmacist Request rejected successfully',
    name,
  })
})

export const getPharmacist = asyncWrapper(async (req, res) => {
  const pharmacist = await getPharmacistService(req.params.username)
  res.json({
    success: SUCCESS,
    pharmacist,
  })
})
