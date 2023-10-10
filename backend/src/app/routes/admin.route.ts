import express from'express';
import { addAdmin, deleteUser, adminViewsPatientInfo, serachForMedicine, filterMedicineByMedicinalUse } from '../controllers/admin.controller';
import {  getAllPharmacists , getPendingPharmacists , getPharmacistByID } from '../controllers/admin.controller';
import userValidator from '../validators/user.validator';
import { validateRegistrationData } from '../middlewares/registrationMiddleware';

const router=express.Router();
router.use(express.json());
router.route('/add-admin').post(validateRegistrationData(userValidator),addAdmin)
router.get('/getAllPharmacists',getAllPharmacists)
router.get('/getPendingPharmacists',getPendingPharmacists)
router.get('/getPharmacistByID/:id',getPharmacistByID)

router.route('/getMedicineByName').get(serachForMedicine);
router.route('/getPatientByUsername').get(adminViewsPatientInfo);
router.delete('/removeUser',deleteUser)



export default router;

