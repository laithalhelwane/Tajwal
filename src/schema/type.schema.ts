import { object, string, TypeOf, optional } from 'zod';
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateTypeResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          default: 62c062c8b8c62699cb4373c1
 *        name:
 *          type: string
 *          default: شيش
 *        businessTypeId:
 *          type: string
 *          default: 62c062b1b8c62699cb437303
 *        createdAt:
 *          type: string
 *          format: date
 *          default: 2022-07-12T13:38:34.025Z
 *        updatedAt:
 *          type: string
 *          format: date
 *          default: 2022-07-12T13:38:34.025Z      
 */

export const createTypeSchema = object({
  body: object({
    name: string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    }),
    businessTypeId: string({
      required_error: 'businessTypeId is required',
      invalid_type_error: 'businessTypeId must be a string',
    }),
    
  }),
});
export const updateTypeSchema = object({
  params: object({
    _id: string({
      required_error: '_id is required',
      invalid_type_error: '_id must be a string',
    }),
  }),
  body: object({
    name: optional(
      string({
        required_error: 'name is required',
        invalid_type_error: 'name must be a string',
      })
    ),
  }),
});
export const deleteTypeSchema = object({
  params: object({
    _id: string({
      required_error: '_id is required',
      invalid_type_error: '_id must be a string',
    }),
  }),
});
export type deleteTypeInput = TypeOf<typeof deleteTypeSchema>;
export type createTypeInput = TypeOf<typeof createTypeSchema>;
export type updateTypeInput = TypeOf<typeof updateTypeSchema>;
