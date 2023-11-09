import { IMedicine } from './../schemas/medicine.model'
import { IAddMedicineRequest } from 'pharmacy-common/types/medicine.types'
import Medicine from '../schemas/medicine.model'
import AppError from '../utils/appError'
import { ERROR } from '../utils/httpStatusText'
import FireBase from 'pharmacy-common/firebase.config'
import { getStorage, ref, uploadBytes } from 'firebase/storage'

const storage = getStorage(FireBase)
const storageRef = ref(storage, 'medicines/')

export const addMedicineService = async (info: IAddMedicineRequest) => {
  try {
    const {
      name,
      price,
      description,
      quantity,
      Image,
      medicinalUse,
      activeIngredients,
    } = info
    console.log('Image:', Image)

    if (!Image) throw new AppError('No image provided', 400, ERROR)
    const fileRef = ref(storageRef, Date.now().toString())
    uploadBytes(fileRef, Image.buffer, {
      contentType: Image.mimetype,
    })
      .then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot)
      })
      .catch((error) => {
        console.log('Error uploading file:', error)
      })
    const fullPath = fileRef.fullPath

    const newMedicine: IMedicine = new Medicine({
      name,
      price,
      description,
      medicinalUse,
      quantity,
      activeIngredients,
      Image: fullPath,
    })

    await newMedicine.save()

    return newMedicine
  } catch (error) {
    console.log(error)
    throw new AppError('Could not add medicine', 400, ERROR)
  }
}
