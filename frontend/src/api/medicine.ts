import { useMutation } from 'react-query'
import axios, { AxiosResponse } from 'axios'

const BASE_URL = 'http://localhost:3000'

export async function viewAllMedicines(): Promise<AxiosResponse> {
  const response = await axios.get(`${BASE_URL}/api/medicine/`)

  return response
}

export async function viewMedicinesQuantityAndSales(): Promise<AxiosResponse> {
  const response = await axios.get(`${BASE_URL}/api/medicine/quantity-sales`)

  return response
}

//Calling the add Medicine function using axios
function addMedicineService(Medicine: any) {
  return axios
    .post(`${BASE_URL}/api/medicine/addMedicine`, Medicine)
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
  return axios
    .put(`${BASE_URL}/api/medicine/editMedicine/${medicine.name}`, medicine)
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
  const response = await axios.get(
    `${BASE_URL}/api/admin/getMedicineByName/${name}`
  )

  return response.data
}

export async function viewAllMedicinalUses() {
  const response = await axios.get<{ data: any[] }>(
    `${BASE_URL}/api/medicine/allMedicinalUses`
  )

  return response.data
}

export async function filterByMedicinalUse(name: string) {
  const response = await axios.get(
    `${BASE_URL}/api/medicine/filterByMedicinalUse/${name}`
  )

  return response.data
}
