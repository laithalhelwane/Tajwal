import { Request, Response, NextFunction } from 'express';

const requireBusiness = (req: Request, res: Response, next: NextFunction) => {
  const { business } = res.locals;
  if (!business) {
    return res.sendStatus(403);
  }
  return next();
};
export default requireBusiness;
