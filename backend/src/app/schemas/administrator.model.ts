import { HydratedDocument, InferSchemaType, model, Schema } from 'mongoose'
import User from './user.model'

const administratorSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: User },
})

export type IAdministrator = HydratedDocument<
  InferSchemaType<typeof administratorSchema>
>

const Administrator = model('Administrator', administratorSchema)

export default Administrator
