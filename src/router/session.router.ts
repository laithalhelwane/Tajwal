import express from 'express';
import {
  createUserSessionHandler,
  getUserSessionHandler,
  deleteUserSessionHandler,
} from '../controller/session.controller';
import { createSessionSchema } from '../schema/session.schema';
import validateResource from '../middleware/validateResouce';
import requireLogin from '../middleware/requireLogin';

const router = express.Router();
/**
 * @openapi
 * '/api/sessions'  :
 *  post:
 *    tags:
 *      - Session
 *    summary: Create new session
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateSessionInput'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateSessionResponse'
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
 */
router.post(
  '/api/sessions',
  validateResource(createSessionSchema),
  createUserSessionHandler
);
/**
 * @openapi
 * '/api/sessions'  :
 *  get:
 *    tags:
 *      - Session
 *    summary: Get All open sessions

 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                    default: 62c062bdb8c62699cb43735d
 *                  user:
 *                    type: string
 *                    default: 62c062bdb8c62699cb437340
 *                  userType:
 *                    type: string
 *                    default: business
 *                  valid:
 *                    type: boolean
 *                    default: true
 *                  userAgent:
 *                    type: string
 *                    default: Postman
 *                  createdAt:
 *                    type: string
 *                    format: date
 *                    default: 2022-07-12T13:38:34.025Z
 *                  updatedAt:
 *                    type: string
 *                    format: date
 *                    default: 2022-07-12T13:38:34.025Z  
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
 */
router.get('/api/sessions', requireLogin, getUserSessionHandler);
/**
 * @openapi
 * '/api/sessions/{sessionId}'  :
 *  delete:
 *    tags:
 *      - Session
 *    summary: End session by Id
 *    parameters:
 *      - sessionId:
 *        name: sessionId
 *        in: path
 *        description: The id of the session to be closed
 *        required: true
 *        schema:
 *          type: string
 *          default: 62c062c9b8c62699cb4373c7
 *    responses:
 *      200:
 *        description: Success
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
router.delete('/api/sessions', requireLogin, deleteUserSessionHandler);

export default router;
