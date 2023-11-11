import { api } from '.'

export async function acceptPharmacistRequest(id: string) {
  return await api
    .patch<{ data: any[] }>(`/pharmacist/acceptPharmacistRequest/${id}`)
    .then((res) => res.data)
}

export async function rejectPharmacistRequest(id: string) {
  return await api
    .patch<{ data: any[] }>(`/pharmacist/rejectPharmacistRequest/${id}`)
    .then((res) => res.data)
}
