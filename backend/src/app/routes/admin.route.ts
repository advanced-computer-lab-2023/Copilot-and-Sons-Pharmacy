import express from 'express'
import {
  addAdmin,
  deleteUser,
  adminViewsPatientInfo,
  serachForMedicine,
  acceptPharmacistRequest,
  rejectPharmacistRequest,
  getAllUsers,
} from '../controllers/admin.controller'
import {
  getAllPharmacists,
  getPendingPharmacists,
  getPharmacistByID,
  getAcceptedPharmacists,
} from '../controllers/admin.controller'
import { validateRegistrationData } from '../middlewares/registrationMiddleware'
import { allowAdmins } from '../middlewares/auth.middleware'
import asyncWrapper from '../middlewares/asyncWrapper'
import adminValidator from '../validators/admin.validator'

const router = express.Router()
router.use(express.json())
router
  .route('/add-admin')
  .post(
    validateRegistrationData(adminValidator),
    asyncWrapper(allowAdmins),
    addAdmin
  )
router
  .route('/getAllPharmacists')
  .get(asyncWrapper(allowAdmins), getAllPharmacists)
router
  .route('/getPendingPharmacists')
  .get(asyncWrapper(allowAdmins), getPendingPharmacists)
router.route('/getAcceptedPharmacists').get(getAcceptedPharmacists)
router
  .route('/getPharmacistByID/:id')
  .get(asyncWrapper(allowAdmins), getPharmacistByID)
router.route('/getAllPharmacists').get(getAllPharmacists)
router.route('/getPendingPharmacists').get(getPendingPharmacists)
router.route('/getAcceptedPharmacists').get(getAcceptedPharmacists)
router.route('/getPharmacistByID/:id').get(getPharmacistByID)

router.route('/getMedicineByName/:name').get(serachForMedicine)
router.route('/patientInfo/:id').get(adminViewsPatientInfo)
router.route('/removeUser').delete(deleteUser)

router
  .route('/acceptPharmacistRequest/:id')
  .patch(asyncWrapper(allowAdmins), acceptPharmacistRequest)
router
  .route('/rejectPharmacistRequest/:id')
  .patch(asyncWrapper(allowAdmins), rejectPharmacistRequest)

router.route('/getAllUsers').get(asyncWrapper(allowAdmins), getAllUsers)

export default router
