import express from 'express';
import {registerController ,addPharmacist }from '../controllers/patient.controller'
import { validateRegistrationData } from '../middlewares/registrationMiddleware';
const router=express.Router();
router.use(express.json());
router.route('/register').post(validateRegistrationData,registerController);
router.post('/addPharmacist',addPharmacist)


export default router;