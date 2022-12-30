import { BusinessDocument } from '../models/business.model';
import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  FlattenMaps,
  _LeanDocument,
} from 'mongoose';
import BusinessModel from '../models/business.model';
import { omit, set } from 'lodash';
import { createImageLocal } from './image.service';
import ProductRateModel from '../models/productRate.model';
export async function getAllbusinesses(res: any) {
  try {
    const businesses = await BusinessModel.find().populate([
      'location',
      'workingHours',
      'image',
      'rateCount',
      'productsCount',
      'followersCount',
      'businessTypeName',
      'products',
    ]);
    const promises = await Promise.all(
      businesses.map(async (business) => {
        const rateValue = await business.getRateValue();
        const rate: number[] = [];
        if (business.products !== undefined) {
          for (let i = 0; i < business.products.length; i++) {
            let rateValue = await getProductRateById(business, i);
            rate.push(rateValue);
          }
        }
        const businessJson = omit(
          omit(
            { ...business.toJSON({ virtuals: true }), rateValue },
            'password'
          ),
          'id'
        );
        let ptr = 0;
        for (let product of businessJson.products!) {
          set(product, 'rateValue', rate[ptr++]);
        }
        return businessJson;
      })
    );
  
    return promises;
  } catch (err: any) {
    throw new Error(err);
  }
}
export async function getTopBusiness(input: FilterQuery<BusinessDocument>) {
  try {
    const businesses = await BusinessModel.find(input).populate([
      'location',
      'workingHours',
      'image',
      'rateCount',
      'productsCount',
      'followersCount',
      'businessTypeName',
      'products',
    ]);
    const comparableArray = await Promise.all(
      businesses.map(
        async (
          x
        ): Promise<
          [
            number,
            Omit<
              BusinessDocument & {
                _id: any;
              },
              never
            >
          ]
        > => [await x.getRateValue(), x]
      )
    );
    comparableArray.sort((a, b) => b[0] - a[0]);
    const businessJson = comparableArray.map((business) => {
      return set(
        omit(business[1].toJSON({ virtuals: true }), 'password'),
        'rateValue',
        business[0]
      );
    });
    return businessJson;
  } catch (err: any) {
    throw new Error(err);
  }
}
export async function createBusiness(
  input: DocumentDefinition<
    Omit<
      BusinessDocument,
      | 'createdAt'
      | 'updatedAt'
      | 'location'
      | 'workingTime'
      | 'comparePasswords'
      | 'businessTypeName'
      | 'getRateValue'
    >
  >,
  req: any
) {
  try {
    const business = new BusinessModel(input);
    await business.save();
    await createImageLocal(
      {
        url: `${req.protocol}://${req.headers.host!}`,
        ownerId: business._id,
      },
      'business'
    );
    return omit(business.toJSON({ virtuals: true }), 'password');
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findBusiness(
  query: FilterQuery<BusinessDocument>,
  options: QueryOptions = {
    populate: [
      'location',
      'workingHours',
      'products',
      'image',
      'followersCount',
      'businessTypeName',
      'productsCount',
      'rateCount',
    ],
  }
) {
  const business = await BusinessModel.findOne(query, {}, options);
  if (!business) {
    return null;
  }
  const rateValue = await business.getRateValue();
  const businessJson = business.toJSON({ virtuals: true });
  if (businessJson.products !== undefined) {
    for (let i = 0; i < businessJson.products.length; i++) {
      let rateValue = await getProductRateById(businessJson, i);
      set(businessJson.products[i], 'rateValue', rateValue);
    }
  }
  return omit({ ...businessJson, rateValue }, 'password');
}

async function getProductRateById(
  businessJson: FlattenMaps<
    Omit<
      _LeanDocument<any>,
      | 'save'
      | 'validate'
      | 'remove'
      | '$getAllSubdocs'
      | '$ignore'
      | '$isDefault'
      | '$isDeleted'
      | '$getPopulatedDocs'
      | '$isEmpty'
      | '$isValid'
      | '$locals'
      | '$markValid'
      | '$model'
      | '$op'
      | '$session'
      | '$set'
      | '$where'
      | 'baseModelName'
      | 'collection'
      | 'db'
      | 'delete'
      | 'deleteOne'
      | 'depopulate'
      | 'directModifiedPaths'
      | 'equals'
      | 'errors'
      | 'get'
      | 'getChanges'
      | 'increment'
      | 'init'
      | 'invalidate'
      | 'isDirectModified'
      | 'isDirectSelected'
      | 'isInit'
      | 'isModified'
      | 'isNew'
      | 'isSelected'
      | 'markModified'
      | 'modifiedPaths'
      | 'modelName'
      | 'overwrite'
      | '$parent'
      | 'populate'
      | 'populated'
      | 'replaceOne'
      | 'schema'
      | 'set'
      | 'toJSON'
      | 'toObject'
      | 'unmarkModified'
      | 'update'
      | 'updateOne'
      | 'validateSync'
      | '$isSingleNested'
    >
  >,
  i: number
) {
  const productId = businessJson.products[i]._id;
  let RatePerValue = new Map<number, number>();
  const rates = await ProductRateModel.find({
    productId,
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
}

export async function findAndUpdateBusiness(
  query: FilterQuery<BusinessDocument>,
  update: UpdateQuery<BusinessDocument>,
  options: QueryOptions
) {
  const business = await BusinessModel.findOneAndUpdate(query, update, options);
  return omit(business, 'password');
}
export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const business = await BusinessModel.findOne({ email });
  if (!business) {
    return null;
  }
  const isValid = await business.comparePasswords(password);
  if (!isValid) {
    return null;
  }
  return omit(business.toJSON(), 'password');
}

export async function deleteBusiness(query: FilterQuery<BusinessDocument>) {
  return BusinessModel.deleteOne(query);
}
