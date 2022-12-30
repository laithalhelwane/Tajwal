import { Router } from 'express';
import validateResource from '../middleware/validateResouce';
import requireBusiness from '../middleware/requireBusiness';
import { createComplainSchema } from '../schema/complain.schema';
import {
  createComplainHandler,
  getComplainHandler,
} from '../controller/complain.controller';
import requireUser from '../middleware/requireUser';

const router = Router();
/**
 * @openapi
 * '/api/complains':
 *  post:
 *    tags:
 *      - Complain
 *    summary: Send Complain to a business
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateComplainInput'
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
 *                    complain:
 *                      $ref: '#/components/schemas/CreateComplainResponse'
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
 *        403:
 *          description: Not authorized
 *  
 */ 
router.post(
  '/api/complains',
  [requireUser, validateResource(createComplainSchema)],
  createComplainHandler
);
/**
 * @openapi
 * '/api/complains':
 *  get:
 *    tags:
 *      - Complain
 *    summary: Get Complains from database
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
 *                    complains:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/CreateComplainResponse'
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
 *        403:
 *          description: Not authorized
 *  
 */ 
router.get('/api/complains', requireBusiness, getComplainHandler);
export default router;
