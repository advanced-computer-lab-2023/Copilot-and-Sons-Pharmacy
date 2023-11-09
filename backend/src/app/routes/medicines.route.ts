import {
  addMedicine,
  getAllMedicines,
  medicinalUses,
  viewMedicinesQuantityAndSales,
} from '../controllers/medicine.controller'
import express from 'express'
import { editMedicine } from '../controllers/medicine.controller'
import { filterMedicineByMedicinalUse } from '../controllers/admin.controller'
import multer from 'multer'

const router = express.Router()
router.route('/').get(getAllMedicines)
router.route('/quantity-sales').get(viewMedicinesQuantityAndSales)
router.route('/allMedicinalUses').get(medicinalUses)
const storage = multer.memoryStorage() // You can choose a different storage method
const upload = multer({ storage })

router.route('/addMedicine').post(upload.single('Image'), addMedicine)
router.route('/editMedicine/:name').put(editMedicine)
router
  .route('/filterByMedicinalUse/:medicinalUse')
  .get(filterMedicineByMedicinalUse)

export default router
