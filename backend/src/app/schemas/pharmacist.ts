import mongoose from 'mongoose'
import User from './user.model'

const Schema = mongoose.Schema

const pharmacistSchema = new Schema(
  {
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
      // unique : true, to be done later
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
    affilation: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Accepted', 'Rejected', 'Pending'],
      required: true,
    },
    educationalBackground: {
      major: {
        type: String,
        required: true,
      },
      university: {
        type: String,
        required: true,
      },
      graduationYear: {
        type: Number,
        required: true,
      },
      degree: {
        type: String,
        enum: [
          'Associate degree',
          "Bachelor's degree",
          "Master's degree",
          'Doctoral degree',
        ],
        required: true,
      },
    },
  },
  { timestamps: true }
)

const Pharmacist = mongoose.model('Pharmacist', pharmacistSchema)

export default Pharmacist
