import { HydratedDocument, InferSchemaType, Schema, model } from 'mongoose'

const orderSchema = new Schema(
  {
    patientID: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    total: { type: Number, required: true },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ['pending', 'delivered', 'cancelled'],
      default: 'pending',
    },
    cartID: { type: Schema.Types.ObjectId, ref: 'Cart', required: true },
  },
  { timestamps: true }
)

export interface IOrder {
  patientID: string
  total: number
  date: Date
  status: 'pending' | 'delivered' | 'cancelled'
  cartID: string
}

export type IOrderDocument = HydratedDocument<
  InferSchemaType<typeof orderSchema>
>

export const OrderModel = model('Order', orderSchema)
