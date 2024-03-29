import mongoose from 'mongoose'
import {
  ContractStatus,
  DoctorStatus,
} from 'pharmacy-common/types/doctor.types'

const Schema = mongoose.Schema

const doctorSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    hourlyRate: { type: Number, required: true },
    affiliation: { type: String, required: true },
    educationalBackground: { type: String, required: true },
    speciality: { type: String, required: true },
    documents: { type: [String], required: true },
    requestStatus: {
      type: String,
      required: true,
      enum: DoctorStatus,
      default: DoctorStatus.Pending,
    },
    contractStatus: {
      type: String,
      required: true,
      enum: ContractStatus,
      default: ContractStatus.Pending,
    },
    availableTimes: { type: [Date], required: true, default: [] },
    walletMoney: { type: Number, required: true, default: 0 },
    employmentContract: { type: [String], required: true, default: [] },
  },

  { timestamps: true }
)

export type DoctorDocument = mongoose.InferSchemaType<typeof doctorSchema>

export const DoctorModel = mongoose.model('Doctor', doctorSchema)
