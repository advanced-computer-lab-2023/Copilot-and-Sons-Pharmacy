import express from 'express';
import { addMedicine, addPharmacist  }from '../controllers/pharmacist.controller'
import cors from 'cors';
const router=express.Router();
router.use(cors());
router.use(express.json());
router.post('/addPharmacist',addPharmacist)
router.post('/addMedicine',addMedicine)

export default router;