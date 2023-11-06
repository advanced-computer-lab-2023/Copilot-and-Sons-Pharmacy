import Medicine from '../schemas/medicine.model'

export async function getMedicineByName(name: string) {
  const medicines = await Medicine.find()

  const matchingMedicines = medicines.filter((medicine) => {
    return medicine.name.toLowerCase().includes(name.toLowerCase())
  })

  if (matchingMedicines.length === 0) {
    return 'There are no medicines matching this name.'
  }

  return matchingMedicines
}
