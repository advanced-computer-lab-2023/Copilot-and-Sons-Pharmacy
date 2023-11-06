import { HydratedDocument, InferSchemaType, model, Schema } from 'mongoose'

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  token: { type: String },
})

export type IUser = HydratedDocument<InferSchemaType<typeof userSchema>>

const User = model('User', userSchema)

export default User
