import { HydratedDocument, InferSchemaType, model, Schema } from 'mongoose'
import User from './user.model'
import validator from 'validator'

const administratorSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: User },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'field must be valid email address'],
  },
})

export type IAdministrator = HydratedDocument<
  InferSchemaType<typeof administratorSchema>
>

const Administrator = model('Administrator', administratorSchema)

export default Administrator
