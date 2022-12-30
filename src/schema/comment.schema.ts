import { string, object, TypeOf } from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateCommentInput:
 *      type: object
 *      required:
 *        - productId
 *        - text
 *      properties:
 *        productId:
 *          type: string
 *          default: 62cd9cb407ce28ca99fab48c
 *        text:
 *          type: string
 *          default: That is a bad product
 *    CreateCommentResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          default: 62c062c8b8c62699cb4373c1
 *        userId:
 *          type: string
 *          default: 62cd4b97e9b2878488e4d754
 *        userName:
 *          type: string
 *          default: Laith
 *        userImage:
 *          type: string
 *          default: http://localhost:1337/user.png
 *        productId:
 *          type: string
 *          default: 62c062c6b8c62699cb4373b9
 *        text:
 *          type: string
 *          default: That is a bad product
 *        createdAt:
 *          type: string
 *          format: date
 *          default: 2022-07-12T13:38:34.025Z
 *        updatedAt:
 *          type: string
 *          format: date
 *          default: 2022-07-12T13:38:34.025Z
 */

export const createCommentSchema = object({
  body: object({
    productId: string({
      required_error: 'productId is required',
      invalid_type_error: 'productId must be a string',
    }),
    text: string({
      required_error: 'text is required',
      invalid_type_error: 'text must be a string',
    }),
  }),
});
export const deleteCommentSchema = object({
  params: object({
    _id: string({
      required_error: '_id is required',
    }),
  }).strict(),
});
/**
 * @openapi
 * components:
 *  schemas:
 *    UpdateCommentInput:
 *      type: object
 *      properties:
 *        text:
 *          type: string
 *          default: That is a new comment
 *    UpdateCommentResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          default: 62c062c8b8c62699cb4373c1
 *        userId:
 *          type: string
 *          default: 62cd4b97e9b2878488e4d754
 *        userName:
 *          type: string
 *          default: Laith
 *        userImage:
 *          type: string
 *          default: http://localhost:1337/user.png
 *        productId:
 *          type: string
 *          default: 62c062c6b8c62699cb4373b9
 *        text:
 *          type: string
 *          default: That is a bad product
 *        createdAt:
 *          type: string
 *          format: date
 *          default: 2022-07-12T13:38:34.025Z
 *        updatedAt:
 *          type: string
 *          format: date
 *          default: 2022-07-12T13:38:34.025Z
 */
export const updateCommentSchema = object({
  params: object({
    _id: string(),
  }).strict(),
  body: object({
    text: string({
      required_error: 'text is required',
      invalid_type_error: 'text must be a string',
    }),
  }).strict(),
});
export type createCommentInput = TypeOf<typeof createCommentSchema>;
export type deleteCommentInput = TypeOf<typeof deleteCommentSchema>;
export type updateCommentInput = TypeOf<typeof updateCommentSchema>;
