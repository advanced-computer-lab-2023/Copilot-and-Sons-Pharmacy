export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export enum Relation {
  Wife = 'Wife',
  Husband = 'Husband',
  Son = 'Son',
  Daughter = 'Daughter',
}

export interface IPatient {
  id: string
  user: string
  name: string
  email: string
  dateOfBirth: Date
  gender: Gender
  mobileNumber: string
  emergencyContact: {
    fullName: string
    mobileNumber: string
    relation: Relation
  }
}
