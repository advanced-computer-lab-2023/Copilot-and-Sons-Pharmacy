import axios from 'axios'

export async function addtoPrescriptionApi(prescriptionList: any) {
  const patientUsername = localStorage.getItem('patientUsername')
  const token = localStorage.getItem('token')

  return await axios.post(
    'http://localhost:3000/prescriptions/',
    {
      patient: patientUsername,
      medicine: prescriptionList,
      date: new Date(),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}
