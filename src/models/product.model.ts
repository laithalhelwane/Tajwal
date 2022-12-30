import mongoose from 'mongoose';
import { BusinessDocument } from './business.model';
import { ProductTypeDocument } from './productType.model';
import { ProductCategoryDocument } from './productCategory.model';
import { ImageDocument } from './image.model';
import ProductRateModel from './productRate.model';
import { CommentDocument } from './comment.model';
export interface ProductDocument extends mongoose.Document {
  businessId: BusinessDocument['_id'];
  businessName: BusinessDocument['name'];
  description: string;
  name: string;
  price: number;
  images?: ImageDocument[];
  types?: ProductTypeDocument[];
  categories?: ProductCategoryDocument[];
  comments?: CommentDocument[];
  getRateValue(): Promise<number>;
  createdAt: Date;
  updatedAt: Date;
  sizes?: string[];
  rsid?: string;
}
// todo Add images support to model
const ProductSchema = new mongoose.Schema<ProductDocument>(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rsid: {
      type: String,
    },
    sizes: [String],
  },
  { timestamps: true }
);
ProductSchema.virtual('categories', {
  localField: '_id',
  foreignField: 'productId',
  ref: 'ProductCategory',
});
ProductSchema.virtual('comments', {
  localField: '_id',
  foreignField: 'productId',
  ref: 'Comment',
});
ProductSchema.virtual('types', {
  localField: '_id',
  foreignField: 'productId',
  ref: 'ProductType',
});
ProductSchema.virtual('images', {
  localField: '_id',
  foreignField: 'ownerId',
  ref: 'Image',
});
ProductSchema.methods.getRateValue = async function () {
  let RatePerValue = new Map<number, number>();
  const rates = await ProductRateModel.find({
    productId: this._id,
  }).lean();

  let rateValue = 0;
  for (let rate of rates) {
    if (!RatePerValue.has(rate.ratingValue)) {
      RatePerValue.set(rate.ratingValue, 0);
    }
    RatePerValue.set(rate.ratingValue, RatePerValue.get(rate.ratingValue)! + 1);
  }
  let top = 0,
    bottom = 0;
  for (let t of RatePerValue) {
    top += t[1] * t[0];
    bottom += t[1];
  }
  if (bottom !== 0) rateValue = top / bottom;
  return rateValue;
};
const ProductModel = mongoose.model<ProductDocument>('Product', ProductSchema);

export default ProductModel;
