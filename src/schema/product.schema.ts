import { string, object, TypeOf, array, optional, number } from 'zod';
export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3X', '4X'];
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateProductInput:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           default: bacon
 *         description:
 *           type: string
 *           default: منتج اخو بسة
 *         price:
 *           type: number
 *           format: float
 *           default: 1000
 *         categoryId:
 *           type: string
 *           default: 62c062b1b8c62699cb437307
 *         typeId:
 *           type: string
 *           default: 62d68afc8e5efb6f8a6e7a0d
 *         sizes:
 *            type: array
 *            items:
 *              type: string
 *            default:
 *              - L
 *              - S
 *     CreateProductResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           default: 62c062c2b8c62699cb4373a9
 *         businessId:
 *           type: string
 *           default: 62c062bfb8c62699cb437362
 *         description:
 *           type: string
 *           default: منتج اخو بسة
 *         businessName:
 *           type: string
 *           default: Amazing Snack
 *         name:
 *           type: string
 *           default: bacon
 *         price:
 *           type: number
 *           format: float
 *           default: 1000
 *           minimum: 0
 *           maximum: 1000000
 *         rateValue:
 *           type: number
 *           format: float
 *           default: 1.7
 *         sizes:
 *            type: array
 *            items:
 *              type: string
 *            default:
 *              - L
 *              - S
 *         images:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UploadImageResponse'
 *         categories:
 *           type: array
 *           items:
 *            type: object
 *            properties:
 *               categoryName:
 *                 type: string
 *                 default: رجالي
 *               categoryId:
 *                 type: string
 *                 default: 62d68afc8e5efb6f8a6e7a0b
 *         types:
 *           type: array
 *           items:
 *            type: object
 *            properties:
 *               typeName:
 *                 type: string
 *                 default: قطن
 *               typeId:
 *                 type: string
 *                 default: 62d68afc8e5efb6f8a6e7a0b
 *         createdAt:
 *           type: string
 *           format: date
 *           default: 2022-07-12T13:38:34.025Z
 *         updatedAt:
 *           type: string
 *           format: date
 *           default: 2022-07-12T13:38:34.025Z
 */
export const createProductSchema = object({
  body: object({
    name: string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    }),
    description: string({
      required_error: 'description is required',
      invalid_type_error: 'description must be a string',
    }),
    typeId: optional(string()),
    categoryId: optional(string()),
    price: number({
      required_error: 'price is required',
      invalid_type_error: 'price must be a number',
    })
      .min(0)
      .max(1000000),
    sizes: optional(array(string().refine((arg) => sizes.includes(arg)))),
  }),
});
/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateProductInput:
 *      type: object
 *      properties:
 *         name:
 *           type: string
 *           default: bacon
 *         price:
 *           type: number
 *           format: float
 *           default: 1000
 *         description:
 *           type: string
 *           default: منتج اخو بسة
 *         categoriesId:
 *           type: array
 *           items:
 *             type: string
 *           default:
 *              - 62c062b1b8c62699cb437307
 *              - 62d68afc8e5efb6f8a6e79fd
 *         typesId:
 *           type: array
 *           items:
 *             type: string
 *           default:
 *             - 62d68afc8e5efb6f8a6e7a0d
 *             - 62d68afd8e5efb6f8a6e7a13
 *     UpdateProductResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           default: 62c062c2b8c62699cb4373a9
 *         businessId:
 *           type: string
 *           default: 62c062bfb8c62699cb437362
 *         businessName:
 *           type: string
 *           default: Amazing Snack
 *         description:
 *           type: string
 *           default: منتج اخو بسة
 *         name:
 *           type: string
 *           default: bacon
 *         price:
 *           type: number
 *           format: float
 *           default: 1000
 *         rateValue:
 *           type: number
 *           format: float
 *           default: 1.7
 *         images:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/UploadImageResponse'
 *         categories:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *                categoryName:
 *                  type: string
 *                  default: رجالي
 *                categoryId:
 *                  type: string
 *                  default: 62d68afc8e5efb6f8a6e7a0b
 *         types:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *                typeName:
 *                  type: string
 *                  default: قطن
 *                typeId:
 *                  type: string
 *                  default: 62d68afc8e5efb6f8a6e7a0b
 *         createdAt:
 *           type: string
 *           format: date
 *           default: 2022-07-12T13:38:34.025Z
 *         updatedAt:
 *           type: string
 *           format: date
 *           default: 2022-07-12T13:38:34.025Z
 */
export const updateProductSchema = object({
  params: object({
    _id: string({
      required_error: '_id is required',
      invalid_type_error: '_id must be a string',
    }),
  }),
  body: object({
    typeId: optional(string()),
    categoryId: optional(string()),
    description: string({
      required_error: 'description is required',
      invalid_type_error: 'description must be a string',
    }),
    name: optional(
      string({
        required_error: 'name is required',
        invalid_type_error: 'name must be a string',
      })
    ),
    price: optional(
      number({
        required_error: 'price is required',
        invalid_type_error: 'price must be a number',
      })
    ),
  }).strict(),
});

export const deleteProductSchema = object({
  params: object({
    _id: string({
      required_error: '_id is required',
      invalid_type_error: '_id must be a string',
    }),
  }),
});
export const getProductSchema = object({
  params: object({
    _id: string({
      required_error: 'id is required',
    }),
  }),
});
export const uploadImageSchema = object({
  params: object({
    _id: string({
      required_error: 'id is required',
    }),
  }),
});
export type createProductInput = TypeOf<typeof createProductSchema>;
export type updateProductInput = TypeOf<typeof updateProductSchema>;
export type deleteProductInput = TypeOf<typeof deleteProductSchema>;
export type getProductInput = TypeOf<typeof getProductSchema>;
export type uploadImageInput = TypeOf<typeof uploadImageSchema>;