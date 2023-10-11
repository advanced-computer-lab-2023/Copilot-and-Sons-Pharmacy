import Patient from "../schemas/patient.schema";
import User from "../schemas/user.model";
import AppError from "../utils/appError";
import { FAIL } from "../utils/httpStatusText";



export async function getPatientByUsername(username: string) {

    const patient = await User.findOne({ username ,role:"PATIENT"});

    if (!patient) {
      new AppError ('Patient not found',404,FAIL);
    }
    else{
    const result= await Patient.findOne({user:patient._id});
    return result;
    }

   

  
}