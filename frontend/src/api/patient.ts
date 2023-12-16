import { api } from '.'

export async function viewAllPatients() {
  const response = await api.get<{ data: any[] }>(`/patient/viewAllPatients`)

  return response.data
}

export async function requestOtpToResetPassword(email: JSON) {
  const response = await api.post<{ data: any[] }>('/patient/requestOtp', {
    email,
  })

  return response.data
}

export async function viewPatientInfo(id: string) {
  console.log('hey I entered')
  const response = await api.get(`/admin/patientInfo/${id}`)

  return response.data.data
}

export async function viewPatientInfo2(id: string) {
  console.log('hey I entered')
  const response = await api.get(`/admin/patientInfo/${id}`)

  return response.data
}

export async function addPrescriptionToCart(prescriptionId: any) {
  return api.post('/cart/addPrescriptiontoCart', { prescriptionId })
}
