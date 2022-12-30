import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import { ImageDocument } from './image.model';
import { findProductRate } from '../service/rate.service';
import { ProductDocument } from './product.model';
import { findProduct } from '../service/product.service';
import { findFollows } from '../service/follow.service';
import { BusinessDocument } from './business.model';
import { findBusiness } from '../service/business.service';
export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  image: ImageDocument;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  rsid?: string;
  getRatedProducts(): ProductDocument[];
  getFollowedBusiness(): BusinessDocument[];
  comparePasswords(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    rsid: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const user = this as unknown as UserDocument;
  if (!user.isModified('password')) {
    return next();
  }
  const saltWorkFactor = config.get<number>('saltWorkFactor');

  const salt = await bcrypt.genSalt(saltWorkFactor);

  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePasswords = async function (
  candidatePassword: string
) {
  const user = this as unknown as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch(() => false);
};
userSchema.virtual('image', {
  ref: 'Image',
  localField: '_id',
  foreignField: 'ownerId',
  justOne: true,
});
userSchema.methods.getRatedProducts = async function () {
  const user = this as unknown as UserDocument;
  const rateLog = await findProductRate({ userId: this._id });
  const products: any[] = [];
  for (let rate of rateLog) {
    const product = await findProduct({ _id: rate.productId });
    if (product) products.push(product);
  }
  return products;
};
userSchema.methods.getFollowedBusiness = async function () {
  const user = this as unknown as UserDocument;
  const followLog = await findFollows({ userId: this._id });
  const businesses: any[] = [];
  for (let follow of followLog) {
    const business = await findBusiness({ _id: follow.businessId });
    if (business) businesses.push(business);
  }
  return businesses;
};
const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
