import express from 'express';
import {
  createUserHandler,
  getUserHandler,
  updateUserHandler,
} from '../controller/user.controller';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResouce';
import { createUserSchema, updateUserSchema } from '../schema/user.schema';
import upload from '../middleware/multer';
import { createImageHandler } from '../controller/image.controller';
const router = express.Router();

/**
 * @openapi
 * '/api/users':
 *  post:
 *    tags:
 *      - User
 *    summary: Register a new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateUserInput'
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
 *                    user:
 *                      $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Confilct
 *      400:
 *        description: Bad request
 */
router.post(
  '/api/users',
  validateResource(createUserSchema),
  createUserHandler
);
/**
 * @openapi
 * '/api/users':
 *  get:
 *    tags:
 *      - User
 *    summary: Get the user data
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
 *                    user:
 *                      $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Confilct
 *      403:
 *        description: Not authorized
 *
 */
router.get('/api/users', requireUser, getUserHandler);
/**
 * @openapi
 * '/api/users':
 *  patch:
 *    tags:
 *      - User
 *    summary: Update a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateUserInput'
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
 *                    user:
 *                      $ref: '#/components/schemas/CreateUserResponse'
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
router.patch(
  '/api/users',
  requireUser,
  validateResource(updateUserSchema),
  updateUserHandler
);
/**
 * @openapi
 * '/api/users/image':
 *  post:
 *    tags:
 *      - User
 *    summary: upload user's profile image
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
  '/api/users/image',
  [requireUser, upload.single('image')],
  createImageHandler
);
export default router;
