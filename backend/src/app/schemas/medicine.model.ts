import { HydratedDocument, InferSchemaType, Schema, model } from 'mongoose'

const medicineSchema = new Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0, min: 0 },
  Image: { type: String },
  activeIngredients: { type: [String], required: true },
  medicinalUse: { type: [String], required: true },
  sales: { type: Number, default: 0 },
})

export type IMedicine = HydratedDocument<InferSchemaType<typeof medicineSchema>>

const Medicine = model('Medicine', medicineSchema)

export default Medicine
