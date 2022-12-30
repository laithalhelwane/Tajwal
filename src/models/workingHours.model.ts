import mongoose from 'mongoose';
import { BusinessDocument } from './business.model';

export interface WorkingHoursDocument extends mongoose.Document {
  businessId: BusinessDocument['_id'];
  dayName: string;
  openHour: number;
  closeHour: number;
  createdAt: Date;
  updatedAt: Date;
}

const WorkingHoursSchema = new mongoose.Schema<WorkingHoursDocument>({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  dayName: {
    type: String,
    required: true,
  },
  openHour: {
    type: Number,
    require: true,
  },
  closeHour: {
    type: Number,
    required: true,
  },
});

const WorkingHoursModel = mongoose.model<WorkingHoursDocument>(
  'WorkingHours',
  WorkingHoursSchema
);
export default WorkingHoursModel;
