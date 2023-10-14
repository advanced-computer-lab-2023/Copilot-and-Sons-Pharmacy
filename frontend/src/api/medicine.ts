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
