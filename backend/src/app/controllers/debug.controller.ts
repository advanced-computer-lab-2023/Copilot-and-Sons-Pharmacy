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

type SeedOptions = Parameters<typeof seed>[0]

debugRouter.post(
  '/seed',
  asyncWrapper<SeedOptions>(async (req, res) => {
    res.send(await seed(req.body))
  })
)

debugRouter.get(
  '/orders',
  asyncWrapper(async (req, res) => {
    res.send(await OrderModel.find())
  })
)

export default debugRouter
