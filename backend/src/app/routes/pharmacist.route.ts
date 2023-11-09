import express from 'express'
import { addPharmacist } from '../controllers/pharmacist.controller'
import cors from 'cors'
//import { pharmacistValidator } from '../validators/pharmacist.validator'
//import { validateRegistrationData } from '../middlewares/registrationMiddleware'

import multer from 'multer'

const storage = multer.memoryStorage() // You can choose a different storage method
// eslint-disable-next-line object-shorthand
const upload = multer({ storage: storage })
const router = express.Router()
router.use(cors())
router.use(express.json())
router
  .route('/addPharmacist')
  .post(upload.array('documents', 50), addPharmacist)

export default router
