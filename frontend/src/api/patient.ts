import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export async function viewAllPatients() {
  const response = await axios.get(`${BASE_URL}/api/patient/viewAllPatients`);
  return response.data; 
}


export async function viewPatientInfo(id: string) {
  console.log("hey I entered")
  const response = await axios.get(`${BASE_URL}/api/admin/patientInfo/${id}`);
  return response.data;
}

