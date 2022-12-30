import mongoose from 'mongoose';
import { BusinessDocument } from './business.model';
import { UserDocument } from './user.model';
export interface BusinessRateDocument extends mongoose.Document {
  userId: UserDocument['_id'];
  businessId: BusinessDocument['_id'];
  userRsId: UserDocument['rsid'];
  businessRsId: BusinessDocument['rsid'];
  ratingValue: number;
  createdAt: Date;
  updatedAt: Date;
}

const BusinessRateSchema = new mongoose.Schema<BusinessRateDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    businessRsId: {
      type: String,
      required: true,
    },
    userRsId: {
      type: String,
      required: true,
    },
    ratingValue: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const BusinessRateModel = mongoose.model<BusinessRateDocument>(
  'Business_Rate',
  BusinessRateSchema
);
export default BusinessRateModel;
