/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import { Router } from 'express';
import validateResouce from '../middleware/validateResouce';
import {
  createBusinessSchema,
  getBusinessSchema,
  updateBusinessSchema,
} from '../schema/bussiness.schema';
import {
  createBusinessHandler,
  deleteBusinessHandler,
  getBusinessHandler,
  updateBusinessHandler,
  getAllbusinessesHandler,
  getCurrentBusinessHandler,
} from '../controller/business.controller';
import { createImageHandler } from '../controller/image.controller';
import requireBusiness from '../middleware/requireBusiness';
import upload from '../middleware/multer';
import { createBusinessRateSchema } from '../schema/businessRate.schema';
import { createBusinessRateHandler } from '../controller/rate.controller';
import requireUser from '../middleware/requireUser';

/* -------------------------------------------------------------------------- */
/*                                Routers SetUp                               */
/* -------------------------------------------------------------------------- */

const router = Router();

/**
 * @openapi
 * '/api/business/me'  :
 *  get:
 *    tags:
 *      - Business
 *    summary: Get current business data
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
 *                    buisness:
 *                      $ref: '#/components/schemas/CreateBusinessResponse'
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
router.get('/api/business/me', requireBusiness, getCurrentBusinessHandler);
/**
 * @openapi
 * '/api/business/{businessId}'  :
 *  get:
 *    tags:
 *      - Business
 *    summary: Get single business data by the business id
 *    parameters:
 *      - businessId:
 *        name: businessId
 *        in: path
 *        description: The Id of the business
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
 *                    buisness:
 *                      $ref: '#/components/schemas/CreateBusinessResponse'
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
  '/api/business/:_id',
  validateResouce(getBusinessSchema),
  getBusinessHandler
);
/**
 * @openapi
 * '/api/business'  :
 *  get:
 *    tags:
 *      - Business
 *    summary: Get all businesses data in the database
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
 *                    buisnesses:
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
 */
router.get('/api/business', getAllbusinessesHandler);
/**
 * @openapi
 * '/api/business/{businessId}/rate'  :
 *  post:
 *    tags:
 *      - Business
 *    summary: Rate single business
 *    parameters:
 *      - businessId:
 *        name: businessId
 *        in: path
 *        description: The Id of the business
 *        required: true
 *        schema:
 *          type: string
 *          default: 62c062bfb8c62699cb437362
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateBusinessRateInput'
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
 *                      $ref: '#/components/schemas/CreateBusinessRateResponse'
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
  '/api/business/:_id/rate',
  [requireUser, validateResouce(createBusinessRateSchema)],
  createBusinessRateHandler
);
/**
 * @openapi
 * '/api/business'  :
 *  post:
 *    tags:
 *      - Business
 *    summary: Add new business to the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateBusinessInput'
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
 *                    buisness:
 *                      $ref: '#/components/schemas/CreateBusinessResponse'
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
  '/api/business',
  validateResouce(createBusinessSchema),
  createBusinessHandler
);
/**
 * @openapi
 * '/api/business'  :
 *  delete:
 *    tags:
 *      - Business
 *    summary: Delete the business from the database
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
 *                    buisness:
 *                      type: string
 *                      default: 62c062bfb8c62699cb437362
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
router.delete('/api/business', requireBusiness, deleteBusinessHandler);
/**
 * @openapi
 * '/api/business'  :
 *  patch:
 *    tags:
 *      - Business
 *    summary: Update business data
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateBusinessInput'
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
 *                    buisness:
 *                      $ref: '#/components/schemas/CreateBusinessResponse'
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
  '/api/business',
  [requireBusiness, validateResouce(updateBusinessSchema)],
  updateBusinessHandler
);
/**
 * @openapi
 * '/api/business/image':
 *  post:
 *    tags:
 *      - Business
 *    summary: add Business image
 *    parameters:
 *      - name: image
 *        in: formData
 *        description: image to upload
 *        required: true
 *        type: string
 *        format: binary
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
 *                    image:
 *                      $ref: '#/components/schemas/UploadImageResponse'
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
  '/api/business/image',
  [requireBusiness, upload.single('image')],
  createImageHandler
);

export default router;
