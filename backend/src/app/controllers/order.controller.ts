import asyncWrapper from '../middlewares/asyncWrapper'
import { SUCCESS } from '../utils/httpStatusText'
import { addOrderService } from '../services/addOrder.service'
import { viewOrderService } from '../services/viewOrder.service'

export const addOrder = asyncWrapper(async (req, res) => {
  // console.log(req.body)
  // console.log(req.body.patientID)
  const order = await addOrderService(req.body)
  res.json({ success: SUCCESS, data: order })
})

export const viewOrder = asyncWrapper(async (req, res) => {
  const order = await viewOrderService(req.params.id)
  res.json({ success: SUCCESS, data: order })
})
