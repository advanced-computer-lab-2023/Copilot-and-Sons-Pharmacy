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

export default model<IAdministrator>('Administrator', administratorSchema)
