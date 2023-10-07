import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import {SUCCESS,FAIL,ERROR} from './app/utils/httpStatusText'
import medicinesRoute from './app/routes/medicines.route';
import patientsRoute from './app/routes/patient.route';
import adminsRoute from'./app/routes/admin.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();

app.use(cors())
app.use(express.json())
app.use('/api/medicine',medicinesRoute)
app.use('/api/patient',patientsRoute)
app.use('/api/admin',adminsRoute)
//global error handler
app.use(globalErrorHandler);


app.all('*',(req,res,next)=>{
    return res.status(404).json({status:ERROR,message:"this resource is not available"})
})
export default app;
