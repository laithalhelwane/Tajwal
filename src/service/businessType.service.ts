import BusinessTypeModel, {
  BusinessTypeDocument,
} from '../models/businessType.model';
import {
  FilterQuery,
  DocumentDefinition,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

export async function createBusinessType(
  input: DocumentDefinition<
    Omit<BusinessTypeDocument, 'createdAt' | 'updatedAt' | 'business'>
  >
) {
  try {
    const businessType = new BusinessTypeModel(input);
    businessType.save();
    return businessType.toJSON();
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function findBusinessType(
  query: FilterQuery<BusinessTypeDocument>,
  options: QueryOptions = { lean: true }
) {
  return BusinessTypeModel.findOne(query, {}, options);
}
export async function getAllBusinessType() {
  return BusinessTypeModel.find({}).lean();
}

export async function findAndUpdateBusinessType(
  query: FilterQuery<BusinessTypeDocument>,
  update: UpdateQuery<BusinessTypeDocument>,
  options: QueryOptions
) {
  return BusinessTypeModel.findOneAndUpdate(query, update, options);
}
export async function deleteBusinessType(
  query: FilterQuery<BusinessTypeDocument>
) {
  return BusinessTypeModel.deleteOne(query);
}
