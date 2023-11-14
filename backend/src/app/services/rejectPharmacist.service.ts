import Pharmacist, { IPharmacist } from '../schemas/pharmacist'
import User from '../schemas/user.model'

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

export async function getPharmacistService(
  username: string
): Promise<IPharmacist | null> {
  // eslint-disable-next-line object-shorthand
  console.log(username)
  // eslint-disable-next-line object-shorthand
  const user = await User.findOne({ username: username })
  console.log(user)
  const pharmacist = await Pharmacist.findOne({ user: user?._id })
  console.log(pharmacist)

  return pharmacist
}
