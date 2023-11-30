import { IMedicine } from '../../schemas/medicine.model'
import { IAddMedicineRequest } from 'pharmacy-common/types/medicine.types'
import Medicine from '../../schemas/medicine.model'
import AppError from '../../utils/appError'
import { ERROR } from '../../utils/httpStatusText'
import FireBase from '../../../../../firebase.config'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { getDownloadURL } from 'firebase/storage'

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

    await uploadBytes(fileRef, Image.buffer, {
      contentType: Image.mimetype,
    })

    const fullPath = await getDownloadURL(fileRef)

    const newMedicine: IMedicine = new Medicine({
      name,
      price,
      description,
      medicinalUse: medicinalUse.split(', ').map((item) => item.trim()),
      quantity,
      activeIngredients: activeIngredients
        .split(', ')
        .map((item) => item.trim()),
      Image: fullPath.toString(),
    })

    await newMedicine.save()

    return newMedicine
  } catch (error) {
    console.log(error)
    throw new AppError('Could not add medicine', 400, ERROR)
  }
}
