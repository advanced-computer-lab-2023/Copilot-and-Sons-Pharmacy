import express from 'express';
import { addPharmacist  }from '../controllers/pharmacist.controller'
import cors from 'cors';
const router=express.Router();
router.use(cors());
router.use(express.json());
router.post('/addPharmacist',addPharmacist)


export default router;