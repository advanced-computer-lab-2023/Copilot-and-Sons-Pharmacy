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

