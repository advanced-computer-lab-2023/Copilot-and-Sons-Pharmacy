import { useState } from 'react';
import { AddAdmin } from '../api/admin';

export const useAddAdmin = () => {
  const [errorAdmin, setError] = useState<string | null>(null);

  const addAdmin = async (adminData: { username: string; password: string }) => {
    setError(null);

    try {
      await AddAdmin(adminData);
    
    } catch (err) {
      
        setError('An error occurred while adding the admin');
      
    }
  };

  return { addAdmin, errorAdmin };
};
