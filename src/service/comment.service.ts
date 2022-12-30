import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from 'mongoose';
import CommentModel, { CommentDocument } from '../models/comment.model';
export async function createComment(
  input: DocumentDefinition<Omit<CommentDocument, 'createdAt' | 'updatedAt'>>
) {
  try {
    const comment = new CommentModel(input);
    await comment.save();
    return comment.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function findComment(
  query: FilterQuery<CommentDocument>,
  options: QueryOptions = { lean: true }
) {
  
  return CommentModel.findOne(query, {}, options);
}
export async function deleteComment(input: FilterQuery<CommentDocument>) {
  return CommentModel.deleteOne(input);
}
export async function findAndUpdateComment(
  query: FilterQuery<CommentDocument>,
  update: UpdateQuery<CommentDocument>,
  options: QueryOptions
) {
  return CommentModel.findOneAndUpdate(query, update, options);
}
