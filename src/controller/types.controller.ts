import { Request, Response, NextFunction } from 'express';
import {
  createTypeInput,
  deleteTypeInput,
  updateTypeInput,
} from '../schema/type.schema';
import {
  createType,
  deleteType,
  findAndUpdateType,
  findType,
} from '../service/type.service';

export async function createTypeHandler(
  req: Request<{}, {}, createTypeInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const type = await createType(req.body);
    return res.status(201).send({ success: true, data: { type } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}

export async function deleteTypeHandler(
  req: Request<deleteTypeInput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const type = await findType({ _id: req.params._id });
    if (!type) {
      return next({
        statusCode: 404,
        message: `Type with id=${req.params._id} not found`,
      });
    }
    return res.send({ success: true, data: { type } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
export async function updateTypeHandler(
  req: Request<updateTypeInput['params'], {}, updateTypeInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const type = await findAndUpdateType({ _id: req.params._id }, req.body, {
      lean: true,
      new: true,
    });
    if (!type) {
      return next({
        statusCode: 404,
        message: `Type with id=${req.params._id} not found`,
      });
    }
    return res.send({ success: true, data: { type } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
