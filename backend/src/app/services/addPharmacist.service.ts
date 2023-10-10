import Pharmacist from '../schemas/pharmacist'
import AppError from '../utils/appError';
import { FAIL } from '../utils/httpStatusText';


type Pharmacist = {
   name:string;
   email:string;
   username:string;
   password:string;
   dateOfBirth:Date;
   hourlyRate:string;
   affilation:string;
   status:string;
   educationalBackground:{
    major:string;
    university:string;
    graduationYear:string;
    degree:string;
   }
  };
  
export const addPharmacistService=async(pharmacist:Pharmacist)=>{
const existingEmail = await Pharmacist.findOne({ email: pharmacist.email });
if (existingEmail) {
    return new AppError('Pharmacist with this email already exists',400,FAIL);
 
}

const existingUsername = await Pharmacist.findOne({ username: pharmacist.username });
if (existingUsername) {
 return new AppError('Pharmacist with this username already exists',400,FAIL);

}



const newPharmacist = new Pharmacist(pharmacist);
await newPharmacist.save();
return newPharmacist;

}