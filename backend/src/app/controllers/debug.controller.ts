import { Router } from 'express'
import asyncWrapper from '../middlewares/asyncWrapper'
import {
  createFakeAdmin,
  createFakeMedicine,
  createFakePatient,
  createFakePharmacist,
  seed,
} from '../services/fakers.service'
import { OrderModel } from '../schemas/order.model'

const debugRouter = Router()

debugRouter.post(
  '/create-admin',
  asyncWrapper(async (req, res) => {
    res.send(await createFakeAdmin())
  })
)

debugRouter.post(
  '/create-pharmacist',
  asyncWrapper(async (req, res) => {
    res.send(await createFakePharmacist())
  })
)

debugRouter.post(
  '/create-medicine',
  asyncWrapper(async (req, res) => {
    res.send(await createFakeMedicine())
  })
)

debugRouter.post(
  '/create-patient',
  asyncWrapper(async (req, res) => {
    res.send(await createFakePatient())
  })
)

debugRouter.post(
  '/seed',
  asyncWrapper(async (req, res) => {
    res.send(await seed())
  })
)

debugRouter.get(
  '/orders',
  asyncWrapper(async (req, res) => {
    res.send(await OrderModel.find())
  })
)

export default debugRouter
