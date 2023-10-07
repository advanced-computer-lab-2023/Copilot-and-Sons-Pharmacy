import express from 'express';
import {registerController  }from '../controllers/patient.controller'
import { validateRegistrationData } from '../middlewares/registrationMiddleware';
const router=express.Router();
router.use(express.json());
router.route('/register').post(validateRegistrationData,registerController);


export default router;