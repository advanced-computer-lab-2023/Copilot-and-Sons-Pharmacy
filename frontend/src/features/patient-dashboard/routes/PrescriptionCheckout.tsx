import { addPrescriptionToCart } from '@/api/patient'
import { PatientDashboardHome } from './PatientDashboardHome'

export async function PrescriptionCheckout() {
  const PrescriptionId = localStorage.getItem('PrescriptionId')
  console.log('prescriptionId', PrescriptionId)
  await addPrescriptionToCart(PrescriptionId)

  return <PatientDashboardHome />
}
