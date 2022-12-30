import { Router } from 'express';
import validateResource from '../middleware/validateResouce';
import {
  createBusinessTypeSchema,
  deleteBusinessTypeSchema,
  updateBusinessTypeSchema,
  getBusinessTypebyIdSchema,
  getTopByBusinessTypeIdSchema,
} from '../schema/bussinessType.schema';
import {
  createBusinessTypeHandler,
  getBusinessTypesHandler,
  updateBusinessTypeHandler,
  deleteBusinessTypeHandler,
  getBusinessTypebyIdHandler,
  getTopByBusinessTypeIdHandler,
  getTypesByBusinessTypeIdHandler,
  getCategoriesByBusinessTypeIdHandler
} from '../controller/businessType.controller';
import requireLogin from '../middleware/requireLogin';
const router = Router();
router.post(
  '/api/businessType',
  validateResource(createBusinessTypeSchema),
  createBusinessTypeHandler
);
/**
 * @openapi
 * '/api/businessType'  :
 *  get:
 *    tags:
 *      - BusinessType
 *    summary: Get all businesses Types data in the database
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
 *                    businessTypes:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/CreateBusinessTypeResponse'
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
 */
router.get('/api/businessType', getBusinessTypesHandler);
router.get(
  '/api/businessType/:_id',
  validateResource(getBusinessTypebyIdSchema),
  getBusinessTypebyIdHandler
);
/**
 * @openapi
 * '/api/businessType/{businessTypeId}/top' :
 *  get:
 *    tags:
 *      - BusinessType
 *    summary: Get top businesses by businessTypeId
 *    parameters:
 *      - businessTypeId:
 *        name: businessTypeId
 *        in: path
 *        description: The Id of the businessType
 *        required: true
 *        schema:
 *          type: string
 *          default: 62c062bfb8c62699cb437362
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
 *                    businesses:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/CreateBusinessResponse'
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
 *      403:
 *        description: Not authorized
 *      404:
 *        description: Not found
 */
router.get(
  '/api/businessType/:_id/top',
  validateResource(getTopByBusinessTypeIdSchema),
  getTopByBusinessTypeIdHandler
);
/**
 * @openapi
 * '/api/businessType/{businessTypeId}/types' :
 *  get:
 *    tags:
 *      - BusinessType
 *    summary: Get types by businessTypeId
 *    parameters:
 *      - businessTypeId:
 *        name: businessTypeId
 *        in: path
 *        description: The Id of the businessType
 *        required: true
 *        schema:
 *          type: string
 *          default: 62c062bfb8c62699cb437362
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
 *                    types:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/CreateTypeResponse'
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
 *      403:
 *        description: Not authorized
 *      404:
 *        description: Not found
 */
router.get(
  '/api/businessType/:_id/types',
  validateResource(getTopByBusinessTypeIdSchema),
  getTypesByBusinessTypeIdHandler
);
/**
 * @openapi
 * '/api/businessType/{businessTypeId}/categories' :
 *  get:
 *    tags:
 *      - BusinessType
 *    summary: Get categories by businessTypeId
 *    parameters:
 *      - businessTypeId:
 *        name: businessTypeId
 *        in: path
 *        description: The Id of the businessType
 *        required: true
 *        schema:
 *          type: string
 *          default: 62c062bfb8c62699cb437362
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
 *                    types:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/CreateCategoryResponse'
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
 *      403:
 *        description: Not authorized
 *      404:
 *        description: Not found
 */
router.get(
  '/api/businessType/:_id/categories',
  validateResource(getTopByBusinessTypeIdSchema),
  getCategoriesByBusinessTypeIdHandler
);
router.patch(
  '/api/businessType/:_id',
  [requireLogin, validateResource(updateBusinessTypeSchema)],
  updateBusinessTypeHandler
);
router.delete(
  '/api/businessType',
  [requireLogin, validateResource(deleteBusinessTypeSchema)],
  deleteBusinessTypeHandler
);
export default router;
