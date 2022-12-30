import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export interface SessionDocument extends mongoose.Document {
  user: UserDocument['id'];
  userType: string;
  valid?: boolean;
  userAgent: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const sessionSchema = new mongoose.Schema<SessionDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    userType: {
      type: String,
    },
    valid: {
      type: Boolean,
      default: true,
    },
    userAgent: {
      type: String,
    },
  },
  { timestamps: true }
);

const sessionModel = mongoose.model<SessionDocument>('Session', sessionSchema);

export default sessionModel;
