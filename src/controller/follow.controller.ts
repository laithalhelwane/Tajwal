import { Request, Response, NextFunction } from 'express';
import { createFollowInput, deleteFollowInput } from '../schema/follow.schema';
import {
  createFollow,
  deleteFollow,
  findFollow,
  findFollows,
} from '../service/follow.service';
export async function getUserFollowedBusiness(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const follows = await findFollows({ userId: res.locals.user._id });
    return res.send({ success: true, data: { follows } });
  } catch (err: any) {
    return next({ statusCode: 409, message: err.message });
  }
}
export async function createFollowHandler(
  req: Request<{}, {}, createFollowInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const followedBefore = await findFollow({
      userId: res.locals.user._id,
      businessId: req.body.businessId,
    });
    if (!followedBefore) {
      const follow = await createFollow({
        ...req.body,
        userId: res.locals.user._id,
      });
      return res.status(201).send({ success: true, data: { follow } });
    } else {
      return next({ statusCode: 400, message: 'already followed' });
    }
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
export async function deleteFollowHandler(
  req: Request<deleteFollowInput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const follow = await findFollow({
      businessId: req.params._id,
      userId: res.locals.user._id,
    });
    if (!follow) {
      return next({
        statusCode: 404,
        message: `Follow with id=${req.params._id} not found`,
      });
    }
    await deleteFollow({
      businessId: req.params._id,
      userId: res.locals.user._id,

    });
    return res.send({ success: true, data: { follow: 'deleted' } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
