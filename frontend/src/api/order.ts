import { api } from '.'

export async function addOrderApi(order: any) {
  return await api.post(`/order/addOrder`, order)
}

export async function getPatientApi(username: any) {
  return await api.get(`/patient/getPatient/${username}`)
}

export async function getAllOrders() {
  return await api.get(`/order/orders`)
}
