import express from 'express'
import {
  changeUserPassword,
  getAllPatients,
  registerController,
  requestOTP,
  updatePasswordController,
  verifyOTPController,
} from '../controllers/patient.controller'
import { validateRegistrationData } from '../middlewares/registrationMiddleware'
import registrationValidator from '../validators/registration.validator'

const router = express.Router()
router.use(express.json())
router.route('/viewAllPatients').get(getAllPatients)
router
  .route('/register')
  .post(validateRegistrationData(registrationValidator), registerController)
router.route('/changePassword').put(changeUserPassword)

router.route('/requestOtp').get(requestOTP)
router.route('/verifyOtp').get(verifyOTPController)
router.route('/updatePassword').put(updatePasswordController)

export default router
