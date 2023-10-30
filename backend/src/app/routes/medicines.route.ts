import {
  addMedicine,
  getAllMedicines,
  medicinalUses,
  viewMedicinesQuantityAndSales,
} from '../controllers/medicine.controller'
import express from 'express'
import { editMedicine } from '../controllers/medicine.controller'
import { filterMedicineByMedicinalUse } from '../controllers/admin.controller'

const router = express.Router()
router.route('/').get(getAllMedicines)
router.route('/quantity-sales').get(viewMedicinesQuantityAndSales)
router.route('/allMedicinalUses').get(medicinalUses)

router.route('/addMedicine').post(addMedicine)
router.route('/editMedicine/:name').put(editMedicine)
router
  .route('/filterByMedicinalUse/:medicinalUse')
  .get(filterMedicineByMedicinalUse)

export default router
