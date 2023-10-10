import express from 'express';
import { addMedicine, addPharmacist  }from '../controllers/pharmacist.controller'
import cors from 'cors';
import {pharmacistValidator} from '../validators/pharmacist.validator';
import { validateRegistrationData } from '../middlewares/registrationMiddleware';
const router=express.Router();
router.use(cors());
router.use(express.json());
router.route('/addPharmacist').post( validateRegistrationData(pharmacistValidator),addPharmacist)
router.route('/addMedicine').post(addMedicine)

export default router;