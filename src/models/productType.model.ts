import mongoose from 'mongoose';
import { TypeDocument } from './type.model';
import { ProductDocument } from './product.model';
export interface ProductTypeDocument extends mongoose.Document {
  productId: ProductDocument['_id'];
  typeId: TypeDocument['_id'];
  typeName: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductTypeSchema = new mongoose.Schema<ProductTypeDocument>(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    typeId: { type: mongoose.Schema.Types.ObjectId, required: true },
    typeName: { type: String, required: true },
  },
  { timestamps: true }
);

const ProductTypeModel = mongoose.model<ProductTypeDocument>(
  'ProductType',
  ProductTypeSchema
);
export default ProductTypeModel;
