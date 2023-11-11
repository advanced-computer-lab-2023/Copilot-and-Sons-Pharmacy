import { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { api } from '.'

interface AddAdminData {
  username: string
  password: string
}
// interface DeleteUserData {
//     username: string;
//   }
interface AddadminResponse {
  user: {
    username: string
    password: string
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

//Calling the remove user function using axios
function removeUser(username: string) {
  return api
    .delete(`/admin/removeUser`, { data: { username } })
    .then((response) => response)
    .catch((error) => {
      throw new Error(error)
    })
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
  const response = await api.get<any[]>(`/admin/getApprovedPharmacists`)

  return response.data as any[]
}
