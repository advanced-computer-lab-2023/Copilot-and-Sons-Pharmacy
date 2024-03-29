import express from 'express'

import {
  addOrder,
  viewOrder,
  viewOrders,
  cancelOrder,
} from '../controllers/order.controller'
const router = express.Router()

router.route('/addOrder').post(addOrder)
router.route('/orders').get(viewOrders)
router.route('/viewOrder/:id').get(viewOrder)
router.route('/cancelOrder/:id').get(cancelOrder)

export default router
