import { AxiosResponse } from 'axios'
import { api } from '.'
import { GetCurrentUserResponse } from 'pharmacy-common/types/user.types'
import { LoginRequest, LoginResponse } from 'pharmacy-common/types/auth.types'

interface RegistrationData {
  username: string
  name: string
  email: string
  password: string
  dateOfBirth: string | null
  gender: string
  mobileNumber: string
  emergencyContact: {
    fullName: string
    mobileNumber: string
    relation: string
  }
}

interface RegistrationResponse {
  user: unknown
}

export async function registerUser(
  userData: RegistrationData
): Promise<AxiosResponse<RegistrationResponse>> {
  const response = await api.post<RegistrationResponse>(
    `/patient/register`,
    userData
  )

  return response
}

export async function login(request: LoginRequest): Promise<LoginResponse> {
  return await api.post<LoginResponse>('/auth/login', request).then((res) => {
    localStorage.setItem('token', res.data.token)

    return res.data
  })
}

export async function getCurrentUser(): Promise<GetCurrentUserResponse> {
  if (!localStorage.getItem('token')) {
    return Promise.reject('No token found')
  }

  return await api
    .get<GetCurrentUserResponse>(`/auth/me`)
    .then((res) => res.data)
}

export async function ForgetPasswordEmail(values: any) {
  return await api.post('/patient/requestOtp', values)
}

export async function ForgetPasswordVerifyOtp(value: any, otp: any) {
  return await api.post('/patient/verifyOtp', {
    email: value,
    otp,
  })
}

export async function ForgetPasswordUpdatePassword(
  email: any,
  newPassword: any
) {
  return await api.put('/patient/updatePassword', {
    email,
    newPassword,
  })
}
