import asyncWrapper from '../middlewares/asyncWrapper'
import { SUCCESS } from '../utils/httpStatusText'
import { addOrderService } from '../services/addOrder.service'
import { fetchAllOrders } from '../services/viewOrders.service'

export const addOrder = asyncWrapper(async (req, res) => {
  console.log(req.body)
  console.log(req.body.patientID)
  const order = await addOrderService(req.body)
  res.json({ success: SUCCESS, data: order })
})

export const viewOrders = asyncWrapper(async (req, res) => {
  const username = req.username
  const orders = await fetchAllOrders(username!)

  res.json({ success: SUCCESS, data: orders })
})
