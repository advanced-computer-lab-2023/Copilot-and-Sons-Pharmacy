import { api } from '.'

const clinicBase = 'http://localhost:3000'

// Types copied from Clinic, not the best way to do it
export enum DoctorStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

export interface DoctorResponseBase {
  id: string
  username: string
  name: string
  email: string
  dateOfBirth: Date
  hourlyRate: number
  affiliation: string
  educationalBackground: string
  speciality: string
  requestStatus: DoctorStatus
}

export interface GetApprovedDoctorResponse extends DoctorResponseBase {
  availableTimes: [Date]
  sessionRate: number
  hasDiscount: boolean
  hourlyRateWithMarkup: number
}

export interface GetApprovedDoctorsResponse {
  doctors: GetApprovedDoctorResponse[]
}

export function getDoctors() {
  return api
    .get<GetApprovedDoctorsResponse>(`${clinicBase}/doctors/approved`)
    .then((res) => res.data)
}
