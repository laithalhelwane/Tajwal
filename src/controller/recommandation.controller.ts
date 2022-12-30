import { Request, Response, NextFunction } from 'express';
import { getTopBusiness } from '../service/business.service';
import { findProducts } from '../service/product.service';
import {
  getBusinessRecommendationsService,
  getProductRecommendationsService,
} from '../service/recommandation.service';
export async function getRecommendationsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const businesses = await getBusinessRecommendationsService(
      res.locals.user.rsid
    );
    if (!businesses) {
      const businesses = await getTopBusiness({});
      return res.send({ success: true, data: { businesses } });
    }
    return res.send({ success: true, data: { businesses } });
  } catch (err: any) {
    return next({ status_code: 409, message: err.message });
  }
}
export async function getProductRecommendationsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const products = await getProductRecommendationsService(
      res.locals.user.rsid
    );
    if (!products) {
      // return next({ status_code: 500, message: 'Recommandation System error' });
      const products = await findProducts({});
      return res.send({
        success: true,
        data: { products: products.slice(0, 3) },
      });
    }
    return res.send({ success: true, data: { products } });
  } catch (err: any) {
    return next({ status_code: 409, message: err.message });
  }
}
