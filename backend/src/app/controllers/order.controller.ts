import { Request, Response } from 'express'
import asyncWrapper from '../middlewares/asyncWrapper'
import { SUCCESS } from '../utils/httpStatusText'
import { addOrderService } from '../services/addOrder.service'

export const addOrder = asyncWrapper(async (req: Request, res: Response) => {
  const order = await addOrderService(req.body)
  res.json({ success: SUCCESS, data: order })
})
