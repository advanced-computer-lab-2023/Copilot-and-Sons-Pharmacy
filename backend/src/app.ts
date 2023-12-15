// import * as fileUpload from '@types/express-fileupload';
import express from 'express'

import cors from 'cors'
import { ERROR } from './app/utils/httpStatusText'
import medicinesRoute from './app/routes/medicines.route'
import patientsRoute from './app/routes/patient.route'
import adminsRoute from './app/routes/admin.route'
import pharmacistRoute from './app/routes/pharmacist.route'
import cartsRoute from './app/routes/cart.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import debugRouter from './app/controllers/debug.controller'
import { deliveryAddressRouter } from './app/controllers/deliveryAddress.controller'
import { authRouter } from './app/controllers/auth.controller'
import { authenticate } from './app/middlewares/auth.middleware'
import { logger } from './app/middlewares/logger.middleware'
import orderRouter from './app/routes/order.route'
import asyncWrapper from './app/middlewares/asyncWrapper'
import { notificationRouter } from './app/controllers/notification.controller'
import { chatsRouter } from './app/controllers/chats.controller'

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)
app.use(asyncWrapper(authenticate))

app.use('/api/medicine', medicinesRoute)
app.use('/api/patient', patientsRoute)
app.use('/api/admin', adminsRoute)
app.use('/api/pharmacist', pharmacistRoute)
app.use('/api/cart', cartsRoute)
app.use('/api/debug', debugRouter)
app.use('/api', authRouter)
app.use('/api', deliveryAddressRouter)
app.use('/api/order', orderRouter)
app.use('/api', chatsRouter)
app.use('/api', notificationRouter)
app.use('/api', chatsRouter)

//global error handler
app.use(globalErrorHandler)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.all('*', (req, res, next) => {
  return res
    .status(404)
    .json({ status: ERROR, message: 'this resource is not available' })
})
app.use(notificationRouter)

export default app
