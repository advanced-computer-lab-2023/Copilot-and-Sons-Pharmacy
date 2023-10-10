
import axios, { AxiosResponse } from 'axios';
const BASE_URL = 'http://localhost:3000'; 
interface AddAdminData {
    username: string;
    password: string;
  }
  interface AddadminResponse {
    user: {
      username:string,
      password:string
    }; 
  }
  export async function AddAdmin(adminData:AddAdminData): Promise<AxiosResponse<AddadminResponse>> {
 
      const response = await axios.post<AddadminResponse>(`${BASE_URL}/api/admin/add-admin`, adminData);
      return response;     
 
  } 