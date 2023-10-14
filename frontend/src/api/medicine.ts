import { useMutation } from 'react-query';
import  { IMedicine } from './../../../backend/src/app/schemas/medicine.model';
import axios, { AxiosResponse } from 'axios';


const BASE_URL = 'http://localhost:3000'; 

export async function viewAllMedicines(): Promise<AxiosResponse> {
      const response = await axios.get(`${BASE_URL}/api/medicine/`);
      return response;

  } 

  export async function viewMedicinesQuantityAndSales(): Promise<AxiosResponse> {

      const response = await axios.get(`${BASE_URL}/api/medicine/quantity-sales`);
      return response;


  } 
//Calling the add Medicine function using axios
  function addMedicineService(Medicine:IMedicine) {
    console.log("I'm herreeee")
    console.log(Medicine)
    return axios.post(`${BASE_URL}/api/medicine/addMedicine`, Medicine ).then((response) => response)
    .catch((error) => {throw new Error(error)});
  }
  //setting a mutation using react_query to handle the changes to database
  // exporting it to use in the actual component
  export function useAddMedicineService() {
    return useMutation(addMedicineService);

  }

  //Calling the editMedicine function using axios
  function editMedicineService(Medicine) {
    return axios.put(`${BASE_URL}/api/medicine/editMedicine/${Medicine.name}`, Medicine ).then((response) => response)
    .catch((error) => {throw new Error(error)});
  }
  //setting a mutation using react_query to handle the changes to database
  // exporting it to use in the actual component
  export function useEditMedicineService() {
    return useMutation(editMedicineService);

  }

  export async function searchForMedicine(name: string) {
    const response = await axios.get(`${BASE_URL}/api/admin/getMedicineByName/${name}`);
    return response.data;
  }
  
  
  export async function viewAllMedicinalUses() {
    const response = await axios.get(`${BASE_URL}/api/medicine/allMedicinalUses`);
    return response.data;
  }

  export async function filterByMedicinalUse(name:string) {
    const response = await axios.get(`${BASE_URL}/api/medicine/filterByMedicinalUse/${name}`);
    return response.data;
  }
