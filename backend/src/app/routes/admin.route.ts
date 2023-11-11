import express from 'express'
import {
  addAdmin,
  deleteUser,
  adminViewsPatientInfo,
  serachForMedicine,
  acceptPharmacistRequest,
  rejectPharmacistRequest,
} from '../controllers/admin.controller'
import {
  getAllPharmacists,
  getPendingPharmacists,
  getPharmacistByID,
  getAcceptedPharmacists,
} from '../controllers/admin.controller'
import userValidator from '../validators/user.validator'
import { validateRegistrationData } from '../middlewares/registrationMiddleware'

const router = express.Router()
router.use(express.json())
router
  .route('/add-admin')
  .post(validateRegistrationData(userValidator), addAdmin)
router.route('/getAllPharmacists').get(getAllPharmacists)
router.route('/getPendingPharmacists').get(getPendingPharmacists)
router.route('/getAcceptedPharmacists').get(getAcceptedPharmacists)
router.route('/getPharmacistByID/:id').get(getPharmacistByID)

router.route('/getMedicineByName/:name').get(serachForMedicine)
router.route('/patientInfo/:id').get(adminViewsPatientInfo)
router.route('/removeUser').delete(deleteUser)

router.route('/acceptPharmacistRequest/:id').patch(acceptPharmacistRequest)
router.route('/rejectPharmacistRequest/:id').patch(rejectPharmacistRequest)

export default router
