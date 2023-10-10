import { Schema } from 'mongoose';
import Patient from '../schemas/patient.schema';
import AppError from '../utils/appError';
import { ERROR } from '../utils/httpStatusText';
const Pharmacist = require('../schemas/pharmacist');

export async function removeUser(username: string): Promise<void> {

    const patientUser = await Patient.findOneAndDelete({ username });
    console.log(patientUser);
    
    const pharmacistUser = await Pharmacist.findOneAndDelete({ username });
    console.log(pharmacistUser);
    if (patientUser === null && pharmacistUser === null) {
      throw new AppError("This user doesn't exist", 404, ERROR);
    }
    else{
        console.log("done");
    }

}