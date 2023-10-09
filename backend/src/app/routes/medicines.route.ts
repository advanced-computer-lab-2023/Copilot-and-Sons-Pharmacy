import {getAllMedicines, viewMedicinesQuantityAndSales} from "../controllers/medicine.controller";
import express from'express';
const router=express.Router();
router.route('/').get(getAllMedicines);
router.route('/quantity-sales').get(viewMedicinesQuantityAndSales);

export default router;