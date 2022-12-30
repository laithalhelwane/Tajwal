import { Request, Response, NextFunction } from 'express';
import {
  createCommentInput,
  deleteCommentInput,
  updateCommentInput,
} from '../schema/comment.schema';
import {
  createComment,
  deleteComment,
  findAndUpdateComment,
  findComment,
} from '../service/comment.service';
import { findUser } from '../service/user.service';

export async function createCommentHandler(
  req: Request<{}, {}, createCommentInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await findUser({ _id: res.locals.user._id });
    const comment = await createComment({
      ...req.body,
      userName: user!.name,
      userImage: user!.image.url,
      userId: res.locals.user._id,
    });
    return res.status(201).send({ success: true, data: { comment } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
export async function deleteCommentHandler(
  req: Request<deleteCommentInput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const comment = await findComment({
      _id: req.params._id,
      userId: res.locals.user._id,
    });
    if (!comment) {
      return next({
        statusCode: 404,
        message: `Comment with id=${req.params._id} not found`,
      });
    }
    await deleteComment({
      _id: req.params._id,
      userId: res.locals.user._id,
    });
    return res.send({ success: true, data: { comment: comment._id } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
export async function updateCommentHandler(
  req: Request<updateCommentInput['params'], {}, updateCommentInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const comment = await findAndUpdateComment(
      { _id: req.params._id, userName: res.locals.user.name },
      req.body,
      { lean: true, new: true }
    );

    if (!comment) {
      return next({
        statusCode: 404,
        message: `Comment with id=${req.params._id} not found`,
      });
    }

    return res.send({ success: true, data: { comment } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
