import express from 'express';
import { addPharmacist  }from '../controllers/pharmacist.controller'

const router=express.Router();
router.use(express.json());
router.post('/addPharmacist',addPharmacist)


export default router;