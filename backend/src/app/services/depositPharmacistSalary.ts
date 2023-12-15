import Pharmacist from '../schemas/pharmacist'

export async function depositPharmacistSalaryService(pharmacistId: string) {
  const pharmacist = await Pharmacist.findById(pharmacistId)

  const wallet = pharmacist?.walletMoney
  const hourlyRate = pharmacist?.hourlyRate

  const newWalletMoney = wallet! + hourlyRate! * 40 * 4

  const updatedPharmacist = await Pharmacist.findByIdAndUpdate(pharmacistId, {
    walletMoney: newWalletMoney,
  })

  await updatedPharmacist?.save()
}
