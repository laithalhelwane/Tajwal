import { Request, Response, NextFunction } from 'express';
import config from 'config';
import {
  createSession,
  findSession,
  updateSession,
} from '../service/session.service';
import { validatePassword as userValidate } from '../service/user.service';
import { validatePassword as businessValidate } from '../service/business.service';

import { signJwt } from '../util/jwt.util';
import { createSessionInput } from '../schema/session.schema';

export async function createUserSessionHandler(
  req: Request<{}, {}, createSessionInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await userValidate(req.body);
    const business = await businessValidate(req.body);
    const user1 = user || business;
    if (!user && !business) {
      return res.status(401).send('يوجد خطأ في البريد الألكتروني أو في كلمة المرور');
    }
    const userType = business !== null ? 'business' : 'user';

    const session = await createSession(
      user1!._id,
      req.get('user-agent') || '',
      userType,
      user1!.rsid
    );

    const accessToken = signJwt(
      { ...user1, session: session._id, userType },
      { expiresIn: config.get<string>('accessTokenTtl') }
    );

    const refreshToken = signJwt(
      { ...user1, session: session._id, userType },
      { expiresIn: config.get<string>('refreshTokenTtl') }
    );
    return res.status(201).send({
      accessToken: accessToken,
      refreshToken: refreshToken,
      userType,
      
    });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}

export async function getUserSessionHandler(req: Request, res: Response) {
  const userId =
    res.locals.user !== undefined
      ? res.locals.user._id
      : res.locals.business._id;

  const session = await findSession({ user: userId, valid: true });
  return res.send(session);
}
export async function deleteUserSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session || res.locals.business.session;
  await updateSession({ _id: sessionId }, { valid: false });
  return res.status(200).send({ accessToken: null, refreshToken: null });
}
