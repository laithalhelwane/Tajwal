import { object, string, number, TypeOf } from 'zod';
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateProductRateInput:
 *      type: object
 *      required:
 *        - ratingValue
 *      properties:
 *        ratingValue:
 *          type: number
 *          format: int32
 *          default: 2
 *    CreateProductRateResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          default: 62cd9b9afa3651d42faed3bb
 *        userId:
 *          type: string
 *          default: 62cd4b97e9b2878488e4d754
 *        productId:
 *          type: string
 *          default: 62c062bdb8c62699cb437340
 *        ratingValue:
 *          type: number
 *          default: 2
 *        createdAt:
 *          type: string
 *          format: date
 *          default: 2022-07-12T13:38:34.025Z
 *        updatedAt:
 *          type: string
 *          format: date
 *          default: 2022-07-12T13:38:34.025Z  
 *          
 */

export const createProductRateSchema = object({
  body: object({
    ratingValue: number({
      required_error: 'ratingValue is required',
      invalid_type_error: 'ratingValue must be a number',
    })
      .min(1)
      .max(5),
  }).strict(),
  params: object({
    _id: string({
      required_error: '_id is required',
      invalid_type_error: '_id must be a string',
    }),
  }),
});

// export const updateRateSchema = object({
//   params: object({
//     _id: string({
//       required_error: '_id is required',
//       invalid_type_error: '_id must be a string',
//     }),
//   }),
//   body: object({
//     ratingValue: number({
//       required_error: 'ratingValue is required',
//       invalid_type_error: 'ratingValue must be a number',
//     })
//       .min(0)
//       .max(5),
//   }),
// });

export const deleteRateSchema = object({
  parmas: object({
    _id: string({
      required_error: '_id is required',
      invalid_type_error: '_id must be a string',
    }),
  }),
});
export type createProductRateInput = TypeOf<typeof createProductRateSchema>;
