import Medicine from '../../schemas/medicine.model'
import AppError from '../../utils/appError'
import { ERROR } from '../../utils/httpStatusText'

export const archiveMedicineService = async (medicineName: string) => {
  const existingMedicine = await Medicine.findOne({ name: medicineName })

  if (!existingMedicine) {
    throw new AppError('Medicine not found', 404, ERROR) // Handle the case where the medicine is not found
  }

  existingMedicine.status = 'archived'

  const archivedMedicine = await existingMedicine.save()

  return archivedMedicine
}
