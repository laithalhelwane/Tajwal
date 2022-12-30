import TypeModel, { TypeDocument } from '../models/type.model';
import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  DocumentDefinition,
} from 'mongoose';

export async function createType(
  input: DocumentDefinition<Omit<TypeDocument, 'createdAt' | 'updatedAt'>>
) {
  try {
    const type = new TypeModel(input);
    await type.save();
    return type;
  } catch (e: any) {
    throw new Error(e);
  }
}
export async function findTypes(query: FilterQuery<TypeDocument>) {
  return TypeModel.find(query).lean();
}
export async function findType(
  query: FilterQuery<TypeDocument>,
  options: QueryOptions = { lean: true }
) {
  return TypeModel.findOne(query, {}, options);
}

export async function findAndUpdateType(
  query: FilterQuery<TypeDocument>,
  update: UpdateQuery<TypeDocument>,
  options: QueryOptions
) {
  return TypeModel.findOneAndUpdate(query, update, options);
}
export async function deleteType(query: FilterQuery<TypeDocument>) {
  return TypeModel.deleteOne(query);
}
