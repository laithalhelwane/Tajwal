import mongoose from 'mongoose';
import { CategoryDocument } from './category.model';
import { ProductDocument } from './product.model';
export interface ProductCategoryDocument extends mongoose.Document {
  productId: ProductDocument['_id'];
  categoryId: CategoryDocument['_id'];
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductCategorySchema = new mongoose.Schema<ProductCategoryDocument>(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, required: true },
    categoryName: { type: String, required: true },
  },
  { timestamps: true }
);

const ProductCategoryModel = mongoose.model<ProductCategoryDocument>(
  'ProductCategory',
  ProductCategorySchema
);
export default ProductCategoryModel;
