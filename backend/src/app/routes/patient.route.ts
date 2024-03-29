import express from 'express'
import {
  changeUserPassword,
  getAllPatients,
  registerController,
  getPatient,
  requestOTP,
  updatePasswordController,
  verifyOTPController,
} from '../controllers/patient.controller'
import { validateRegistrationData } from '../middlewares/registrationMiddleware'
import registrationValidator from '../validators/registration.validator'

const router = express.Router()
router.use(express.json())
router.route('/viewAllPatients').get(getAllPatients)
router.route('/getPatient/:username').get(getPatient)
router
  .route('/register')
  .post(validateRegistrationData(registrationValidator), registerController)
router.route('/changePassword').put(changeUserPassword)
router.route('/updatePassword').put(updatePasswordController)
router.route('/requestOtp').post(requestOTP)
router.route('/verifyOtp').post(verifyOTPController)

export default router
