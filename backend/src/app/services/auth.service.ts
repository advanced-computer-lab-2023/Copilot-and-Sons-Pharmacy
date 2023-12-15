import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { TokenError, LoginError } from '../errors/auth.errors'
import User, { IUser } from '../schemas/user.model'
import { APIError, NotFoundError } from '../errors'
import { UserType } from 'pharmacy-common/types/user.types'
import Pharmacist from '../schemas/pharmacist'
import { PharmacistStatus } from 'pharmacy-common/types/pharmacist.types'
import { HydratedDocument } from 'mongoose'
import Patient from '../schemas/patient.schema'
import Administrator from '../schemas/administrator.model'

const jwtSecret = process.env.JWT_TOKEN ?? 'secret'

export const bcryptSalt =
  process.env.BCRYPT_SALT ?? '$2b$10$13bXTGGukQXsCf5hokNe2u'

export class JwtPayload {
  constructor(public username: string) {}
}

export async function login(
  username: string,
  password: string
): Promise<string> {
  const user = await User.findOne({ username })

  if (user == null) {
    throw new LoginError()
  }

  const hashedPassword = await bcrypt.hash(password, bcryptSalt)
  console.log(user.password, hashedPassword)

  if (user.password !== hashedPassword) {
    throw new APIError('Password is incorrect', 400)
  }

  const payload = new JwtPayload(username)

  return await generateJWTToken(payload)
}

export async function getUserByUsername(
  username: string
): Promise<HydratedDocument<IUser>> {
  const user = await User.findOne({ username })

  if (user == null) {
    throw new NotFoundError()
  }

  return user
}

export async function getEmailAndNameForUsername(username: string) {
  const user = await getUserByUsername(username)
  let email: string
  let name: string

  switch (user.type) {
    case UserType.Pharmacist: {
      const doctor = await Pharmacist.findOne({ user: user.id })
      console.log(Pharmacist.find())
      console.log(doctor)

      if (!doctor) {
        console.log(user.type)
        console.log(doctor)
        throw new APIError('Pharmacist not found', 400)
      }

      email = doctor.email
      name = doctor.name
      break
    }

    case UserType.Patient: {
      const patient = await Patient.findOne({ user: user.id })

      if (!patient) {
        throw new APIError('Patient not found', 400)
      }

      email = patient.email
      name = patient.name
      break
    }

    case UserType.Admin: {
      const admin = await Administrator.findOne({ user: user.id })

      if (!admin) {
        throw new APIError('Admin not found', 400)
      }

      email = admin.email
      name = user.username
      break
    }

    default:
      throw new APIError('Invalid user type', 400)
  }

  return { email, name }
}

export async function getModelIdForUsername(username: string): Promise<string> {
  const user = await getUserByUsername(username)

  switch (user.type) {
    case UserType.Pharmacist:
      return (await Pharmacist.findOne({
        user: user.id,
      }))!.id

    case UserType.Patient:
      return (await Patient.findOne({
        user: user.id,
      }))!.id

    case UserType.Admin:
      return (await Administrator.findOne({
        user: user.id,
      }))!.id

    default:
      throw new Error('Invalid user type')
  }
}

export async function isUsernameTaken(username: string): Promise<boolean> {
  const usernameRegex = new RegExp(`^${username}$`, 'i')

  const count = await User.countDocuments({ username: usernameRegex })

  return count > 0
}

export async function verifyJWTToken(token: string): Promise<JwtPayload> {
  return await new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err != null || decoded == null) {
        reject(new TokenError())
      } else {
        resolve(decoded as JwtPayload)
      }
    })
  })
}

export async function generateJWTToken(payload: JwtPayload): Promise<string> {
  return await new Promise((resolve, reject) => {
    jwt.sign({ ...payload }, jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err != null || token == null) {
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
}

export async function isUserType(
  userType: UserType,
  username: string
): Promise<boolean> {
  const user = await User.findOne({ username })

  if (user == null) {
    return false
  }

  return user.type === userType
}

export async function isPharmacistAndApproved(
  username: string
): Promise<boolean> {
  const user = await User.findOne({ username })

  if (user == null) {
    return false
  }

  const pharmacist = await Pharmacist.findOne({ user: user.id })

  return pharmacist != null && pharmacist.status === PharmacistStatus.Accepted
}

export async function isAdmin(username: string): Promise<boolean> {
  const user = await User.findOne({ username })

  if (user == null) {
    return false
  }

  return user.type === UserType.Admin
}
