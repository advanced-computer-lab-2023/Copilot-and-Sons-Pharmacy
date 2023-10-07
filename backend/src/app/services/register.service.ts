import Patient, { IPatient } from '../schemas/patient.schema';
import bcrypt from 'bcryptjs';
import generateJWT from '../utils/generateJWT';
import AppError from '../utils/appError';
import { ERROR } from '../utils/httpStatusText';


const registerPatient = async (info: IPatient) => {
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


  const patientDuplicate = await Patient.findOne({ username });
  if (patientDuplicate) {
   
    throw new AppError('Patient already exists',409,ERROR);
  }


const hashedPassword = await bcrypt.hash(password, 10);


const patient = new Patient({
    username,
    name,
    email,
    password: hashedPassword,
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
    username: patient.username,
    id: patient._id,
    role: 'PATIENT',
  });

  patient.token = newToken;

  return patient;
};

export default registerPatient;
