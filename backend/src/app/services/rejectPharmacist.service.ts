import Pharmacist, { IPharmacist } from '../schemas/pharmacist'

export async function rejectPharmacist(
  pharmacistId: string
): Promise<IPharmacist | null> {
  const pharmacist = await Pharmacist.findByIdAndUpdate(
    pharmacistId,
    { status: 'Rejected' },
    {
      new: true,
    }
  )

  if (pharmacist == null) {
    console.error('Pharmacist Not found ')

    return null
  }

  return pharmacist
}
