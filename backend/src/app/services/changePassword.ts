import User from '../schemas/user.model'
import AppError from '../utils/appError'
import { ERROR } from '../utils/httpStatusText'
import {
  isStrongPassword,
  getPasswordStrengthReason,
} from '../validators/password.validator'
import { bcryptSalt } from './auth.service'
import bcrypt from 'bcrypt'

export async function changePassowrd(
  username: string,
  oldPassword: string,
  newPassword: string
): Promise<void> {
  const user = await User.findOne({ username })
  console.log(username)

  if (user) {
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password)
    console.log(isPasswordCorrect)

    if (isPasswordCorrect) {
      if (isStrongPassword(newPassword)) {
        user.password = await bcrypt.hash(newPassword, bcryptSalt)

        await user.save()

        return
      } else {
        throw new AppError(getPasswordStrengthReason(newPassword), 401, ERROR)
      }
    } else {
      throw new AppError('Incorrect old password', 401, ERROR)
    }
  }

  throw new AppError("This user doesn't exist", 404, ERROR)
}
