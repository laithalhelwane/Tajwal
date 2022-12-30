import FollowModel, { FollowDocument } from '../models/follow.model';
import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  DocumentDefinition,
} from 'mongoose';

export async function createFollow(
  input: DocumentDefinition<Omit<FollowDocument, 'createdAt' | 'updatedAt'>>
) {
  try {
    const follow = new FollowModel(input);
    await follow.save();
    return follow;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function findFollow(
  query: FilterQuery<FollowDocument>,
  options: QueryOptions = { lean: true }
) {
  return FollowModel.findOne(query, {}, options);
}
export async function findFollows(
  query: FilterQuery<FollowDocument>,
  options: QueryOptions = { lean: true }
) {
  return FollowModel.find(query).lean();
}
export async function findAndUpdateFollow(
  query: FilterQuery<FollowDocument>,
  update: UpdateQuery<FollowDocument>,
  options: QueryOptions
) {
  return FollowModel.findOneAndUpdate(query, update, options);
}
export async function deleteFollow(query: FilterQuery<FollowDocument>) {
  return FollowModel.deleteOne(query);
}
