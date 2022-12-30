import LocationModel, { LocationDocument } from '../models/location.model';
import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  DocumentDefinition,
} from 'mongoose';

export async function createLocation(
  input: DocumentDefinition<Omit<LocationDocument, 'createdAt'|'updatedAt'>>
) {
  try {
    const location = new LocationModel(input);
    await location.save();
  } catch (e: any) {
    throw new Error(e);
  }
}
export async function findLocation(
  query: FilterQuery<LocationDocument>,
  options: QueryOptions = { lean: true }
) {
  return LocationModel.findOne(query, {}, options);
}

export async function findAndUpdateLocation(
  query: FilterQuery<LocationDocument>,
  update: UpdateQuery<LocationDocument>,
  options: QueryOptions
) {
  return LocationModel.findOneAndUpdate(query, update, options);
}
export async function deleteLocation(query: FilterQuery<LocationDocument>) {
  return LocationModel.deleteMany(query);
}
