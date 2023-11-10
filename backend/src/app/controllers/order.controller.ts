import asyncWrapper from '../middlewares/asyncWrapper'
import { SUCCESS } from '../utils/httpStatusText'
import { addOrderService } from '../services/addOrder.service'

export const addOrder = asyncWrapper(async (req, res) => {
  console.log(req.body)
  console.log(req.body.patientID)
  const order = await addOrderService(req.body)
  res.json({ success: SUCCESS, data: order })
})
