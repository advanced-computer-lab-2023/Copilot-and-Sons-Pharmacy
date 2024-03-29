import { HydratedDocument, InferSchemaType, model, Schema } from 'mongoose'
import { UserType } from 'pharmacy-common/types/user.types'

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    /**
     * This will be useful in the FE, to know which type of user is logged in, so we can
     * then send a request to the correct endpoint to fetch additional information.
     */
    type: { type: String, enum: UserType, required: true },

    notifications: [
      {
        title: { type: String, required: true },
        description: { type: String },
      },
    ],
  },
  { timestamps: true }
)

export type IUser = HydratedDocument<InferSchemaType<typeof userSchema>>

const User = model('User', userSchema)

export default User
