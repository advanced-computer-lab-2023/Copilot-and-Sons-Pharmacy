import {getAllMedicines} from "../controllers/medicine.controller";

import express from'express';
const router=express.Router();
router.route('/').get(getAllMedicines);

export default router;