import { useMutation } from 'react-query'
import { AxiosResponse } from 'axios'
import { api } from '.'

export async function viewAllMedicines(): Promise<AxiosResponse> {
  const response = await api.get(`/medicine/`)

  return response
}

export async function viewAlternativeMedicine(
  id: string
): Promise<AxiosResponse> {
  console.log('here i am')
  const response = await api.get(`/medicine/viewAlternatives/${id}`)

  return response
}

export async function viewMedicinesQuantityAndSales(): Promise<AxiosResponse> {
  const response = await api.get(`/medicine/quantity-sales`)

  return response
}

export async function viewMedicinesQuantityAndSalesByMonth(
  month: Date
): Promise<AxiosResponse> {
  console.log('here i am', month)
  const response = await api.get(`/medicine/salesReportByMonth`, {
    params: {
      month: month.toString(),
    },
  })

  return response
}

export async function viewMedicinesQuantityAndSalesByDate(
  date: Date
): Promise<AxiosResponse> {
  console.log('here i am', date)
  const response = await api.get(`/medicine/salesReportByDate`, {
    params: {
      date: date.toString(),
    },
  })

  return response
}

//Calling the add Medicine function using axios
function addMedicineService(formData: any) {
  return api
    .post(`/medicine/addMedicine`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response)
    .catch((error) => {
      throw new Error(error)
    })
}

//setting a mutation using react_query to handle the changes to database
// exporting it to use in the actual component
export function useAddMedicineService() {
  return useMutation(addMedicineService)
}

//Calling the editMedicine function using axios
function editMedicineService(data: any) {
  return api
    .put(`/medicine/editMedicine/${data.name}`, data.medicine)
    .then((response) => response)
    .catch((error) => {
      throw new Error(error)
    })
}

//setting a mutation using react_query to handle the changes to database
// exporting it to use in the actual component
export function useEditMedicineService() {
  return useMutation(editMedicineService)
}

export async function searchForMedicine(name: string) {
  const response = await api.get(`/admin/getMedicineByName/${name}`)
  console.log('Hello world')

  return response.data
}

export async function viewAllMedicinalUses() {
  const response = await api.get<{ data: any[] }>(`/medicine/allMedicinalUses`)

  return response.data
}

export async function filterByMedicinalUse(name: string) {
  const response = await api.get(`/medicine/filterByMedicinalUse/${name}`)

  return response.data
}

export async function patchWallet(totalMoney: number) {
  const response = await api.patch(`/medicine/wallet/${totalMoney}`)

  return response.data
}
