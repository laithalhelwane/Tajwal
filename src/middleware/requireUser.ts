import { Request, Response, NextFunction } from 'express';

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const { user } = res.locals;
  if (!user) {
    return res.status(403).send({success: false, error_code: 403, message: 'Not Authorized' });
  }
  return next();
};
export default requireUser;
