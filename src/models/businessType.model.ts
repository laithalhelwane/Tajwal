import mongoose from 'mongoose';
import { BusinessDocument } from './business.model';

export interface BusinessTypeDocument extends mongoose.Document {
  name: string;
  business?: BusinessDocument[];
  createdAt: Date;
  updatedAt: Date;
}
const BusinessTypeSchema = new mongoose.Schema<BusinessTypeDocument>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

BusinessTypeSchema.virtual('business', {
  ref: 'Business',
  localField: '_id',
  foreignField: 'businessTypeId',
});

const BusinessTypeModel = mongoose.model<BusinessTypeDocument>(
  'BusinessType',
  BusinessTypeSchema
);

export default BusinessTypeModel;
