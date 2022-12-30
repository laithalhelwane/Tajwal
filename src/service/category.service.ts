import CategoryModel, { CategoryDocument } from '../models/category.model';
import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  DocumentDefinition,
} from 'mongoose';

export async function createCategory(
  input: DocumentDefinition<Omit<CategoryDocument, 'createdAt' | 'updatedAt'>>
) {
  try {
    const category = new CategoryModel(input);
    await category.save();
    return category.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}
export async function findCategory(
  query: FilterQuery<CategoryDocument>,
  options: QueryOptions = { lean: true }
) {
  return CategoryModel.findOne(query, {}, options);
}
export async function findCategories(
  query: FilterQuery<CategoryDocument>
) {
  return CategoryModel.find(query).lean();
}

export async function findAndUpdateCategory(
  query: FilterQuery<CategoryDocument>,
  update: UpdateQuery<CategoryDocument>,
  options: QueryOptions
) {
  return CategoryModel.findOneAndUpdate(query, update, options);
}
export async function deleteCategory(query: FilterQuery<CategoryDocument>) {
  return CategoryModel.deleteOne(query);
}
