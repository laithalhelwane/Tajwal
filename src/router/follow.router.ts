import { Router } from "express";
import requireUser from "../middleware/requireUser";
import validate from "../middleware/validateResouce";
import { createFollowSchema, deleteFollowSchema } from "../schema/follow.schema";
import {createFollowHandler, deleteFollowHandler, getUserFollowedBusiness} from '../controller/follow.controller';
const router = Router();

/**
 * @openapi
 * '/api/follow'  :
 *  get:
 *    tags:
 *      - Follow
 *    summary: Get followed businesses by current user
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
 *                    follows:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/createFollowResponse'
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

router.get('/api/follow',requireUser, getUserFollowedBusiness)
/**
 * @openapi
 * '/api/follow'  :
 *  post:
 *    tags:
 *      - Follow
 *    summary: Follow a new business
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/createFollowInput'
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
 *                    follow:
 *                      $ref: '#/components/schemas/createFollowResponse'
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
router.post('/api/follow', [requireUser, validate(createFollowSchema)], createFollowHandler)
/**
 * @openapi
 * '/api/follow/{bsuinessId}'  :
 *  delete:
 *    tags:
 *      - Follow
 *    summary: Unfollow business
 *    parameters:
 *      - bsuinessId:
 *        name: bsuinessId
 *        in: path
 *        description: The id of the business 
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
 *                    follow:
 *                      type: string
 *                      default: 62c062c9b8c62699cb4373c7
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
router.delete('/api/follow/:_id', [requireUser, validate(deleteFollowSchema)], deleteFollowHandler);
export default router;