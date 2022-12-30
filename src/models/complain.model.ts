import mongoose from 'mongoose';
import { BusinessDocument } from './business.model';
import { ImageDocument } from './image.model';
import { UserDocument } from './user.model';

export interface ComplainDocument extends mongoose.Document {
  userId: UserDocument['_id'];
  userName: UserDocument['name'];
  userImage: ImageDocument['url'];
  businessId: BusinessDocument['_id'];
  seen?: boolean;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const ComplainSchema = new mongoose.Schema<ComplainDocument>(
  {
    userName: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
      required: true,
    },
    seen: { type: Boolean, default: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const ComplainModel = mongoose.model<ComplainDocument>(
  'Complain',
  ComplainSchema
);
export default ComplainModel;
