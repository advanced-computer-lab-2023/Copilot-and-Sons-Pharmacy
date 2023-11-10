import express from 'express'
import { addOrder, viewOrder } from '../controllers/order.controller'
const router = express.Router()

router.route('/addOrder').post(addOrder)
router.route('/viewOrder/:id').get(viewOrder)

export default router
