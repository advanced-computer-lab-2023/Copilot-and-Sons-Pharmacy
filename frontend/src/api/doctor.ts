import axios from 'axios'

export async function addtoPrescriptionApi(prescriptionList: any) {
  const patientUsername = localStorage.getItem('patientUsername')
  const token = localStorage.getItem('token')
  const prescriptionId = localStorage.getItem('PrescriptionId')

  // Define the URL for the API request based on the presence of PrescriptionId
  const apiUrl = prescriptionId
    ? `http://localhost:3000/prescriptions/edit/${prescriptionId}`
    : 'http://localhost:3000/prescriptions/'

  // Determine the HTTP method based on the presence of PrescriptionId
  const httpMethod = prescriptionId ? 'PUT' : 'POST'

  // Define the data to be sent in the request
  const requestData = prescriptionId
    ? {
        medicine: prescriptionList,
        date: new Date(),
      }
    : {
        patient: patientUsername,
        medicine: prescriptionList,
        date: new Date(),
      }

  // Send the request with the appropriate HTTP method
  return await axios({
    method: httpMethod,
    url: apiUrl,
    data: requestData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function getPrescriptionApi() {
  const id = localStorage.getItem('PrescriptionId')
  const token = localStorage.getItem('token')

  return await axios.get(`http://localhost:3000/prescriptions/single/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function editPrescriptionApi(prescriptionList: any) {
  const token = localStorage.getItem('token')
  const id = localStorage.getItem('PrescriptionId')

  return await axios.put(
    `http://localhost:3000/prescriptions/edit/${id}`,
    {
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
