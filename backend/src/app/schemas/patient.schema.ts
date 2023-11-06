import { Schema, HydratedDocument, InferSchemaType, model } from 'mongoose'
import validator from 'validator'
import User from './user.model'
import { Gender } from 'pharmacy-common/types/patient.types'

const PatientSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: User, required: true },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'field must be valid email address'],
  },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: Gender, required: true },
  mobileNumber: { type: String, required: true },
  emergencyContact: {
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    relation: { type: String, required: true },
  },
})

export type IPatient = HydratedDocument<InferSchemaType<typeof PatientSchema>>

const Patient = model('Patient', PatientSchema)

export default Patient
