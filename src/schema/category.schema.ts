import { object, string, TypeOf } from 'zod';
/**
 * @openapi
 * components:
 *     schemas:
 *         CreateCategoryResponse:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               default: 62c062b1b8c62699cb437303
 *             name:
 *               type: string
 *               default: نباتي
 *             businessTypeId:
 *               type: string
 *               default: 62c062b1b8c62699cb437305
 *             createdAt:
 *               type: string
 *               format: date
 *               default: 2022-07-12T13:38:34.025Z
 *             updatedAt:
 *               type: string
 *               format: date
 *               default: 2022-07-12T13:38:34.025Z  
*/
export const createCategorySchema = object({
  body: object({
    name: string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    }),
    businessTypeId: string({
      required_error: 'businessTypeId is required',
      invalid_type_error: 'businessTypeId must be a string',
    })
  }),
});
export const updateCategorySchema = object({
  params: object({
    _id: string({
      required_error: '_id is required',
      invalid_type_error: 'id must be a string',
    }),
  }),
  body: object({
    name: string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    }),
  }).strict(),
});
export const deleteCategorySchema = object({
  params: object({
    _id: string({
      required_error: '_id is required',
      invalid_type_error: 'id must be a string',
    }),
  }),
});
export const getCategorySchema = object({
  params: object({
    _id: string({
      required_error: 'id is required',
    }),
  }),
});
export type getCategoryInput = TypeOf<typeof getCategorySchema>;
export type createCategoryInput = TypeOf<typeof createCategorySchema>;
export type updateCategoryInput = TypeOf<typeof updateCategorySchema>;
export type deleteCategoryInput = TypeOf<typeof deleteCategorySchema>;
