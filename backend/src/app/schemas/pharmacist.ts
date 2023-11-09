import { HydratedDocument, InferSchemaType, Schema, model } from 'mongoose'
import User from './user.model'
import {
  PharmacistDegree,
  PharmacistStatus,
} from 'pharmacy-common/types/pharmacist.types'

const pharmacistSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: User, required: true },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      // unique : true, to be done later
    },
    dateOfBirth: { type: Date, required: true },
    hourlyRate: { type: Number, required: true },
    affilation: { type: String, required: true },
    status: { type: String, enum: PharmacistStatus, required: true },
    educationalBackground: {
      major: { type: String, required: true },
      university: { type: String, required: true },
      graduationYear: { type: Number, required: true },
      degree: { type: String, enum: PharmacistDegree, required: true },
    },
    documents: [{ type: String, required: true }],
  },
  { timestamps: true }
)

export type IPharmacist = HydratedDocument<
  InferSchemaType<typeof pharmacistSchema>
>

const Pharmacist = model('Pharmacist', pharmacistSchema)

export default Pharmacist
