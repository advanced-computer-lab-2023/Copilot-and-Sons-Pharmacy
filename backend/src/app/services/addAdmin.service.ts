import Administrator from '../schemas/administrator.model'
import User from '../schemas/user.model'
import bcrypt from 'bcryptjs'
import AppError from '../utils/appError'
import { ERROR } from '../utils/httpStatusText'
import { UserType } from 'pharmacy-common/types/user.types'
import { JwtPayload, generateJWTToken } from './auth.service'
import { bcryptSalt } from '../config'

type Info = {
  username: string
  password: string
  email: string
}

export const addAdminService = async (info: Info) => {
  const { username, password, email } = info
  const userDuplicate = await User.findOne({ username })

  if (userDuplicate) {
    throw new AppError('User already exists', 409, ERROR)
  }

  const existingEmail = await Administrator.findOne({ email })

  if (existingEmail) {
    throw new AppError('Admin with this email already exists', 409, ERROR)
  }

  const hashedPassword = await bcrypt.hash(password, bcryptSalt)

  const user = new User({
    username,
    password: hashedPassword,
    type: UserType.Admin,
  })
  await user.save()

  const newAdmin = new Administrator({
    user: user._id,
    email,
  })
  await newAdmin.save()

  return await generateJWTToken(new JwtPayload(username))
}

export const getAllUsersService = async () => {
  const users = await User.find({})

  return users
}
