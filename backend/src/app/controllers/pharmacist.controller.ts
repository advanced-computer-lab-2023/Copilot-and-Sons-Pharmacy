import { Request, Response } from 'express'
import asyncWrapper from '../middlewares/asyncWrapper'
import { addPharmacistService } from '../services/addPharmacist.service'

export const addPharmacist = asyncWrapper(
  async (req: Request, res: Response) => {
    const result = await addPharmacistService(req.body)

    res.json(result)
  }
)
