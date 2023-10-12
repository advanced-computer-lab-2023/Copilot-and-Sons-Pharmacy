
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
const BASE_URL = 'http://localhost:3000'; 
interface AddAdminData {
    username: string;
    password: string;
  }
interface DeleteUserData {
    username: string;
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
  //Calling the remove user function using axios
   function removeUser(username:String) {
    return axios.delete(`${BASE_URL}/api/admin/removeUser`, { data: { username } }).then((response) => response)
    .catch((error) => {throw new Error(error)});
  }
  //setting a mutation using react_query to handle the changes to database
  // exporting it to use in the actual component
  export function useRemoveUser() {
    return useMutation(removeUser);

  }



