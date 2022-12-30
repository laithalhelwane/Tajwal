import ProductModel, { ProductDocument } from '../models/product.model';
import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  DocumentDefinition,
} from 'mongoose';
import { createImageLocal } from './image.service';
import { set } from 'lodash';

export async function createProduct(
  input: DocumentDefinition<
    Omit<ProductDocument, 'createdAt' | 'updatedAt' | 'getRateValue'>
  >,
  req: any
) {
  try {
    const product = new ProductModel(input);
    const ret = (await product.save()).toJSON({ virtuals: true });
    await createImageLocal(
      {
        url: `${req.protocol}://${req.headers.host!}`,
        ownerId: ret._id,
      },
      'product'
    );
    return ret;
  } catch (e: any) {
    throw new Error(e);
  }
}
export async function findProduct(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = {
    populate: ['categories', 'images', 'types', 'comments'],
  }
) {
  const product = await ProductModel.findOne(query, {}, options);
  if (!product) return null;
  const rateValue = await product.getRateValue();
  return { ...product.toJSON({ virtuals: true }), rateValue: rateValue };
}
export async function findProducts(query: FilterQuery<ProductDocument>) {
  const products = await ProductModel.find(query).populate([
    'categories',
    'images',
    'types',
    'comments',
  ]);
  const productsJson = [];
  for (let product of products) {
    const productJson = product.toJSON({ virtuals: true });
    const rateValue = await product.getRateValue();
    const temp = set(productJson, 'rateValue', rateValue);
    productsJson.push(temp);
  }
  // if (!product) return null;
  // const rateValue = await product.getRateValue();
  return productsJson;
}

export async function findAndUpdateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return ProductModel.findOneAndUpdate(query, update, options);
}
export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return ProductModel.deleteMany(query);
}
