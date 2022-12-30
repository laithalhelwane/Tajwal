import mongoose from 'mongoose';
import { ImageDocument } from './image.model';
import { ProductDocument } from './product.model';
import { UserDocument } from './user.model';
export interface CommentDocument extends mongoose.Document {
  userId: UserDocument['_id'];
  userName: string;
  productId: ProductDocument['_id'];
  userImage: ImageDocument['url'];
  createdAt: Date;
  updatedAt: Date;
  text: string;
}
const CommentSchema = new mongoose.Schema<CommentDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
      required: true,
    },
    productId: {
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
const CommentModel = mongoose.model<CommentDocument>('Comment', CommentSchema);
export default CommentModel;
