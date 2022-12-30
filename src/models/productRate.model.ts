import mongoose from 'mongoose';
import { ProductDocument } from './product.model';
import { UserDocument } from './user.model';
export interface ProductRateDocument extends mongoose.Document {
  userId: UserDocument['_id'];
  productId: ProductDocument['_id'];
  userRsId: UserDocument['rsid'];
  productRsId: ProductDocument['rsid'];
  ratingValue: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductRateSchema = new mongoose.Schema<ProductRateDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    productRsId: {
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

const ProductRateModel = mongoose.model<ProductRateDocument>("Product_Rate", ProductRateSchema);
export default ProductRateModel;