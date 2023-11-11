import Patient, { IPatient } from '../schemas/patient.schema'

import User from '../schemas/user.model'

async function getPatientByUsername(
  username: string
): Promise<IPatient | null> {
  try {
    const user = await User.findOne({ username })

    if (!user) {
      console.error('User not found with username:', username)

      return null
    }

    const patient = await Patient.findOne({ user: user._id }).populate('user')

    return patient
  } catch (error) {
    console.error('Error while fetching patient by username:', error)
    throw error
  }
}

export default getPatientByUsername
