import { api } from '.'

export async function acceptPharmacistRequest(id: string) {
  return await api
    .patch<{ data: any[] }>(`/pharmacist/acceptPharmacistRequest/${id}`)
    .then((res) => res.data)
}

export async function rejectPharmacistRequest(id: string) {
  return await api
    .patch<any>(`/pharmacist/rejectPharmacistRequest/${id}`)
    .then((res) => res.data)
}

export async function getPharmacist(username: string): Promise<any> {
  return await api
    .get<any>(`/pharmacist/getPharmacist/${username}`)
    .then((res) => res.data)
}

export async function pharmacistRequest(formData: any) {
  return await api.post('/pharmacist/addPharmacist', formData, {
    headers: {
      'Content-Type': 'multipart/form-data; ${formData.getBoundary()}',
    },
  })
}
