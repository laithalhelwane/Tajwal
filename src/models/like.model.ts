import mongoose from 'mongoose';
import { ProductDocument } from './product.model';
import { UserDocument } from './user.model';
export interface LikeDocument extends mongoose.Document {
  //  businessId: mongoose.Types.ObjectId;
  userId: UserDocument['_id'];
  productId: ProductDocument['_id'];
  likeValue: number; 
  createdAt: Date;
  updatedAt: Date;
}

const LikeSchema = new mongoose.Schema<LikeDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    // businessId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    // },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    likeValue: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

const LikeModel = mongoose.model<LikeDocument>('Like', LikeSchema);

export default LikeModel;
