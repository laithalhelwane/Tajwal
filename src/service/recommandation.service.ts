import superagent from 'superagent';
import config from 'config';
import { findBusiness } from './business.service';
import { findProduct } from './product.service';
const recommandationSystemUrl = config.get<string>('recUri');
export async function getBusinessRecommendationsService(userId: string) {
  try {
    const response = await superagent.get(
      `${recommandationSystemUrl}/business/${userId}`
    );
    if (
      response.body.businesses !== undefined &&
      response.body.businesses.length !== 0
    ) {
      const responseArray = [];
      for (let businessRsId of response.body.businesses) {
        const businessData = await findBusiness({ rsid: businessRsId });
        responseArray.push(businessData);
      }
      return responseArray;
    }
    return null;
  } catch (err: any) {
    return null
  }
}
export async function getProductRecommendationsService(userId: string) {
  try {
    const response = await superagent.get(
      `${recommandationSystemUrl}/products/${userId}`
    );
    if (response.body.products !== undefined) {
      const responseArray = [];
      for (let productRsId of response.body.products) {
        const productData = await findProduct({ rsid: productRsId });
        responseArray.push(productData);
      }
      return responseArray;
    }
    return null;
  } catch (err: any) {
    return null
  }
}
