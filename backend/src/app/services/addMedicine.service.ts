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
    const fileRef = ref(storageRef, name)
    await uploadBytes(fileRef, Image)

    const newMedicine: IMedicine = new Medicine({
      name,
      price,
      description,
      quantity,
      fileRef,
      activeIngredients,
      medicinalUse,
    })

    await newMedicine.save()

    return newMedicine
  } catch (error) {
    throw new AppError('Could not add medicine', 400, ERROR)
  }
}
