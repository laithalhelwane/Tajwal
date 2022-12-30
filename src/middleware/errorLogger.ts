import { Request, Response, NextFunction } from 'express';
import logger from '../util/logger';
export default function errorLoger(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err);
  return res.status(err.statusCode).send({
    success: false,
    error_code: err.statusCode,
    message: err.message,
  });
}
