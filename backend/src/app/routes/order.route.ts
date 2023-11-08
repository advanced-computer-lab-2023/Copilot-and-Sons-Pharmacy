import express from 'express'
import { addOrder } from '../controllers/order.controller'
const router = express.Router()

router.route('/addOrder').post(addOrder)

export default router
