import Administrator from '../schemas/administrator.model'
import User from '../schemas/user.model'
import bcrypt from 'bcryptjs'
import AppError from '../utils/appError'
import { ERROR } from '../utils/httpStatusText'
import { UserType } from 'pharmacy-common/types/user.types'
import { JwtPayload, generateJWTToken } from './auth.service'

type Info = {
  username: string
  password: string
}

export const addAdminService = async (info: Info) => {
  const { username, password } = info
  const userDuplicate = await User.findOne({ username })

  if (userDuplicate) {
    throw new AppError('User already exists', 409, ERROR)
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    password: hashedPassword,
    type: UserType.Admin,
  })
  await user.save()

  const newAdmin = new Administrator({
    user: user._id,
  })
  await newAdmin.save()

  return await generateJWTToken(new JwtPayload(username))
}
