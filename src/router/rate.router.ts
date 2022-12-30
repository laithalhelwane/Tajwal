import {
  createBusinessRateHandler,
  getRateHandler,
} from '../controller/rate.controller';
// import requireUser from '../middleware/requireUser';
// import { createBusinessRateSchema } from '../schema/businessRate.schema';
// import validate from '../middleware/validateResouce';
import { Router } from 'express';
import requireBusiness from '../middleware/requireBusiness';

const router = Router();
/**
 * @openapi
 * '/api/rates':
 *  get:
 *    tags:
 *      - Rate
 *    summary: Get statistics of the current Business
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  default: true
 *                data:
 *                  type: object
 *                  properties:
 *                    rate:
 *                      type: object
 *                      properties:
 *                        followerCount:
 *                          type: number
 *                          format: int32
 *                          default: 1
 *                        followPerYear:
 *                          type: array
 *                          items:
 *                            type: object
 *                            properties:
 *                              year:
 *                                type: number
 *                                fromat: int32
 *                                default: 2022
 *                              ratePerMonth:
 *                                type: array
 *                                items:
 *                                    type: number
 *                                    format: int32
 *                                default:
 *                                  - 0 
 *                                  - 0
 *                                  - 0
 *                                  - 0
 *                                  - 0
 *                                  - 0
 *                                  - 1
 *                                  - 0
 *                                  - 0
 *                                  - 0
 *                                  - 0
 *                                  - 0
 *                        rateCount:
 *                          type: number
 *                          format: int32
 *                          default: 1
 *                        rateValue:
 *                          type: number
 *                          format: int32
 *                          default: 1
 *                        RatePerValueCount:
 *                          type: array
 *                          items:
 *                            type: object
 *                            properties:
 *                              rateValue:
 *                                type: number
 *                                fromat: int32
 *                                default: 2
 *                              count:
 *                                type: number
 *                                format: int32
 *                                default: 1
 *    
 *      409:
 *        description: Conflict
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  default: false
 *                error_code:
 *                  type: number
 *                  default: 409
 *                message:
 *                  type: string
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  default: false
 *                error_code:
 *                  type: number
 *                  default: 400
 *                message:
 *                  type: string
 *
 *      403:
 *        description: Not authorized
 */
router.get('/api/rates', requireBusiness, getRateHandler);
// router.post(
//   '/api/rates',
//   [requireUser, validate(createBusinessRateSchema)],
//   createBusinessRateHandler
// );
export default router;
