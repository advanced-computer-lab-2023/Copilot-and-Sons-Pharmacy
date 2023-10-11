import axios, { AxiosResponse } from 'axios';


const BASE_URL = 'http://localhost:3000'; 


interface RegistrationData {
    username: string;
    name: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    gender: string;
    mobileNumber: string;
    emergencyContact: {
      fullName: string;
      mobileNumber: string;
      relation: string;
    };

}



interface RegistrationResponse {
  user: unknown; 
}


export async function registerUser(userData:any): Promise<AxiosResponse<RegistrationResponse>> {

    const response = await axios.post<RegistrationResponse>(`${BASE_URL}/api/patient/register`, userData);
    return response;


  
}


