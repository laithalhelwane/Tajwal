import { Router } from 'express';
import validateResource from '../middleware/validateResouce';
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
  uploadImageSchema
} from '../schema/product.schema';
import { createProductRateSchema } from '../schema/productRate.schema';
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
  getSimilarProduct
} from '../controller/product.controller';

import requireBusiness from '../middleware/requireBusiness';
import upload from '../middleware/multer';
import { createMultipleImageHandler } from '../controller/image.controller';
import requireUser from '../middleware/requireUser';
import { createProductRateHandler } from '../controller/rate.controller';
const router = Router();
/**
 * @openapi
 * '/api/products'  :
 *  post:
 *    tags:
 *      - Product
 *    summary: Add new Product to the Database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateProductInput'
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
 *                    product:
 *                      $ref: '#/components/schemas/CreateProductResponse'
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
router.post(
  '/api/products',
  [requireBusiness, validateResource(createProductSchema)],
  createProductHandler
);
/**
 * @openapi
 * '/api/products/{productId}/rate'  :
 *  post:
 *    tags:
 *      - Product
 *    summary: Rate single product
 *    parameters:
 *      - productId:
 *        name: productId
 *        in: path
 *        description: The Id of the product
 *        required: true
 *        schema:
 *          type: string
 *          default: 62c062bfb8c62699cb437362
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateProductRateInput'
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
 *                      $ref: '#/components/schemas/CreateProductRateResponse'
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
 *      403:
 *        description: Not authorized
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
router.post(
  '/api/products/:_id/rate',
  [requireUser, validateResource(createProductRateSchema)],
  createProductRateHandler
);
/**
 * @openapi
 * '/api/products/{productId}'  :
 *  get:
 *    tags:
 *      - Product
 *    summary: Get single product data by productId
 *    parameters:
 *      - productId:
 *        name: productId
 *        in: path
 *        description: The Id of the product
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
 *                    product:
 *                      $ref: '#/components/schemas/CreateProductResponse'
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
 */
router.get(
  '/api/products/:_id',
  validateResource(getProductSchema),
  getProductHandler
);
/**
 * @openapi
 * '/api/products/{productId}/similar'  :
 *  get:
 *    tags:
 *      - Product
 *    summary: Get similar products 
 *    parameters:
 *      - productId:
 *        name: productId
 *        in: path
 *        description: The Id of the product
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
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      product:
 *                        $ref: '#/components/schemas/CreateProductResponse'
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
 */
 router.get(
  '/api/products/:_id/similar',
  validateResource(getProductSchema),
  getSimilarProduct
);
/**
 * @openapi
 * '/api/products/{productId}'  :
 *  patch:
 *    tags:
 *      - Product
 *    summary: Update product data
 *    parameters:
 *      - productId:
 *        name: productId
 *        in: path
 *        description: The Id of the product
 *        required: true
 *        schema:
 *          type: string
 *          default: 62c062bfb8c62699cb437362
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateProductInput'
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
 *                    product:
 *                      $ref: '#/components/schemas/UpdateProductResponse'
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
router.patch(
  '/api/products/:_id',
  [requireBusiness, validateResource(updateProductSchema)],
  updateProductHandler
);
/**
 * @openapi
 * '/api/products/{productId}'  :
 *  delete:
 *    tags:
 *      - Product
 *    summary: Delete the product from the database
 *    parameters:
 *      - productId:
 *        name: productId
 *        in: path
 *        description: The Id of the product
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
 *                    product:
 *                      type: string
 *                      default: 62c062c9b8c62699cb4373c7
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
router.delete(
  '/api/products/:_id',
  [requireBusiness, validateResource(deleteProductSchema)],
  deleteProductHandler
);
/**
 * @openapi
 * '/api/products/{productId}/image':
 *  post:
 *    tags:
 *      - Product
 *    summary: add products images
 *    parameters:
 *      - productId:
 *        name: productId
 *        in: path
 *        description: The Id of the product
 *        required: true
 *        schema:
 *          type: string
 *          default: 62c062bfb8c62699cb437362
 *      - name: images
 *        in: formData
 *        description: images to upload
 *        required: true
 *        type: array
 *        items:
 *          type: string
 *          format: binary
 *    responses:
 *      201:
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
 *                    images:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/UploadImageResponse'
 * 
 *      409:
 *        description: Confilct
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
router.post(
  '/api/products/:_id/image',
  [validateResource(uploadImageSchema), upload.single('image')],
  createMultipleImageHandler
);
export default router;
