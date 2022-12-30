import { object, optional, string, TypeOf } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUserInput:
 *       type: object
 *       required:
 *         - email
 *         - name
 *         - password
 *         - passwordConfirmation
 *       properties:
 *         email:
 *           type: string
 *           default: jane@example.com
 *         name:
 *           type: string
 *           default: Dane Doe
 *         password:
 *           type: string
 *           default: stringpassword123
 *         passwordConfirmation:
 *           type: string
 *           default: stringpassword123
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         email:
 *           type: string
 *           default: jane@example.com
 *         name:
 *           type: string
 *           default: Dane Doe
 *         rsid:
 *           type: string
 *           default: user_12ksj4sjg42
 *         image:
 *           $ref: '#/components/schemas/UploadImageResponse'
 *         ratedProducts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateProductResponse'
 *         followedBusiness:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateBusinessResponse'
 *         createdAt:
 *           type: string
 *           format: date
 *           default: 2022-07-12T13:38:34.025Z
 *         updatedAt:
 *           type: string
 *           format: date
 *           default: 2022-07-12T13:38:34.025Z
 */
export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'الأسم مطلوب',
    }),
    password: string({
      required_error: 'كلمة السر مطلوبة',
    }).min(6, 'كلمة السر قصيرة يجب أن تكون 6 حروف على الأقل'),
    passwordConfirmation: string({
      required_error: 'passwordConfirmation is required',
    }),
    email: string({
      required_error: 'البريد الالكتروني مطلوب',
    }).email('البريد الالكتروني غير صالح'),
  }).refine((data) => data.passwordConfirmation === data.password, {
    message: 'كلمات السر غير متطابقة',
    path: ['passwordConfirmation'],
  }),
});
/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateUserInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           default: Dane Doe
 *         password:
 *           type: string
 *           default: stringpassword123
 *         passwordConfirmation:
 *           type: string
 *           default: stringpassword123
 *     UpdateUserResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         email:
 *           type: string
 *           default: jane@example.com
 *         name:
 *           type: string
 *           default: Dane Doe
 *         rsid:
 *           type: string
 *           default: user_12ksj4sjg42
 *         image:
 *           $ref: '#/components/schemas/UploadImageResponse'
 *         ratedProducts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateProductResponse'
 *         followedBusiness:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateBusinessResponse'
 *         createdAt:
 *           type: string
 *           format: date
 *           default: 2022-07-12T13:38:34.025Z
 *         updatedAt:
 *           type: string
 *           format: date
 *           default: 2022-07-12T13:38:34.025Z
 *
 */
export const updateUserSchema = object({
  body: object({
    name: optional(
      string({
        required_error: 'Name is required',
      })
    ),
    password: optional(
      string({
        required_error: 'password is required',
      }).min(6, 'Password too short - should be 6 chars minimum')
    ),
    passwordConfirmation: optional(
      string({
        required_error: 'passwordConfirmation is required',
      })
    ),
  })
    .strict()
    .refine(
      (data) =>
        data.password !== null
          ? data.password === data.passwordConfirmation
          : data.passwordConfirmation === null,
      {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
      }
    ),
});
/**
 * @openapi
 * components:
 *  schemas:
 *    UploadImageResponse:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *           default: http://localhost:1337/image_clsm3xbb4a.png
 *         ownerId:
 *           type: string
 *           default: 62c062b9b8c62699cb43732f
 *         _id:
 *           type: string
 *           default: 62cef6a687a2fbcd71084c02
 */
export type createUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  'body.passwordConfirmation'
>;
export type updateUserInput = Omit<
  TypeOf<typeof updateUserSchema>,
  'body.passwordConfirmation'
>;
