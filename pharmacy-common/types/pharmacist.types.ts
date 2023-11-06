export enum PharmacistStatus {
  Accepted = 'Accepted',
  Pending = 'Pending',
  Rejected = 'Rejected',
}

export enum PharmacistDegree {
  Associate = 'Associate degree',
  Bachelor = "Bachelor's degree",
  Master = "Master's degree",
  Doctoral = 'Doctoral degree',
}

export interface IPharmacist {
  id: string
  user: string
  name: string
  email: string
  dateOfBirth: Date
  hourlyRate: number
  affilation: string
  status: PharmacistStatus
  educationalBackground: {
    major: string
    university: string
    graduationYear: number
    degree: PharmacistDegree
  }
}
