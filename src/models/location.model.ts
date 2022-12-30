import mongoose from 'mongoose';
import { BusinessDocument } from './business.model';

export interface LocationDocument extends mongoose.Document {
  businessId: BusinessDocument['_id'];
  longitude: number;
  latitude: number;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}
const LocationSchema = new mongoose.Schema<LocationDocument>(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true },
);

const LocationModel = mongoose.model<LocationDocument>(
  'Location',
  LocationSchema,
);
export default LocationModel;
