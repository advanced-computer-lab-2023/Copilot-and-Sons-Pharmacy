import axios from 'axios'

export async function addtoPrescriptionApi(medicineName: any) {
  const patientUsername = localStorage.getItem('patientUsername')
  const token = localStorage.getItem('token')

  return await axios.post(
    'http://localhost:3000/prescriptions/',
    {
      patient: patientUsername,
      medicine: [
        { name: medicineName, dosage: '1', frequency: '1', duration: '1' },
      ],
      date: new Date(),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}
