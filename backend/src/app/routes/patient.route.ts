import express from 'express';
import { getAllPatients, registerController } from '../controllers/patient.controller';
import { validateRegistrationData } from '../middlewares/registrationMiddleware';
import registrationValidator from '../validators/registration.validator';
import { fetchAllPatients } from '../services/viewAllPatients';

const router=express.Router();
router.use(express.json());
router.route('/getAllPatients').get(getAllPatients);
router.route('/register').post(
    validateRegistrationData(registrationValidator), 
   registerController);
export default router;