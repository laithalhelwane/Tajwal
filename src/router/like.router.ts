import { Router } from 'express';
import requireUser from '../middleware/requireUser';
import { createLikeSchema } from '../schema/like.schema';
import validateResource from '../middleware/validateResouce';
import { createLikeHandler } from '../controller/like.controller';

const router = Router();
router.post(
  '/api/likes',
  [requireUser, validateResource(createLikeSchema)],
  createLikeHandler
);
export default router;
