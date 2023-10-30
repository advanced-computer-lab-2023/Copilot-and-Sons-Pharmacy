import Medicine from '../schemas/medicine.model'

export const viewMedicineQuantityAndSales = async () => {
  const medicines = await Medicine.find({}, 'name quantity sales')

  return medicines
}
