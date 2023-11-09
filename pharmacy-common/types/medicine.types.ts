export interface IMedicine {
  id: string
  name: string
  price: number
  description: string
  quantity: number
  Image: string
  activeIngredients: string[]
  medicinalUse: string[]
  sales: number
}

type MulterFile = {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: Buffer
  size: number
}

export interface IAddMedicineRequest {
  name: string
  price: number
  description: string
  quantity: number
  Image: MulterFile
  activeIngredients: string
  medicinalUse: string
  sales: number
}
