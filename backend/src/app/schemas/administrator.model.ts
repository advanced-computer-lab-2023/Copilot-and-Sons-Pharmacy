import { Document, model, Schema } from 'mongoose'
import User, { IUser } from './user.model'

export interface IAdministrator extends Document {
  user: IUser
}

const administratorSchema = new Schema<IAdministrator>({
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
})

const Administrator = model<IAdministrator>(
  'Administrator',
  administratorSchema
)

export default Administrator
