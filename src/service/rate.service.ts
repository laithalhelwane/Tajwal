import BusinessRateModel, {
  BusinessRateDocument,
} from '../models/businessRate.model';
import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  DocumentDefinition,
} from 'mongoose';
import ProductRateModel, {
  ProductRateDocument,
} from '../models/productRate.model';

export async function createBusinessRate(
  input: DocumentDefinition<
    Omit<BusinessRateDocument, 'createdAt' | 'updatedAt'>
  >
) {
  try {
    const rate = new BusinessRateModel(input);
    await rate.save();
    return rate.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}
export async function createProductRate(
  input: DocumentDefinition<
    Omit<ProductRateDocument, 'createdAt' | 'updatedAt'>
  >
) {
  try {
    const rate = new ProductRateModel(input);
    await rate.save();
    return rate.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}
export async function findBusinessRate(
  query: FilterQuery<BusinessRateDocument>,
  options: QueryOptions = { lean: true }
) {
  return BusinessRateModel.findOne(query, {}, options);
}

export async function findAndUpdateBusinessRate(
  query: FilterQuery<BusinessRateDocument>,
  update: UpdateQuery<BusinessRateDocument>,
  options: QueryOptions
) {
  return BusinessRateModel.findOneAndUpdate(query, update, options);
}
export async function deleteBusinessRate(
  query: FilterQuery<BusinessRateDocument>
) {
  return BusinessRateModel.deleteOne(query);
}

export async function deleteProductRate(
  query: FilterQuery<ProductRateDocument>
) {
  return ProductRateModel.deleteOne(query);
}
export async function findProductRate(query: FilterQuery<ProductRateDocument>) {
  return ProductRateModel.find(query).lean();
}
