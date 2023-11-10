import express from 'express'
import { addOrder, viewOrders } from '../controllers/order.controller'
const router = express.Router()

router.route('/addOrder').post(addOrder)
router.route('/orders').get(viewOrders)

export default router
