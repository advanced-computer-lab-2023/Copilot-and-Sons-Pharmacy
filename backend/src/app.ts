import express, { Application } from 'express'
import cors from 'cors'
import { ERROR } from './app/utils/httpStatusText'
import medicinesRoute from './app/routes/medicines.route'
import patientsRoute from './app/routes/patient.route'
import adminsRoute from './app/routes/admin.route'
import pharmacistRoute from './app/routes/pharmacist.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import debugRouter from './app/controllers/debug.controller'
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use('/api/medicine', medicinesRoute)
app.use('/api/patient', patientsRoute)
app.use('/api/admin', adminsRoute)
app.use('/api/pharmacist', pharmacistRoute)
app.use('/api/debug', debugRouter)

//global error handler
app.use(globalErrorHandler)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.all('*', (req, res, next) => {
  return res
    .status(404)
    .json({ status: ERROR, message: 'this resource is not available' })
})

export default app
