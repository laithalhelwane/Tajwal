import { object, string, number, TypeOf } from 'zod';

export const createLikeSchema = object({
  body: object({
    // businessId: string({
    //   required_error: 'businessId is required',
    //   invalid_type_error: 'businessId must be a string',
    // }),
    // userId: string({
    //   required_error: 'userId is required',
    //   invalid_type_error: 'userId must be a string',
    // }),
    productId: string({
      required_error: 'productId is required',
      invalid_type_error: 'productId must be a string',
    }),
    likeValue: number({
      required_error: 'likeValue is required',
      invalid_type_error: 'likeValue must be a number',
    }).refine((v) => v === 1 || v === -1, {
      message: 'LikeValue must be 1 or -1',
    }),
  }).strict(),
});
export const deleteLikeSchema = object({
  params: object({
    _id: string({
      required_error: '_id is required',
      invalid_type_error: '_id must be a string',
    }),
  }),
});
export type createLikeInput = TypeOf<typeof createLikeSchema>;
export type deleteLikeSchema = TypeOf<typeof deleteLikeSchema>;
