import WorkingHoursModel, {
  WorkingHoursDocument,
} from '../models/workingHours.model';
import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  DocumentDefinition,
} from 'mongoose';

export async function createWorkingTime(
  input: DocumentDefinition<
    Omit<WorkingHoursDocument, 'createdAt' | 'updatedAt'>
  >
) {
  try {
    const workingHours = new WorkingHoursModel(input);
    await workingHours.save();
  } catch (e: any) {
    throw new Error(e);
  }
}
export async function findWorkingTime(
  query: FilterQuery<WorkingHoursDocument>,
  options: QueryOptions = { lean: true }
) {
  return WorkingHoursModel.findOne(query, {}, options);
}

export async function findAndUpdateWorkingTime(
  query: FilterQuery<WorkingHoursDocument>,
  update: UpdateQuery<WorkingHoursDocument>,
  options: QueryOptions
) {
  return WorkingHoursModel.findOneAndUpdate(query, update, options);
}
export async function deleteWorkingTime(
  query: FilterQuery<WorkingHoursDocument>
) {
  return WorkingHoursModel.deleteMany(query);
}
