import { Document, model, Schema } from 'mongoose'

export interface IUser extends Document {
  username: string
  password: string
  role: string
  token: string
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
})

export default model<IUser>('User', userSchema)
