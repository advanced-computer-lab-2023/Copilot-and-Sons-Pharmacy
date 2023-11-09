import { useMutation } from 'react-query'
import { AxiosResponse } from 'axios'
import { api } from '.'

export async function viewAllMedicines(): Promise<AxiosResponse> {
  const response = await api.get(`/medicine/`)

  return response
}

export async function viewMedicinesQuantityAndSales(): Promise<AxiosResponse> {
  const response = await api.get(`/medicine/quantity-sales`)

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
function editMedicineService(medicine: { name: any }) {
  return api
    .put(`/medicine/editMedicine/${medicine.name}`, medicine)
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
