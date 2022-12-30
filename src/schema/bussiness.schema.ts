import { string, object, TypeOf, number, optional, array } from 'zod';
export const daysName = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateBusinessInput:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *        - passwordConfirmation
 *        - businessTypeId
 *        - phoneNumber
 *        - description
 *        - location
 *        - workingTime
 *      properties:
 *        email:
 *          type: string
 *          default: laith@gmail.com
 *        name:
 *          type: string
 *          default: Latih Helwany
 *        password:
 *          type: string
 *          default: stringpassword123
 *          format: password
 *          minLength: 6
 *        passwordConfirmation:
 *          type: string
 *          default: stringpassword123
 *          format: password
 *          minLength: 6
 *        businessTypeId:
 *          type: string
 *          default: 62c062b1b8c62699cb437303
 *        phoneNumber:
 *          type: string
 *          default: 0934189422
 *        description:
 *          type: string
 *          default: Amazing food, low prices
 *          maxLength: 250
 *          minLength: 10
 *        location:
 *          type: object
 *          required:
 *            - longitude
 *            - latitude
 *          properties:
 *            address:
 *              type: string
 *              default: Al-hamra
 *            longitude:
 *              type: number
 *              format: float
 *              default: 25.25
 *            latitude:
 *              type: number
 *              format: float
 *              default: -96.64
 *        workingTime:
 *          $ref: '#/components/schemas/CreateWorkingHoursInput'
 */

/**
 * @openapi
 * components:
 *     schemas:
 *         CreateBusinessResponse:
 *             type: object
 *             properties:
 *                 _id:
 *                     type: string
 *                     default: 62cd795ad3e55e878b532824
 *                 email:
 *                     type: string
 *                     default: laith@gmail.com
 *                 name:
 *                     type: string
 *                     default: مظفر النواب
 *                 phoneNumber:
 *                     type: string
 *                     default: 0934189422
 *                 description:
 *                     type: string
 *                     default: Awesome Food, low prices
 *                 businessTypeId:
 *                     type: string
 *                     default: 62c062b1b8c62699cb437305
 *                 rsid:
 *                     type: string
 *                     default: business_ded2leYH6Q
 *                 rateValue:
 *                     type: number
 *                     format: float
 *                     default: 2.5
 *                 createdAt:
 *                     type: string
 *                     format: date
 *                     default: 2022-07-12T13:38:34.025Z
 *                 updatedAt:
 *                     type: string
 *                     format: date
 *                     default: 2022-07-12T13:38:34.025Z
 *                 location:
 *                     type: object
 *                     properties:
 *                         _id:
 *                             type: string
 *                             default: 62cd7ad3a1fc858eabdc40bd
 *                         businessId:
 *                             type: string
 *                             default: 62cd7ad3a1fc858eabdc40bb
 *                         longitude:
 *                             type: number
 *                             format: float
 *                             default: 25.25
 *                         latitude:
 *                             type: number
 *                             format: float
 *                             default: -96.64
 *                         address:
 *                             type: string
 *                             default: Al-hamra
 *                         createdAt:
 *                             type: string
 *                             format: date
 *                             default: 2022-07-12T13:38:34.025Z
 *                         updatedAt:
 *                             type: string
 *                             format: date
 *                             default: 2022-07-12T13:38:34.025Z
 *                 workingTime:
 *                     $ref: '#/components/schemas/CreateWorkingHoursResponse'
 *                 products:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/CreateProductResponse'
 *
 *                 image:
 *                     $ref: '#/components/schemas/UploadImageResponse'
 *                 businessTypeName:
 *                     type: object
 *                     properties:
 *                         _id:
 *                             type: string
 *                             default: 62c062b1b8c62699cb437305
 *                         name:
 *                             type: string
 *                             default: البسة
 *                         createdAt:
 *                             type: string
 *                             format: date
 *                             default: 2022-07-12T13:38:34.025Z
 *                         updatedAt:
 *                             type: string
 *                             format: date
 *                             default: 2022-07-12T13:38:34.025Z
 *                 followersCount:
 *                     type: number
 *                     format: int32
 *                     default: 123
 *                 productsCount:
 *                     type: number
 *                     format: int32
 *                     default: 5
 *                 rateCount:
 *                     type: number
 *                     default: 2
 *                     format: int32
 */
export const createBusinessSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    password: string({
      required_error: 'password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
    passwordConfirmation: string({
      required_error: 'passwordConfirmation is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid Email'),
    phoneNumber: string({
      required_error: 'phoneNumber is required',
      invalid_type_error: 'phoneNumber must be a string',
    }).length(10),
    description: string({
      required_error: 'description is required',
      invalid_type_error: 'description must be a string',
    })
      .min(10, 'description must be at least 10 characters long')
      .max(500, 'description must be less than 250 characters long'),
    businessTypeId: string({
      required_error: 'businessType is required',
      invalid_type_error: 'businessTypeId must be a string',
    }),
    location: object(
      {
        longitude: number({
          required_error: 'longitude is required',
          invalid_type_error: 'longitude must be a number',
        }),
        latitude: number({
          required_error: 'latitude is required',
          invalid_type_error: 'latitude must be a number',
        }),
        address: optional(
          string({
            invalid_type_error: 'address must be a string',
          })
        ),
      },
      {
        required_error: 'location is required',
      }
    ).strict(),
    workingTime: array(
      object({
        dayName: string({
          required_error: 'dayName is required',
          invalid_type_error: 'dayName must be a string',
        }).refine((v) => daysName.includes(v), {
          message: `dayName must be is one of ${daysName.toString()}`,
          path: ['dayName'],
        }),
        openHour: number({
          required_error: 'openHour is required',
          invalid_type_error: 'openHour must be a number',
        }),
        closeHour: number({
          required_error: 'closeHour is required',
          invalid_type_error: 'closeHour must be a number',
        }),
      }).strict()
    ),
  })
    .strict()
    .refine((v) => v.password === v.passwordConfirmation),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    UpdateBusinessInput:
 *      type: object
 *      properties:
 *        name:
 *            type: string
 *            default: new Name
 *        phoneNumber:
 *            type: string
 *            default: 0934189422
 *        description:
 *            type: string
 *            default: Awesome Food, low prices
 *            maxLength: 250
 *            minLength: 10
 *        password:
 *            type: string
 *            default: newPassword
 *            minLength: 6
 *        businessTypeId:
 *            type: string
 *            default: 62c062b1b8c62699cb437305
 *        location:
 *          type: object
 *          required:
 *            - longitude
 *            - latitude
 *          properties:
 *            address:
 *              type: string
 *              default: Al-hamra
 *            longitude:
 *              type: number
 *              format: float
 *              default: 25.25
 *            latitude:
 *              type: number
 *              format: float
 *              default: -96.64
 *        workingHours:
 *          type: array
 *          items:
 *               type: object
 *               required:
 *                - dayName
 *                - openHour
 *                - closeHour
 *               properties:
 *                   dayName:
 *                       type: string
 *                       defualt: SUN
 *                   openHour:
 *                       type: number
 *                       format: int32
 *                       default: 3000
 *                   closeHour:
 *                       type: number
 *                       format: int32
 *                       default: 56000
 *
 */
export const updateBusinessSchema = object({
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
    phoneNumber: optional(
      string({
        required_error: 'phoneNumber is required',
        invalid_type_error: 'phoneNumber must be a string',
      })
    ),
    description: optional(
      string({
        required_error: 'description is required',
        invalid_type_error: 'description must be a string',
      })
        .min(10, 'description must be at least 10 characters long')
        .max(250, 'description must be less than 250 characters long')
    ),
    businessTypeId: optional(
      string({
        required_error: 'businessType is required',
        invalid_type_error: 'businessTypeId must be a string',
      })
    ),
    location: optional(
      object({
        longitude: number({
          required_error: 'longitude is required',
          invalid_type_error: 'longitude must be a number',
        }),
        latitude: number({
          required_error: 'latitude is required',
          invalid_type_error: 'latitude must be a number',
        }),
        address: optional(
          string({
            invalid_type_error: 'address must be a string',
          })
        ),
      }).strict()
    ),
    workingTime: optional(
      array(
        object({
          dayName: string({
            required_error: 'dayName is required',
            invalid_type_error: 'dayName must be a string',
          }).refine((v) => daysName.includes(v), {
            message: `dayName must be is one of ${daysName.toString()}`,
            path: ['dayName'],
          }),
          openHour: number({
            required_error: 'openHour is required',
            invalid_type_error: 'openHour must be a number',
          }),
          closeHour: number({
            required_error: 'closeHour is required',
            invalid_type_error: 'closeHour must be a number',
          }),
        }).strict()
      )
    ),
  }),
});

const deleteBusinessSchema = object({
  params: object({
    _id: string({
      required_error: '_id is required',
      invalid_type_error: '_id must be a string',
    }),
  }),
});

export const getBusinessSchema = object({
  params: object({
    _id: string({
      required_error: '_id paramter is required',
    }),
  }),
});
export type createBusinessInput = Omit<
  TypeOf<typeof createBusinessSchema>,
  'body.passwordConfirmation'
>;
export type updateBusinessInput = Omit<
  TypeOf<typeof updateBusinessSchema>,
  'body.passwordConfirmation'
>;
export type deleteBusinessInput = TypeOf<typeof deleteBusinessSchema>;

export type getBusinessInput = TypeOf<typeof getBusinessSchema>;
