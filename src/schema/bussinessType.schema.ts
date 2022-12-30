import { string, object, TypeOf, optional } from 'zod';
/**
 * @openapi
 * components:
 *     schemas:
 *         CreateBusinessTypeResponse:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               default: 62c062b1b8c62699cb437303
 *             name:
 *               type: string
 *               default: مطاعم
 *             createdAt:
 *               type: string
 *               format: date
 *               default: 2022-07-12T13:38:34.025Z
 *             updatedAt:
 *               type: string
 *               format: date
 *               default: 2022-07-12T13:38:34.025Z  
*/

export const createBusinessTypeSchema = object({
  body: object({
    name: string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    }),
  }),
});
export const getTopByBusinessTypeIdSchema = object({
  params:object({
    _id: string({
      required_error: '_id is required',
      invalid_type_error: '_id must be a string',
    })
  })
})
export const updateBusinessTypeSchema = object({
  params: object({
    _id: string({
      required_error: '_id is required',
      invalid_type_error: '_id must be a string',
    }),
  }),
  body: object({
    name: optional(
      string({
        invalid_type_error: 'name must be a string',
      })
    ),
  }),
});
export const deleteBusinessTypeSchema = object({
  params: object({
    _id: string({
      required_error: '_id is required',
      invalid_type_error: '_id must be a string',
    }),
  }),
});
export const getBusinessTypebyIdSchema = object({
  params: object({
    _id: string({
      required_error: 'id is required',
    }),
  }),
});
export type createBusinessTypeInput = TypeOf<typeof createBusinessTypeSchema>;
export type updateBusinessTypeInput = TypeOf<typeof updateBusinessTypeSchema>;
export type deleteBusinessTypeINput = TypeOf<typeof deleteBusinessTypeSchema>;
export type getBusinessTypebyIdInput = TypeOf<typeof getBusinessTypebyIdSchema>;
export type getTopByBusinessTypeIdInput = TypeOf<typeof getTopByBusinessTypeIdSchema>;
