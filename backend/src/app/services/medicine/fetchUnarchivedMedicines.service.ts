import Medicine, { IMedicine } from '../../schemas/medicine.model' // Import your Medicine model

export const fetchUnarchivedMedicines = async (): Promise<IMedicine[]> => {
  return await Medicine.find({ quantity: { $gt: 0 }, status: 'unarchived' })
}
