import { api } from '.'

export async function viewAllPatients() {
  const response = await api.get<{ data: any[] }>(`/patient/viewAllPatients`)

  return response.data
}

export async function viewPatientInfo(id: string) {
  console.log('hey I entered')
  const response = await api.get(`/admin/patientInfo/${id}`)

  return response.data
}
