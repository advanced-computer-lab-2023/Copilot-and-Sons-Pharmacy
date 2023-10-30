import Patient from '../schemas/patient.schema'
import AppError from '../utils/appError'
import { FAIL } from '../utils/httpStatusText'

export async function getPatientById(_id: string) {
  const patient = await Patient.findById({ _id })

  if (!patient) {
    new AppError('Patient not found', 404, FAIL)
  } else {
    return patient
  }
}
