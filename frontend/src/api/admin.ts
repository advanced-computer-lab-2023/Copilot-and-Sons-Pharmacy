import { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { api } from '.'

interface AddAdminData {
  username: string
  password: string
  email: string
}
// interface DeleteUserData {
//     username: string;
//   }
interface AddadminResponse {
  user: {
    username: string
    password: string
    email: string
  }
}

export async function AddAdmin(
  adminData: AddAdminData
): Promise<AxiosResponse<AddadminResponse>> {
  const response = await api.post<AddadminResponse>(
    `/admin/add-admin`,
    adminData
  )

  return response
}

//Calling the remoae user function using axios
export function removeUser(username: string) {
  return api
    .delete(`/admin/removeUser`, { data: { username } })
    .then((response) => response)
    .catch((error) => {
      throw new Error(error)
    })
}

export async function getAllUsers() {
  const response = await api.get('/admin/getAllUsers')
  console.log('users', response.data)

  return response.data
}

//setting a mutation using react_query to handle the changes to database
// exporting it to use in the actual component
export function useRemoveUser() {
  return useMutation(removeUser)
}

export async function getPendingPharmacists() {
  const response = await api.get<any[]>(`/admin/getPendingPharmacists`)

  return response.data as any[]
}

export async function getApprovedPharmacists() {
  const response = await api.get<any[]>(`/admin/getAcceptedPharmacists`)

  return response.data as any[]
}
