import { Router } from 'express';

const router = Router();
/**
 * @openapi
 * '/api/sizes':
 *  get:
 *    tags:
 *      - Size
 *    summary: Get sizes
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  default: true
 *                data:
 *                  type: object
 *                  properties:
 *                    sizes:
 *                      type: array
 *                      items:
 *                          type: string
 *                      default:
 *                          - XS
 *                          - S
 *                          - M
 *                          - L
 *                          - XL
 *                          - XXL
 *                          - 3X
 *                          - 4X
 *      404:
 *        description: Not Found
 *      409:
 *        description: Conflict
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  default: false
 *                error_code:
 *                  type: number
 *                  default: 409
 *                message:
 *                  type: string
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  default: false
 *                error_code:
 *                  type: number
 *                  default: 400
 *                message:
 *                  type: string
 */
router.get('/api/sizes', (req, res) => {
  res.send({
    success: true,
    data: { sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3X', '4X'] },
  });
});
export default router;