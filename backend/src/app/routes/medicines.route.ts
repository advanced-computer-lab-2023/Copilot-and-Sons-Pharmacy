import {getAllMedicines, viewMedicinesQuantityAndSales} from "../controllers/medicine.controller";
import express from'express';
import { editMedicine } from "../controllers/pharmacist.controller";
const router=express.Router();
router.route('/').get(getAllMedicines);
router.route('/quantity-sales').get(viewMedicinesQuantityAndSales);
router.route('/editMedicine').put(editMedicine);
export default router;