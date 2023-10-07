import express from'express';
import { addAdmin } from '../controllers/admin.controller';
import {  getAllPharmacists , getPendingPharmacists , getPharmacistByID } from '../controllers/admin.controller';

const router=express.Router();
router.use(express.json());
router.route('/addAdmin').post(addAdmin)
router.get('/getAllPharmacists',getAllPharmacists)
router.get('/getPendingPharmacists',getPendingPharmacists)
router.get('/getPharmacistByID/:id',getPharmacistByID)



export default router;

