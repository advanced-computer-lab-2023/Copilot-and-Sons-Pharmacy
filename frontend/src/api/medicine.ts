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

  //Calling the remove user function using axios
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

