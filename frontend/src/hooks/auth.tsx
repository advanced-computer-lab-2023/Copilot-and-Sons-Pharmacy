/* eslint-disable @typescript-eslint/no-explicit-any */


import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import {registerUser} from '../api/auth.ts';

interface User {
  // Define your user data structure here
  // For example: id, username, email, etc.
}


const useAuth = () => {

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const register = async (userData:any) => {
    try {
  
      const response = await registerUser(userData);
      const responseData: any = response.data;
      setUser(responseData.user);
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };
  return { user, error, register }; 


}
export default useAuth;



