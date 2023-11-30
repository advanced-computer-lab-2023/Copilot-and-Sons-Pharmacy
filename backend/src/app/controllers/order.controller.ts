import asyncWrapper from '../middlewares/asyncWrapper'
import { SUCCESS } from '../utils/httpStatusText'
import { addOrderService } from '../services/order/addOrder.service'

import { fetchAllOrders } from '../services/order/viewOrders.service'

import { viewOrderService } from '../services/order/viewOrder.service'
import { cancelOrderService } from '../services/order/cancelOrder.service'

export const addOrder = asyncWrapper(async (req, res) => {
  // console.log(req.body)
  // console.log(req.body.patientID)
  const order = await addOrderService(req.body)
  res.json({ success: SUCCESS, data: order })
})

export const viewOrders = asyncWrapper(async (req, res) => {
  const username = req.username
  const orders = await fetchAllOrders(username!)

  res.json({ success: SUCCESS, data: orders })
})

export const viewOrder = asyncWrapper(async (req, res) => {
  const order = await viewOrderService(req.params.id)
  res.json({ success: SUCCESS, data: order })
})

export const cancelOrder = asyncWrapper(async (req, res) => {
  const order = await cancelOrderService(req.params.id)
  res.json({ success: SUCCESS, data: order })
})
