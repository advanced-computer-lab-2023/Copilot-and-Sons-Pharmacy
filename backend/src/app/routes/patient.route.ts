import express from 'express';
import { registerController } from '../controllers/patient.controller';
import { validateRegistrationData } from '../middlewares/registrationMiddleware';
import registrationValidator from '../validators/registration.validator';

const router=express.Router();
router.use(express.json());
router.route('/register').post(
    validateRegistrationData(registrationValidator), 
   registerController);
export default router;