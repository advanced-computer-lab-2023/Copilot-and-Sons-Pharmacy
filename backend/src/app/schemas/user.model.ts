import { HydratedDocument, InferSchemaType, model, Schema } from 'mongoose'

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
})

export type IUser = HydratedDocument<InferSchemaType<typeof userSchema>>

const User = model('User', userSchema)

export default User
