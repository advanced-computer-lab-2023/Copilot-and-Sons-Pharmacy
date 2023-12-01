import {
  addMedicine,
  getAllMedicines,
  medicinalUses,
  patchWallet,
  viewAlternatives,
  viewMedicinesQuantityAndSales,
  archiveMedicine,
  unarchiveMedicine,
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
router.route('/editMedicine/:name').put(upload.single('Image'), editMedicine)
router
  .route('/filterByMedicinalUse/:medicinalUse')
  .get(filterMedicineByMedicinalUse)

router.route('/wallet/:totalMoney').patch(patchWallet)
router.route('/viewAlternatives/:id').get(viewAlternatives)
router.route('/archiveMedicine/:name').patch(archiveMedicine)
router.route('/unarchiveMedicine/:name').patch(unarchiveMedicine)

export default router
