import Patient from '../schemas/patient.schema'
import User from '../schemas/user.model'
import bcrypt from 'bcryptjs'
import AppError from '../utils/appError'
import { ERROR } from '../utils/httpStatusText'
import { UserType } from 'pharmacy-common/types/user.types'
import { JwtPayload, generateJWTToken } from './auth.service'
type Info = {
  username: string
  name: string
  email: string
  password: string
  dateOfBirth: Date
  gender: string
  mobileNumber: string
  emergencyContact: {
    fullName: string
    mobileNumber: string
    relation: string
  }
}

const registerPatient = async (info: Info) => {
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
  } = info

  const patientDuplicate =
    (await User.findOne({ username })) || (await Patient.findOne({ email }))

  if (patientDuplicate) {
    throw new AppError('User already exists', 409, ERROR)
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    password: hashedPassword,
    type: UserType.Patient,
  })
  await user.save()

  const patient = new Patient({
    name,
    email,
    user: user._id,
    dateOfBirth,
    gender,
    mobileNumber,
    emergencyContact: {
      fullName,
      mobileNumber: emergencyMobileNumber,
      relation: emergencyRelation,
    },
  })
  await patient.save()

  return await generateJWTToken(new JwtPayload(username))
}

export default registerPatient
