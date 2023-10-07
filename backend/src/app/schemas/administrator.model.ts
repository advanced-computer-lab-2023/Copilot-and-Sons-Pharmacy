import { Document, model, Schema } from 'mongoose';

export interface IAdministrator extends Document {
  username: string;
  password: string;
  token:string;
}


const administratorSchema = new Schema<IAdministrator>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token:{
    type: String,
  },
});

export default model<IAdministrator>('Administrator', administratorSchema);