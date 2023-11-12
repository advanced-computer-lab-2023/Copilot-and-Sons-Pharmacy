import Pharmacist, { IPharmacist } from '../schemas/pharmacist'

export async function acceptPharmacist(
  pharmacistId: string
): Promise<IPharmacist | null> {
  const pharmacist = await Pharmacist.findByIdAndUpdate(
    pharmacistId,
    { status: 'Accepted' },
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
