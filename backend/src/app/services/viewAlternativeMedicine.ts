import Medicine from '../schemas/medicine.model'
import AppError from '../utils/appError'
import { FAIL } from '../utils/httpStatusText'

export async function viewAlternativeMedicine(medicineId: string) {
  const medicine = await Medicine.findById(medicineId)

  if (!medicine) {
    throw new AppError('no Medicine with this name exists!', 404, FAIL)
  }

  const alternatives = await Medicine.find({
    'activeIngredients.0': medicine.activeIngredients[0],
    quantity: { $ne: 0 },
  })

  return alternatives
}
