import { IMedicine } from './../schemas/medicine.model'
import { IAddMedicineRequest } from 'pharmacy-common/types/medicine.types'
import Medicine from '../schemas/medicine.model'
import AppError from '../utils/appError'
import { ERROR } from '../utils/httpStatusText'
import FireBase from 'pharmacy-common/firebase.config'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

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

    const fileRef = ref(storageRef, name)

    // console.log('fileBlob:', fileBlob)
    uploadBytes(fileRef, Image)
      .then((snapshot) => {
        console.log('File uploaded successfully:', snapshot)
        // You can handle success here
      })
      .catch((error) => {
        console.error('Error uploading file:', error)
        // Handle any errors
      })
    const fullPath = fileRef.fullPath
    getDownloadURL(fileRef)
    const newMedicine: IMedicine = new Medicine({
      name,
      price,
      description,
      quantity,
      fullPath,
      activeIngredients,
      medicinalUse,
    })

    await newMedicine.save()

    return newMedicine
  } catch (error) {
    console.log(error)
    throw new AppError('Could not add medicine', 400, ERROR)
  }
}
