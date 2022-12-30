import LikeModel, { LikeDocument } from '../models/like.model';
import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  DocumentDefinition,
} from 'mongoose';

export async function createLike(
  input: DocumentDefinition<Omit<LikeDocument, 'createdAt'| 'updatedAt'>>
) {
  try {
    const category = new LikeModel(input);
    await category.save();
    return category;
  } catch (e: any) {
    throw new Error(e);
  }
}
export async function findLike(
  query: FilterQuery<LikeDocument>,
  options: QueryOptions = { lean: true }
) {
  return LikeModel.findOne(query, {}, options);
}

export async function findAndUpdateLike(
  query: FilterQuery<LikeDocument>,
  update: UpdateQuery<LikeDocument>,
  options: QueryOptions
) {
  return LikeModel.findOneAndUpdate(query, update, options);
}
export async function deleteLike(query: FilterQuery<LikeDocument>) {
  return LikeModel.deleteMany(query);
}
