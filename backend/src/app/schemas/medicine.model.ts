import mongoose, { Schema, Document, Model } from 'mongoose';

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description:{
    type:String,
    required:true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  Image:{
    type:String,

  },
  activeIngredients : {
    type: [String],
    required: true
  },
  medicinalUse: {
    type: [String],
    required: true,
  },
  sales: {
    type: Number,
    default: 0, 
  },
});
export interface IMedicine extends Document {
  name: string;
  price: number;
  description: string;
  quantity: number;
  Image: string;
  activeIngredients: string[];
  medicinalUse: string[];
  sales: number;
}


const Medicine: Model<IMedicine> = mongoose.model<IMedicine>('Medicine', medicineSchema);

export default Medicine;
