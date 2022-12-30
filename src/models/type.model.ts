import mongoose from 'mongoose';
import { BusinessTypeDocument } from './businessType.model';

export interface TypeDocument extends mongoose.Document {
  name: string;
  businessTypeId: BusinessTypeDocument['_id']
  createdAt: Date;
  updatedAt: Date;
}
const TypeSchema = new mongoose.Schema<TypeDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    businessTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    }
  },
  { timestamps: true }
);

const TypeModel = mongoose.model<TypeDocument>(
  'Type',
  TypeSchema
);

export default TypeModel;
