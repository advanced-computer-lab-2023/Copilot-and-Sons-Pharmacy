import Patient, { IPatient } from '../schemas/patient.schema';
import User,{IUser} from '../schemas/user.model';
import bcrypt from 'bcryptjs';
import generateJWT from '../utils/generateJWT';
import AppError from '../utils/appError';
import { ERROR } from '../utils/httpStatusText';
type Info = {
    username: string;
    name: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    gender: string;
    mobileNumber: string;
    emergencyContact: {
      fullName: string;
      mobileNumber: string;
      relation: string;
    };
  };
  

const registerPatient = async (info:Info) => {
 
  const {
    username,
    name,
    email,
    password,
    dateOfBirth,
    gender,
    mobileNumber,
    emergencyContact: {
      fullName,
      mobileNumber: emergencyMobileNumber,
      relation: emergencyRelation,
    },
  } = info;

  const patientDuplicate = (await User.findOne({ username }))||(await Patient.findOne({ email }));
  if (patientDuplicate) {
   
    throw new AppError('User already exists',409,ERROR);
  }


const hashedPassword = await bcrypt.hash(password, 10);

const user=new User ({
    username,password,role:"PATIENT"
})

await user.save();
const patient = new Patient({
    name,
    email,
    user:user._id,
    dateOfBirth,
    gender,
    mobileNumber,
    emergencyContact: {
    fullName,
    mobileNumber: emergencyMobileNumber,
    relation: emergencyRelation,
    },
  });


  await patient.save();


  const newToken = await generateJWT({
    username,
    id: patient._id,
    role: 'PATIENT',
  });

  user.token = newToken;
  return {username,password:hashedPassword,...patient,token:newToken};
};

export default registerPatient;
