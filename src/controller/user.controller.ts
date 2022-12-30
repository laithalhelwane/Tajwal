import { Request, Response, NextFunction } from 'express';
import { createImageLocal } from '../service/image.service';
import {
  createUserService,
  findAndUpdateUser,
  findUser,
} from '../service/user.service';
import { createUserInput, updateUserInput } from '../schema/user.schema';
import nanoid from '../util/nanoid';

export async function createUserHandler(
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    createUserInput['body']
  >,
  res: Response,
  next: NextFunction
) {
  try {
    const rsid = `user_${nanoid()}`;
    const addedBefore = await findUser({email: req.body.email});
    if(addedBefore!==null) {
      return next({ statusCode: 400, message: 'البريد الالكتروني مستخدم مسبقا'})
    }
    const user = await createUserService({ ...req.body, rsid }, req);
    return res.status(201).send({ success: true, data: { user } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}

export async function getUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await findUser({ _id: res.locals.user._id });
    if (!user) {
      return next({ statusCode: 404, message: 'user not found' });
    }
    return res.send({ success: true, data: { user } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}

export async function updateUserHandler(
  req: Request<{}, {}, updateUserInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    await findAndUpdateUser({ _id: res.locals.user._id }, req.body, {
      lean: true,
      new: true,
    });
    const user = await findUser({ _id: res.locals.user._id });
    return res.send({ success: true, data: { user } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
