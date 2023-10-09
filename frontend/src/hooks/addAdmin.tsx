import { useState } from 'react';
import {AddAdmin}from '../api/admin'
import { useNavigate } from 'react-router-dom';

export const useAddAdmin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const addAdmin = async (adminData: { username: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
     const response= await AddAdmin(adminData);
 

     if (response.status === 201) {
        // Admin added successfully, you can display a success message if needed
        console.log('Admin added successfully');
        navigate('/admin-dashboard/'); // Navigate to the home page
      } else {
        // Handle other status codes here
        throw new Error('Failed to add admin');
      }
    }  catch (err:any) {
      setError(err.message || 'An error occurred while adding the admin');
    } finally {
      setLoading(false);
    }
  };

  return { addAdmin, loading, error };
};
