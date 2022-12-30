import mongoose from 'mongoose';
import { LocationDocument } from './location.model';
import { WorkingHoursDocument } from './workingHours.model';
import BusinessRateModel from './businessRate.model';
import config from 'config';
import bcrypt from 'bcrypt';
import { ImageDocument } from './image.model';
import { BusinessTypeDocument } from './businessType.model';
import { ProductDocument } from './product.model';

export interface BusinessDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  phoneNumber?: string;
  description: string;
  rsid?: string;
  image?: ImageDocument['url'];
  businessTypeId: BusinessTypeDocument['_id'];
  location?: LocationDocument;
  workingTime: WorkingHoursDocument[];
  businessTypeName: string;
  rateCount?: number;
  productsCount?: number;
  followersCount?: number;
  products?: ProductDocument[];
  comparePasswords(candidatePassword: string): Promise<boolean>;
  getRateValue(): Promise<number>;
  createdAt: Date;
  updatedAt: Date;
}
const BusinessSchema = new mongoose.Schema<BusinessDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    businessTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    rsid: {
      type: String,
    },
  },
  { timestamps: true }
);

BusinessSchema.virtual('location', {
  ref: 'Location',
  localField: '_id',
  foreignField: 'businessId',
  justOne: true,
});
BusinessSchema.virtual('workingHours', {
  ref: 'WorkingHours',
  localField: '_id',
  foreignField: 'businessId',
});
BusinessSchema.virtual('image', {
  ref: 'Image',
  localField: '_id',
  foreignField: 'ownerId',
  justOne: true,
});

BusinessSchema.virtual('followersCount', {
  ref: 'Follow',
  localField: '_id',
  foreignField: 'businessId',
  count: true,
});
BusinessSchema.virtual('businessTypeName', {
  ref: 'BusinessType',
  localField: 'businessTypeId',
  foreignField: '_id',
  justOne: true,
});
BusinessSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'businessId',
  options: { populate: ['categories', 'images', 'types', 'comments'] },
});
BusinessSchema.virtual('productsCount', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'businessId',
  count: true,
});

BusinessSchema.virtual('rateCount', {
  ref: 'Business_Rate',
  localField: '_id',
  foreignField: 'businessId',
  count: true,
});
BusinessSchema.methods.getRateValue = async function () {
  let RatePerValue = new Map<number, number>();
  const rates = await BusinessRateModel.find({
    businessId: this._id,
  }).lean();

  let rateValue = 0;
  for (let rate of rates) {
    if (!RatePerValue.has(rate.ratingValue)) {
      RatePerValue.set(rate.ratingValue, 0);
    }
    RatePerValue.set(rate.ratingValue, RatePerValue.get(rate.ratingValue)! + 1);
  }
  let top = 0,
    bottom = 0;
  for (let t of RatePerValue) {
    top += t[1] * t[0];
    bottom += t[1];
  }
  if (bottom !== 0) rateValue = top / bottom;
  return rateValue;
};

BusinessSchema.pre('save', async function (next) {
  const business = this as unknown as BusinessDocument;
  if (!business.isModified('password')) {
    return next();
  }
  const saltWorkFactor = config.get<number>('saltWorkFactor');

  const salt = await bcrypt.genSalt(saltWorkFactor);

  const hash = await bcrypt.hash(business.password, salt);

  business.password = hash;

  return next();
});

BusinessSchema.methods.comparePasswords = async function (
  candidatePassword: string
) {
  const business = this as unknown as BusinessDocument;
  return bcrypt
    .compare(candidatePassword, business.password)
    .catch(() => false);
};
const BusinessModel = mongoose.model<BusinessDocument>(
  'Business',
  BusinessSchema
);
export default BusinessModel;
