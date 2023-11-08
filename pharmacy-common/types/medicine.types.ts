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

export interface IAddMedicineRequest {
  name: string
  price: number
  description: string
  quantity: number
  Image: File
  activeIngredients: string
  medicinalUse: string
  sales: number
}
