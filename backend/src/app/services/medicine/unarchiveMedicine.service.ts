import Medicine from '../../schemas/medicine.model'
import AppError from '../../utils/appError'
import { ERROR } from '../../utils/httpStatusText'

export const unarchiveMedicineService = async (medicineName: string) => {
  const existingMedicine = await Medicine.findOne({ name: medicineName })

  if (!existingMedicine) {
    throw new AppError('Medicine not found', 404, ERROR) // Handle the case where the medicine is not found
  }

  existingMedicine.status = 'unarchived'

  const unarchivedMedicine = await existingMedicine.save()

  return unarchivedMedicine
}
