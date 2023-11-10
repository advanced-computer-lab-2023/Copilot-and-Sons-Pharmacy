import { api } from '.'

export async function addOrderApi(order: any) {
  return await api.post(`/order/addOrder`, order)
}
