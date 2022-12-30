import mongoose from 'mongoose';
import { BusinessDocument } from './business.model';
import { UserDocument } from './user.model';
export interface FollowDocument extends mongoose.Document {
  userId: UserDocument['_id'];
  businessId: BusinessDocument['_id'];
  createdAt: Date;
  updatedAt: Date;
}
const FollowSchema = new mongoose.Schema<FollowDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);
const FollowModel = mongoose.model<FollowDocument>('Follow', FollowSchema);
export default FollowModel;
