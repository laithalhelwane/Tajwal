import { object, string , TypeOf} from 'zod';
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateSessionInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: jane@example.com
 *        password:
 *          type: string
 *          default: stringpassword123
 *    CreateSessionResponse:
 *      type: object
 *      properties:
 *        accessToken:
 *          type: string
 *          default: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmMwNjJiZGI4YzYyNjk5Y2I0MzczNDAiLCJlbWFpbCI6Im16cmpwOThAaG90bWFpbC5jb20iLCJuYW1lIjoiV2llZ2FuZCwgTGluZCBhbmQgR2lic29uIiwicGhvbmVOdW1iZXIiOiIwOTkxOTQwOTM3IiwiZGVzY3JpcHRpb24iOiJFdW0gaW52ZW50b3JlIGVvcyBkb2xvcmlidXMgb2NjYWVjYXRpIHZvbHVwdGF0ZW0gYXV0IGZ1Z2EgcXVvZCBzaXQuIEEgbWF4aW1lIHVsbGFtIGV4IGRlc2VydW50IGN1cGlkaXRhdGUgcXVpc3F1YW0gbmFtIGRpc3RpbmN0aW8uIEVycm9yIHZlbGl0IGNvbnNlcXVhdHVyIGhpYyBuZXNjaXVudCBzZWQgZXQgaGljLiIsImJ1c2luZXNzVHlwZUlkIjoiNjJjMDYyYjFiOGM2MjY5OWNiNDM3MzA1IiwiY3JlYXRlZEF0IjoiMjAyMi0wNy0wMlQxNToyMjozNy4wNjlaIiwidXBkYXRlZEF0IjoiMjAyMi0wNy0wMlQxNToyMjozNy4wNjlaIiwiX192IjowLCJzZXNzaW9uIjoiNjJkNTc2YjkwN2VhODA5NGZjY2Y2Yjg4IiwidXNlclR5cGUiOiJidXNpbmVzcyIsImlhdCI6MTY1ODE1NjcyOSwiZXhwIjoxNjg5NzE0MzI5fQ.Tkq_iTxTg97MeIkuZI1L-UQX2SJJfsfk5YIZFOG7lconD8hZtghPgicdmVlQPqYWErj3D1zFbCfse8pvKMVxw7EThvXDxexchJqlcVIP4DbPbUbhGggiFwlBsvVdrallDcf5hHb6lvB4q2wd1c88MbvHokvQCJhAl1u924sIt6E
 *        refreshToken:
 *          type: string
 *          default: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmMwNjJiZGI4YzYyNjk5Y2I0MzczNDAiLCJlbWFpbCI6Im16cmpwOThAaG90bWFpbC5jb20iLCJuYW1lIjoiV2llZ2FuZCwgTGluZCBhbmQgR2lic29uIiwicGhvbmVOdW1iZXIiOiIwOTkxOTQwOTM3IiwiZGVzY3JpcHRpb24iOiJFdW0gaW52ZW50b3JlIGVvcyBkb2xvcmlidXMgb2NjYWVjYXRpIHZvbHVwdGF0ZW0gYXV0IGZ1Z2EgcXVvZCBzaXQuIEEgbWF4aW1lIHVsbGFtIGV4IGRlc2VydW50IGN1cGlkaXRhdGUgcXVpc3F1YW0gbmFtIGRpc3RpbmN0aW8uIEVycm9yIHZlbGl0IGNvbnNlcXVhdHVyIGhpYyBuZXNjaXVudCBzZWQgZXQgaGljLiIsImJ1c2luZXNzVHlwZUlkIjoiNjJjMDYyYjFiOGM2MjY5OWNiNDM3MzA1IiwiY3JlYXRlZEF0IjoiMjAyMi0wNy0wMlQxNToyMjozNy4wNjlaIiwidXBkYXRlZEF0IjoiMjAyMi0wNy0wMlQxNToyMjozNy4wNjlaIiwiX192IjowLCJzZXNzaW9uIjoiNjJkNTc2YjkwN2VhODA5NGZjY2Y2Yjg4IiwidXNlclR5cGUiOiJidXNpbmVzcyIsImlhdCI6MTY1ODE1NjcyOSwiZXhwIjoxNjg5NzE0MzI5fQ.Tkq_iTxTg97MeIkuZI1L-UQX2SJJfsfk5YIZFOG7lconD8hZtghPgicdmVlQPqYWErj3D1zFbCfse8pvKMVxw7EThvXDxexchJqlcVIP4DbPbUbhGggiFwlBsvVdrallDcf5hHb6lvB4q2wd1c88MbvHokvQCJhAl1u924sIt6E
 *        userType:
 *          type: string
 *          default: business
 * 
 *          
 */

export const createSessionSchema = object({
  body: object({
    email: string({ required_error: 'Email is required' }),
    password: string({ required_error: 'Password is required' }),
  }),
});
export type createSessionInput = TypeOf<typeof createSessionSchema>;