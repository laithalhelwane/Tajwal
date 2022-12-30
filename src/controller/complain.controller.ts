import { Request, Response, NextFunction } from 'express';
import { createComplainInput } from '../schema/complain.schema';
import {
  createComplain,
  findAndUpdateComplain,
  findComplains,
} from '../service/complain.service';
import { findUser } from '../service/user.service';

export async function createComplainHandler(
  req: Request<{}, {}, createComplainInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await findUser({ _id: res.locals.user._id });
    const complain = await createComplain({
      ...req.body,
      userName: user!.name,
      userImage: user!.image.url,
      userId: res.locals.user._id,
    });
    return res.status(201).send({ success: true, data: { complain } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}

export async function getComplainHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const complains = await findComplains({
      businessId: res.locals.business._id,
    });
    await findAndUpdateComplain(
      { businessId: res.locals.business._id, seen: false },
      { seen: true },
      {}
    );
    return res.send({ success: true, data: { complains } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
