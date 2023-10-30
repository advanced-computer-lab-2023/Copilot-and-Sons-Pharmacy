import mongoose, { Schema, Document, Model } from 'mongoose'
import validator from 'validator'
import User from './user.model'
import { ICart } from './cart.model';

const PatientSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'field must be valid email address'],
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  emergencyContact: {
    fullName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
      required: true,
    },
  },
  cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
})

export interface IPatient extends Document {
  // username: string;
  token: string
  name: string
  email: string
  // password: string;
  dateOfBirth: Date
  gender: 'Male' | 'Female'
  mobileNumber: string
  emergencyContact: {
    fullName: string
    mobileNumber: string
    relation: string
  }
  cart: ICart
}

const Patient: Model<IPatient> = mongoose.model<IPatient>(
  'Patient',
  PatientSchema
)

export default Patient
