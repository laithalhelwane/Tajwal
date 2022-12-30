import { Router } from 'express';
import {
  createTypeHandler,
  deleteTypeHandler,
  updateTypeHandler
} from '../controller/types.controller';
import requireBusiness from '../middleware/requireBusiness';
import validateResouce from '../middleware/validateResouce';
import {
  createTypeSchema,
  deleteTypeSchema,
  updateTypeSchema,
} from '../schema/type.schema';
const router = Router();
router.post(
  '/api/types',
  validateResouce(createTypeSchema),
  createTypeHandler
);
router.delete(
  '/api/types/:_id',
  [requireBusiness, validateResouce(deleteTypeSchema)],
  deleteTypeHandler
);
router.patch(
  '/api/types/:_id',
  [requireBusiness, validateResouce(updateTypeSchema)],
  updateTypeHandler
);
export default router;
