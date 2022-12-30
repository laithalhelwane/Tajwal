import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { reIssueAccessToken } from '../service/session.service';
import { verifyJwt } from '../util/jwt.util';

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = (<string>get(req, 'headers.authorization', '')).replace(
    /^Bearer\s/,
    ''
  );

  const refreshToken = <string>get(req, 'headers.x-refresh');
  if (!accessToken) {
    return next();
  }
  const { expired, decoded } = verifyJwt(accessToken);
  if (decoded) {
    if (decoded.userType === 'business') res.locals.business = decoded;
    else res.locals.user = decoded;
    return next();
  }
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({
      refreshToken: refreshToken,
    });
    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);
    }
    const result = verifyJwt(newAccessToken as string);
    if (result && result.decoded) {
      if (result.decoded.userType === 'business')
        res.locals.business = result.decoded;
      else res.locals.user = result.decoded;
    }
    return next();
  }
  return next();
};
