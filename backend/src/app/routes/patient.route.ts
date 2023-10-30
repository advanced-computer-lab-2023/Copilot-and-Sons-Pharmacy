import express from 'express'
import {
  getAllPatients,
  registerController,
} from '../controllers/patient.controller'
import { validateRegistrationData } from '../middlewares/registrationMiddleware'
import registrationValidator from '../validators/registration.validator'

const router = express.Router()
router.use(express.json())
router.route('/viewAllPatients').get(getAllPatients)
router
  .route('/register')
  .post(validateRegistrationData(registrationValidator), registerController)

export default router
