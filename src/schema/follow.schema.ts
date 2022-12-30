import { object, string, TypeOf } from 'zod';
/**
 * @openapi
 * components:
 *  schemas:
 *    createFollowInput:
 *       type: object
 *       required:
 *        - businessId
 *       properties:
 *         businessId:
 *           type: string
 *           default: 62cd9cb407ce28ca99fab48c
 *    createFollowResponse:
 *        type: object
 *        properties:
 *         userId:
 *           type: string
 *           default: 62c062b9b8c62699cb43732f
 *         businessId:
 *           type: string
 *           default: businessId
 *        createdAt:
 *          type: string
 *          format: date
 *          default: 2022-07-12T13:38:34.025Z
 *        updatedAt:
 *          type: string
 *          format: date
 *          default: 2022-07-12T13:38:34.025Z  
 */
export const createFollowSchema = object({
  body: object({
    businessId: string({
      required_error: 'businessId is required',
      invalid_type_error: 'businessId must be a string',
    }),
  }),
});
export const deleteFollowSchema = object({
  params: object({
    _id: string({
      required_error: '_id is required',
      invalid_type_error: '_id is must be a string',
    }),
  }).strict(),
});
export type createFollowInput = TypeOf<typeof createFollowSchema>;
export type deleteFollowInput = TypeOf<typeof deleteFollowSchema>;
