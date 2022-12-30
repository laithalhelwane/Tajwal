import ComplainModel, { ComplainDocument } from '../models/complain.model';
import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  DocumentDefinition,
} from 'mongoose';

export async function createComplain(
  input: DocumentDefinition<Omit<ComplainDocument, 'createdAt' | 'updatedAt'>>
) {
  try {
    const complain = new ComplainModel(input);
    await complain.save();
    return complain.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}
export async function findComplains(
  query: FilterQuery<ComplainDocument>,
  options: QueryOptions = { lean: true }
) {
  return ComplainModel.find(query, {}, options);
}
export async function findAndUpdateComplain(
  query: FilterQuery<ComplainDocument>,
  update: UpdateQuery<ComplainDocument>,
  options: QueryOptions
) {
  const complains = await ComplainModel.find(query);

  for (let i = 0; i < complains.length; i++) {
    complains[i].seen = true;
    complains[i].save();
  }

  return complains;
}
export async function deleteComplain(query: FilterQuery<ComplainDocument>) {
  return ComplainModel.deleteOne(query);
}
