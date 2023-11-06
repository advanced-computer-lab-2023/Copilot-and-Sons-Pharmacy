import Patient from '../schemas/patient.schema'
import User from '../schemas/user.model'
import AppError from '../utils/appError'
import { ERROR } from '../utils/httpStatusText'
import Pharmacist from '../schemas/pharmacist'
import { UserType } from 'pharmacy-common/types/user.types'

export async function removeUser(username: string): Promise<void> {
  const user = await User.findOne({ username })

  console.log(user)

  if (user) {
    if (user.type == UserType.Admin) {
      throw new AppError('cannot delete an admin', 406, ERROR)
    }

    await Patient.findOneAndDelete({ user: user._id })
    await Pharmacist.findOneAndDelete({ user: user._id })
    await User.findOneAndDelete({ username })

    return
  }

  throw new AppError("This user doesn't exist", 404, ERROR)
}
