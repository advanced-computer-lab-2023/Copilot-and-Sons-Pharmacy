import Medicine from '../schemas/medicine.model'

export const getAllMedicinalUses = async (): Promise<string[]> => {
  try {
    const medicines = await Medicine.find()
    const medicinalUses: string[] = medicines.reduce(
      (accumulator, medicine) => {
        accumulator.push(...medicine.medicinalUse)

        return accumulator
      },
      [] as string[]
    )
    const uniqueMedicinalUses = Array.from(new Set(medicinalUses))

    return uniqueMedicinalUses
  } catch (error) {
    throw new Error('Failed to fetch medicinal uses')
  }
}
