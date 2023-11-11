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

    /**
     * I didn't use a reference to the delivery address of the user,
     * because once a order has been placed to a delivery address, even if the user
     * changed that address later or deleted it, the order should still have the same
     * address information. That is why it is copied here, not referenced.
     */
    address: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  { timestamps: true }
)

export interface IOrder {
  patientID: string
  total: number
  date: Date
  status: 'pending' | 'delivered' | 'cancelled'
  cartID: string
  address: {
    address: string
    city: string
    country: string
  }
}

export type IOrderDocument = HydratedDocument<
  InferSchemaType<typeof orderSchema>
>

export const OrderModel = model('Order', orderSchema)
