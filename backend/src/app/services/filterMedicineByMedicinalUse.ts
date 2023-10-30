import { fetchAllMedicines } from './fetchAllMedicines.service'

export async function getMedicineByMeidinalUse(medicinalUse: string) {
  const allMedicines = await fetchAllMedicines()
  const resultMedicine = []

  for (const medicine of allMedicines) {
    if (medicine.medicinalUse.includes(medicinalUse)) {
      resultMedicine.push(medicine)
    }
  }

  return resultMedicine
}
