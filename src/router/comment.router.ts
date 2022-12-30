import { Router } from 'express';
import validateResource from '../middleware/validateResouce';
import requireUser from '../middleware/requireUser';
import {
  createCommentSchema,
  deleteCommentSchema,
  updateCommentSchema,
} from '../schema/comment.schema';
import {
  createCommentHandler,
  deleteCommentHandler,
  updateCommentHandler,
} from '../controller/comment.controller';
const router = Router();
/**
 * @openapi
 * '/api/comments'  :
 *  post:
 *    tags:
 *      - Comment
 *    summary: Add new comment to a product
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateCommentInput'
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
 *                    comment:
 *                      $ref: '#/components/schemas/CreateCommentResponse'
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
  '/api/comments',
  [requireUser, validateResource(createCommentSchema)],
  createCommentHandler
);
/**
 * @openapi
 * '/api/comments/{commentId}'  :
 *  delete:
 *    tags:
 *      - Comment
 *    summary: Delete the comment from the database
 *    parameters:
 *      - commentId:
 *        name: commentId
 *        in: path
 *        description: The id of the comment to be deleted
 *        required: true
 *        schema:
 *          type: string
 *          default: 62c062c9b8c62699cb4373c7
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
 *                    comment:
 *                      type: string
 *                      default: 62c062c9b8c62699cb4373c7
 *                      
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
router.delete(
  '/api/comments/:_id',
  [requireUser, validateResource(deleteCommentSchema)],
  deleteCommentHandler
);
/**
 * @openapi
 * '/api/comments/{commentId}'  :
 *  patch:
 *    tags:
 *      - Comment
 *    parameters:
 *      - commentId:
 *        name: commentId
 *        in: path
 *        description: The id of the comment to be updated
 *        required: true
 *        schema:
 *          type: string
 *          default: 62c062c9b8c62699cb4373c7
 *    summary: Update comment data
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateCommentInput'
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
 *                    comment:
 *                      $ref: '#/components/schemas/CreateCommentResponse'
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
  '/api/comments/:_id',
  [requireUser, validateResource(updateCommentSchema)],
  updateCommentHandler
);
export default router;
