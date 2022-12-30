import { Router } from 'express';
import requireUser from '../middleware/requireUser';
import {
  getRecommendationsHandler,
  getProductRecommendationsHandler,
} from '../controller/recommandation.controller';
const router = Router();
/**
 * @openapi
 * '/api/rec/business':
 *  get:
 *    tags:
 *      - Business
 *    summary: Get business recommandation based on user's previous rates
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
 *                  defualt: true
 *                data:
 *                  type: object
 *                  properties:
 *                    businesses:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/CreateBusinessResponse'
 *      409:
 *        description: Confilct
 *      403:
 *        description: Not authorized
 *
 */

router.get('/api/rec/business', requireUser, getRecommendationsHandler);
/**
 * @openapi
 * '/api/rec/products':
 *  get:
 *    tags:
 *      - Product
 *    summary: Get products recommandation based on user's previous rates
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
 *                  defualt: true
 *                data:
 *                  type: object
 *                  properties:
 *                    products:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/CreateProductResponse'
 *      409:
 *        description: Confilct
 *      403:
 *        description: Not authorized
 *
 */

router.get('/api/rec/products', requireUser, getProductRecommendationsHandler);
export default router;
