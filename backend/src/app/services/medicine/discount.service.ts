import {
  HealthPackageDocument,
  HealthPackageModel,
} from '../../schemas/healthPackage.model'
import { UserType } from 'pharmacy-common/types/user.types'
import User from '../../schemas/user.model'
import Patient, { IPatient } from '../../schemas/patient.schema'
import { IMedicine } from '../../schemas/medicine.model'

export function applyDiscount(
  medicine: IMedicine,
  patient: Omit<IPatient, 'healthPackage'> & {
    healthPackage: HealthPackageDocument
  }
) {
  if (
    !patient.healthPackage ||
    !patient.healthPackageRenewalDate ||
    patient.healthPackageRenewalDate < new Date()
  ) {
    return medicine.price
  }

  const discount = patient.healthPackage.medicineDiscount / 100

  return medicine.price * (1 - discount)
}

export async function applyDiscounts(
  medicines: IMedicine[],
  username: string
): Promise<(IMedicine & { discountedPrice: number })[]> {
  const user = await User.findOne({
    username,
  })

  let discount = 0

  if (user && user.type == UserType.Patient) {
    const patient = await Patient.findOne({ user: user._id })

    if (
      patient &&
      patient.healthPackage &&
      patient.healthPackageRenewalDate &&
      patient.healthPackageRenewalDate > new Date()
    ) {
      const healthPackage = await HealthPackageModel.findById(
        patient.healthPackage
      )

      if (healthPackage) {
        discount = healthPackage.medicineDiscount / 100
      }
    }
  }

  return medicines.map((medicine) => ({
    ...medicine.toJSON(),
    discountedPrice: medicine.price * (1 - discount),
  }))
}
