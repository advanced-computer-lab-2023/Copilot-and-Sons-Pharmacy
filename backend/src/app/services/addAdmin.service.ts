import Administrator, { IAdministrator } from '../schemas/administrator.model'
import User from '../schemas/user.model'
import bcrypt from 'bcryptjs'
import generateJWT from '../utils/generateJWT'
import AppError from '../utils/appError'
import { ERROR } from '../utils/httpStatusText'
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
    password,
    role: 'ADMINISTRATOR',
  })
  await user.save()
  const newAdmin: IAdministrator = new Administrator({
    user: user._id,
  })

  await newAdmin.save()

  const newToken = await generateJWT({
    username,
    id: newAdmin._id,
    role: 'ADMINISTRATOR',
  })

  user.token = newToken

  return { username, password: hashedPassword, ...newAdmin, token: newToken }
}
