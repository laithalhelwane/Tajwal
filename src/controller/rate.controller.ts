import { Request, Response, NextFunction } from 'express';
import FollowModel from '../models/follow.model';
import BusinessRateModel from '../models/businessRate.model';
import { createBusinessRateInput } from '../schema/businessRate.schema';
import {
  createBusinessRate,
  createProductRate,
  deleteBusinessRate,
  deleteProductRate,
} from '../service/rate.service';
import { createProductRateInput } from '../schema/productRate.schema';
import { findBusiness } from '../service/business.service';
import { findProduct } from '../service/product.service';

export async function getRateHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let followPerYear = new Map<number, Array<number>>();
    let RatePerValue = new Map<number, number>();
    const followerCount = await FollowModel.countDocuments({
      businessId: res.locals.business._id,
    });
    const followers = await FollowModel.find({
      businessId: res.locals.business._id,
    }).lean();

    for (let follow of followers) {
      if (!followPerYear.has(follow.createdAt.getFullYear())) {
        followPerYear.set(
          follow.createdAt.getFullYear(),
          new Array<number>(12).fill(0)
        );
      }

      const temp = followPerYear.get(follow.createdAt.getFullYear())!;
      temp[follow.createdAt.getMonth()]++;
      followPerYear.set(follow.createdAt.getFullYear(), temp);
    }

    const rateCount = await BusinessRateModel.countDocuments({
      businessId: res.locals.business._id,
    });
    const rates = await BusinessRateModel.find({
      businessId: res.locals.business._id,
    }).lean();

    let rateValue = 0;
    for (let rate of rates) {
      if (!RatePerValue.has(rate.ratingValue)) {
        RatePerValue.set(rate.ratingValue, 0);
      }
      RatePerValue.set(
        rate.ratingValue,
        RatePerValue.get(rate.ratingValue)! + 1
      );
    }
    let top = 0,
      bottom = 0;
    for (let t of RatePerValue) {
      top += t[1] * t[0];
      bottom += t[0];
    }
    if (bottom !== 0) rateValue = top / bottom;

    let followPerYearJson = [];
    for (let e of followPerYear) {
      const obj: { year: number; followPerMonth: number[] } = {
        year: 0,
        followPerMonth: [],
      };
      obj['year'] = e[0];
      obj['followPerMonth'] = e[1];
      followPerYearJson.push(obj);
    }
    let RatePerValueJson = [];
    for (let e of RatePerValue) {
      const obj: { rateValue: number; count: number } = {
        rateValue: 0,
        count: 0,
      };
      obj['rateValue'] = e[0];
      obj['count'] = e[1];
      RatePerValueJson.push(obj);
    }
    return res.send({
      success: true,
      data: {
        followerCount: 5422,
        followPerYear: [
          {
            year: 2022,
            followPerMonth: [
              75, 50, 100, 225, 300, 375, 470, 375, 300, 225, 100, 25,
            ],
          },
          {
            year: 2021,
            followPerMonth: [25, 100, 300, 470, 375, 300, 250, 57, 100, 375],
          },
        ],
        rateCount,
        rateValue,
        RatePerValueCount: RatePerValueJson,
      },
    });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}

export async function createBusinessRateHandler(
  req: Request<
    createBusinessRateInput['params'],
    {},
    createBusinessRateInput['body']
  >,
  res: Response,
  next: NextFunction
) {
  try {
    const Rate = await deleteBusinessRate({
      userId: res.locals.user._id,
      businessId: req.params._id,
    });
    const business = await findBusiness({ _id: req.params._id });
    if (!business) {
      return next({
        statusCode: 404,
        message: `business with id=${req.params._id} was not found in the database`,
      });
    }
    const rate = await createBusinessRate({
      ...req.body,
      userId: res.locals.user._id,
      businessId: req.params._id,
      businessRsId: business.rsid!,
      userRsId: res.locals.user.rsid,
    });
    return res.status(201).send({ success: true, data: { rate } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}

export async function createProductRateHandler(
  req: Request<
    createProductRateInput['params'],
    {},
    createProductRateInput['body']
  >,
  res: Response,
  next: NextFunction
) {
  const product = await findProduct({ _id: req.params._id });
  if (!product) {
    return next({
      statusCode: 404,
      message: `product with id=${req.params._id} not found`,
    });
  }
  try {
    const Rate = await deleteProductRate({
      userId: res.locals.user._id,
      productId: req.params._id,
    });

    const rate = await createProductRate({
      ...req.body,
      userId: res.locals.user._id,
      productId: req.params._id,
      productRsId: product.rsid!,
      userRsId: res.locals.user.rsid,
    });
    return res.status(201).send({ success: true, data: { rate } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
