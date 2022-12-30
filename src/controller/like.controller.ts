import { Request, Response } from 'express';
import { createLikeInput } from '../schema/like.schema';
import { createLike } from '../service/like.service';
import logger from '../util/logger';
export async function createLikeHandler(
  req: Request<{}, {}, createLikeInput['body']>,
  res: Response
) {
  try {
    const like = await createLike({ ...req.body, userId: res.locals.user._id });
    return res.status(201).send(like);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
