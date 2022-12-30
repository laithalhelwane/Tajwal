import mongoose from 'mongoose';
import { BusinessTypeDocument } from './businessType.model';
import { ProductDocument } from './product.model';

export interface CategoryDocument extends mongoose.Document {
  name: string;
  businessTypeId: BusinessTypeDocument['_id']
  products?: ProductDocument[];
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new mongoose.Schema<CategoryDocument>({
  name: {
    type: String,
    required: true,
  },
  businessTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
}, {timestamps: true});

CategorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'categoryId'
});

const CategoryModel = mongoose.model<CategoryDocument>(
  'Category',
  CategorySchema
);

export default CategoryModel;
