import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { TokenError, LoginError } from '../errors/auth.errors'
import User from '../schemas/user.model'

import { APIError, NotFoundError } from '../errors'
import { UserType } from 'pharmacy-common/types/user.types'
import Pharmacist from '../schemas/pharmacist'
import { PharmacistStatus } from 'pharmacy-common/types/pharmacist.types'

const jwtSecret =
  process.env.JWT_TOKEN ??
  'e82468f0f2b076a6ecd7bd357596c18fd7e5bc64868fba1a63f7bbc9a8b12e29e82468f0f2b076a6ecd7bd357596c18fd7e5bc64868fba1a63f7bbc9a8b12e29'
const bcryptSalt = process.env.BCRYPT_SALT ?? '$2b$10$13bXTGGukQXsCf5hokNe2u'

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

  if (user.password !== hashedPassword) {
    throw new APIError('Password is incorrect', 400)
  }

  const payload = new JwtPayload(username)

  return await generateJWTToken(payload)
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

export async function getUserByUsername(username: string) {
  const user = await User.findOne({ username })

  if (user == null) {
    throw new NotFoundError()
  }

  return user
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
