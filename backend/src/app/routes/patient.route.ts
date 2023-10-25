import express from 'express';
import { getAllPatients, registerController } from '../controllers/patient.controller';
import { validateRegistrationData } from '../middlewares/registrationMiddleware';
import registrationValidator from '../validators/registration.validator';
import myCart from '../controllers/patient.controller';

const router=express.Router();
router.use(express.json());
router.route('/viewAllPatients').get(getAllPatients);
router.route('/register').post(
    validateRegistrationData(registrationValidator), 
   registerController);
router.route('/myCart').get(myCart);
export default router;