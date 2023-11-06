import { Schema, Document, Model, model } from 'mongoose';
import { IMedicine } from './medicine.model';

// Define a type for the Cart Item
interface ICartItem {
  medicine: IMedicine;
  quantity: number;
}


const cartItemSchema = new Schema<ICartItem>({
  medicine: { type: Schema.Types.ObjectId, ref: 'Medicine' },
  quantity: Number,
});


export interface ICart extends Document {
    items: Array<{
        medicine: IMedicine;
        quantity: number;
      }>;
}


const cartSchema = new Schema<ICart>({
  items: [cartItemSchema],
});

export const CartModel: Model<ICart> = model('Cart', cartSchema);
