import { HydratedDocument, InferSchemaType, Schema, model } from 'mongoose'
import { ICart } from './cart.model'

const orderSchema = new Schema(
  {
    patientID: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    cart: { type: Schema.Types.ObjectId, ref: 'Cart', required: true },
    total: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
)

export interface IOrder {
  patientID: string
  cart: ICart
  total: number
  date: Date
}

export type IOrderDocument = HydratedDocument<
  InferSchemaType<typeof orderSchema>
>

export const OrderModel = model('Order', orderSchema)
