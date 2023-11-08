import User from '../schemas/user.model'
import AppError from '../utils/appError'
import { ERROR } from '../utils/httpStatusText'
import {
  isStrongPassword,
  getPasswordStrengthReason,
} from '../validators/password.validator'

export async function changePassowrd(
  username: string,
  oldPassword: string,
  newPassword: string
): Promise<void> {
  const user = await User.findOne({ username })

  console.log(user)

  if (user) {
    if (user.password === oldPassword) {
      if (isStrongPassword(newPassword)) {
        user.password = newPassword
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
