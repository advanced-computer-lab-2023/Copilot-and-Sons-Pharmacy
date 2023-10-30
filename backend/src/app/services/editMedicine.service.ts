import { IMedicine } from '../schemas/medicine.model'
import Medicine from '../schemas/medicine.model'
import AppError from '../utils/appError'
import { ERROR } from '../utils/httpStatusText'

export const editMedicineService = async (
  medicineName: string,
  updatedMedicineData: IMedicine
) => {
  try {
    // Find the medicine by ID
    const existingMedicine = await Medicine.findOne({ name: medicineName })
    console.log(existingMedicine)

    if (!existingMedicine) {
      throw new AppError('Medicine not found', 404, ERROR) // Handle the case where the medicine is not found
    }

    // Update the medicine fields with the new data
    existingMedicine.name = updatedMedicineData.name || existingMedicine.name
    existingMedicine.price = updatedMedicineData.price || existingMedicine.price
    existingMedicine.description =
      updatedMedicineData.description || existingMedicine.description
    existingMedicine.quantity =
      updatedMedicineData.quantity || existingMedicine.quantity
    existingMedicine.Image = updatedMedicineData.Image || existingMedicine.Image
    existingMedicine.activeIngredients =
      updatedMedicineData.activeIngredients ||
      existingMedicine.activeIngredients
    existingMedicine.medicinalUse =
      updatedMedicineData.medicinalUse || existingMedicine.medicinalUse
    existingMedicine.sales = updatedMedicineData.sales || existingMedicine.sales

    // Save the updated medicine to the database
    await existingMedicine.save()

    return existingMedicine
  } catch (error) {
    // Handle any errors that occurred during the update
    throw new AppError('Could not edit medicine: ', 402, ERROR)
  }
}
