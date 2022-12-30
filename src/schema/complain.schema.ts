import { object, string, TypeOf } from 'zod';
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateComplainInput:
 *      type: object
 *      required:
 *        - businessId
 *        - text
 *      properties:
 *        businessId:
 *          type: string
 *          default: 62cd9cb407ce28ca99fab48c
 *        text:
 *          type: string
 *          default: That is a bad product
 *    CreateComplainResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          default: 62cda19af3c2c75a080d925a
 *        userName:
 *          type: string
 *          default: Laith
 *        userImage:
 *          type: string
 *          default: http://localhost:1337/image_owagnjqv46.png
 *        seen:
 *          type: boolean
 *          default: false
 *        userId:
 *          type: string
 *          default: 62c062b9b8c62699cb43732f
 *        businessId:
 *          type: string
 *          default: businessId
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

export const createComplainSchema = object({
  body: object({
    businessId: string({
      required_error: 'productId is required',
      invalid_type_error: 'productId must be a string',
    }),
    text: string({
      required_error: 'text is required',
      invalid_type_error: 'text must be a string',
    }),
  }),
});

export type createComplainInput = TypeOf<typeof createComplainSchema>;
