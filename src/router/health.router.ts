import express, { Request, Response } from 'express';
const router = express.Router();
/**
 * @openapi
 * '/healthcheck':
 *  get:
 *    tags:
 *      - HealthCheck
 *    description: Responds if the app is up and runnnig
 *    responses:
 *      200:
 *        description: App is up and running
 */
router.get('/api/healthcheck', (req: Request, res: Response) =>
  res.sendStatus(200)
);

export default router;
