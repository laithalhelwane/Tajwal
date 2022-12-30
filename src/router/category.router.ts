import { Router } from 'express';
import {
  createCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from '../schema/category.schema';
import validateResource from '../middleware/validateResouce';
import {
  createCategoryHandler,
  getCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from '../controller/category.controller';
import requireBusiness from '../middleware/requireBusiness';

const router = Router();
router.post(
  '/api/categories',
  validateResource(createCategorySchema),
  createCategoryHandler
);
/**
 * @openapi
 * '/api/categories/{categoryId}'  :
 *  get:
 *    tags:
 *      - Categories
 *    summary: Get Category by ID Data
 *    parameters:
 *      - categoryId:
 *        name: categoryId
 *        in: path
 *        desciption: The Id of the category
 *        required: true
 *        schema:
 *          type: string
 *          default: 62d50cd220eeaaa389222065
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
 *                    category:
 *                      $ref: '#/components/schemas/CreateCategoryResponse'
 *      404:
 *        description: Not Found
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
router.get(
  '/api/categories/:_id',
  validateResource(getCategorySchema),
  getCategoryHandler
);
router.patch(
  '/api/categories/:_id',
  [requireBusiness, validateResource(updateCategorySchema)],
  updateCategoryHandler
);
router.delete(
  '/api/categories/:_id',
  [requireBusiness, validateResource(deleteCategorySchema)],
  deleteCategoryHandler
);
export default router;
