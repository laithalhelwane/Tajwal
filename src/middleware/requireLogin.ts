import { Request, Response, NextFunction } from 'express';

const requireBusiness = (req: Request, res: Response, next: NextFunction) => {
  const { business } = res.locals;
  const { user } = res.locals;
  if (!business && !user) {
    return res
      .status(403)
      .send({ success: false, error_code: 403, message: 'Not Authorized' });
  }
  return next();
};
export default requireBusiness;
