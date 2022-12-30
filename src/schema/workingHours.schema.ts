import { object, string, number, TypeOf } from 'zod';
import { daysName } from './bussiness.schema';
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateWorkingHoursInput:
 *      type: array
 *      items:
 *        type: object
 *        required:
 *          - dayName
 *          - openHour
 *          - closeHour
 *        properties:
 *          dayName:
 *            type: string
 *            default: SUN
 *            enum:
 *              - SUN
 *              - MON
 *              - TUE
 *              - WED
 *              - THU
 *              - FRI
 *              - SAT
 *          openHour:
 *            type: number
 *            format: int32
 *            default: 1000
 *          closeHour:
 *            type: number
 *            format: int32
 *            default: 10000
 *    CreateWorkingHoursResponse:
 *      type: array
 *      items:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *            default: 62d798a0e59d99a606a324c8
 *          dayName:
 *            type: string
 *            default: SUN
 *            enum:
 *              - SUN
 *              - MON
 *              - TUE
 *              - WED
 *              - THU
 *              - FRI
 *              - SAT
 *          openHour:
 *            type: number
 *            format: int32
 *            default: 1000
 *          closeHour:
 *            type: number
 *            format: int32
 *            default: 10000
 */
export const createWorkingHoursSchema = object({
  body: object({
    dayName: string({
      required_error: 'dayName is required',
      invalid_type_error: 'dayName must be a string',
    }).refine((v) => daysName.includes(v), {
      message: `dayName must be is one of ${daysName.toString()}`,
      path: ['dayName'],
    }),
    closeHour: number({
      required_error: 'closeHour is required',
      invalid_type_error: 'closeHour must be a number',
    }).refine((value) => value < 86400000, {
      message: 'closeHour must be less than 86400000',
      path: ['closeHour'],
    }),
    openHour: number({
      required_error: 'openHour is required',
      invalid_type_error: 'openHour must be a number',
    }).refine((value) => value <= 86400000, {
      message: 'openHour must be less than or equal to 86400000',
      path: ['openHour'],
    }),
  }).refine((v) => v.closeHour < v.openHour),
});

export const updateWorkingHours = object({
  params: object({
    _id: string({
      required_error: '_id is required',
      invalid_type_error: '_id must be a string',
    }),
  }),
  body: object({
    dayName: string({
      required_error: 'dayName is required',
      invalid_type_error: 'dayName must be a string',
    }).refine((v) => daysName.includes(v), {
      message: `dayName must be is one of ${daysName.toString()}`,
      path: ['dayName'],
    }),
    closeHour: number({
      required_error: 'closeHour is required',
      invalid_type_error: 'closeHour must be a number',
    }).refine((value) => value < 86400000, {
      message: 'closeHour must be less than 86400000',
      path: ['closeHour'],
    }),
    openHour: number({
      required_error: 'openHour is required',
      invalid_type_error: 'openHour must be a number',
    }).refine((value) => value <= 86400000, {
      message: 'openHour must be less than or equal to 86400000',
      path: ['openHour'],
    }),
  }),
});
export type createWorkingHoursInput = TypeOf<typeof createWorkingHoursSchema>;
