import Medicine from '../../schemas/medicine.model'
import AppError from '../../utils/appError'
import { ERROR } from '../../utils/httpStatusText'
import FireBase from '../../../../../firebase.config'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { getDownloadURL } from 'firebase/storage'

const storage = getStorage(FireBase)
const storageRef = ref(storage, 'medicines/')

export const editMedicineService = async (
  medicineName: string,
  updatedMedicineData: any
) => {
  // Find the medicine by ID
  const existingMedicine = await Medicine.findOne({ name: medicineName })

  if (!existingMedicine) {
    throw new AppError('Medicine not found', 404, ERROR) // Handle the case where the medicine is not found
  }

  let fullPath = undefined

  if (updatedMedicineData.Image) {
    console.log('image exist')
    const fileRef = ref(storageRef, Date.now().toString())
    await uploadBytes(fileRef, updatedMedicineData.Image.buffer, {
      contentType: updatedMedicineData.Image.mimetype,
    })

    console.log('Uploaded a blob or file!')

    fullPath = await getDownloadURL(fileRef)
  }

  if (updatedMedicineData.activeIngredients) {
    updatedMedicineData.activeIngredients =
      updatedMedicineData.activeIngredients
        .split(', ')
        .map((item: string) => item.trim())
  }

  if (updatedMedicineData.medicinalUse) {
    updatedMedicineData.medicinalUse = updatedMedicineData.medicinalUse
      .split(', ')
      .map((item: string) => item.trim())
  }

  // Update the medicine fields with the new data
  existingMedicine.name = updatedMedicineData.name || existingMedicine.name
  existingMedicine.price = updatedMedicineData.price || existingMedicine.price
  existingMedicine.description =
    updatedMedicineData.description || existingMedicine.description
  existingMedicine.quantity =
    updatedMedicineData.quantity || existingMedicine.quantity
  existingMedicine.Image = fullPath?.toString() || existingMedicine.Image
  existingMedicine.activeIngredients =
    updatedMedicineData.activeIngredients || existingMedicine.activeIngredients
  existingMedicine.medicinalUse =
    updatedMedicineData.medicinalUse || existingMedicine.medicinalUse
  existingMedicine.sales = updatedMedicineData.sales || existingMedicine.sales

  // Save the updated medicine to the database
  await existingMedicine.save()

  return existingMedicine
}
