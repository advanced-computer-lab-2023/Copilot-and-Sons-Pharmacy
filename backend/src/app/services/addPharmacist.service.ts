import Pharmacist from '../schemas/pharmacist'
import AppError from '../utils/appError';
import { FAIL } from '../utils/httpStatusText';
import User, { IUser } from '../schemas/user.model';
import { ERROR } from '../utils/httpStatusText';


type Pharmacist = {
  user : IUser;
  username:string;
  password:string;
   name:string;
   email:string;
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
  throw  new AppError('Pharmacist with this email already exists',400,FAIL);
 
}

const existingUsername = await User.findOne({ username: pharmacist.username });
if (existingUsername) {
 
  throw new AppError('Pharmacist with this username already exists',409,FAIL);
}

const user = new User({
  username: pharmacist.username,
  password: pharmacist.password,
  role: 'PHARMACIST',
});
await user.save();
pharmacist.user=user._id;


const newPharmacist = new Pharmacist({

  name : pharmacist.name,
  email : pharmacist.email,
  dateOfBirth : pharmacist.dateOfBirth,
  hourlyRate : pharmacist.hourlyRate,
  affilation : pharmacist.affilation,
  status : pharmacist.status,
  educationalBackground : {
  major : pharmacist.educationalBackground.major,
  university : pharmacist.educationalBackground.university,
  graduationYear : pharmacist.educationalBackground.graduationYear,
  degree : pharmacist.educationalBackground.degree,
  },
  user : pharmacist.user,

}
);
await newPharmacist.save();
return newPharmacist;

}
