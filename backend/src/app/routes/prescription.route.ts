import express from 'express'
import { prescriptionController } from '../controllers/prescription.controller'

const router = express.Router()
router.use(express.json())
router.route('/add-medicine').post(prescriptionController)

export default router
