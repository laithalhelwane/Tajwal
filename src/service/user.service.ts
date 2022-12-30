import { omit } from 'lodash';
import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';
import { createImageLocal } from './image.service';

export async function createUserService(
  input: DocumentDefinition<
    Omit<
      UserDocument,
      | 'createdAt'
      | 'updatedAt'
      | 'comparePasswords'
      | 'image'
      | 'getRatedProducts'
      | 'getFollowedBusiness'
    >
  >,
  req: any
) {
  try {
    const user = new UserModel(input);
    await user.save();
    await createImageLocal(
      {
        url: `${req.protocol}://${req.headers.host!}`,
        ownerId: user._id,
      },
      'user'
    );
    const populateArray = ['image'];
    await user.populate(populateArray);
    return omit(user.toJSON({ virtuals: populateArray }), 'password');
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return null;
  }
  const isValid = await user.comparePasswords(password);
  if (!isValid) {
    return null;
  }
  return omit(user.toJSON(), 'password');
}
export async function findUser(query: FilterQuery<UserDocument>) {
  const user = await UserModel.findOne(
    query,
    {},
    {
      populate: ['image'],
    }
  );
  if (!user) {
    return null;
  }
  const ratedProducts = await user.getRatedProducts();
  const followedBusiness = await user.getFollowedBusiness();

  return omit(
    { ...user.toJSON({ virtuals: true}), ratedProducts, followedBusiness },
    'password'
  );
}

export async function findAndUpdateUser(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions
) {
  const user = await UserModel.findOneAndUpdate(query, update, options);
  return omit(user, 'password');
}
