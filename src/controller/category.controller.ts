import { Request, Response, NextFunction } from 'express';
import {
  createCategoryInput,
  deleteCategoryInput,
  getCategoryInput,
  updateCategoryInput,
} from '../schema/category.schema';
import {
  createCategory,
  deleteCategory,
  findAndUpdateCategory,
  findCategory,
} from '../service/category.service';
import logger from '../util/logger';

export async function createCategoryHandler(
  req: Request<{}, {}, createCategoryInput['body']>,
  res: Response
) {
  try {
    const category = await createCategory(req.body);
    return res.status(201).send({ success: true, data: { category } });
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
export async function getCategoryHandler(
  req: Request<getCategoryInput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const category = await findCategory({ _id: req.params._id });
    if (!category) {
      return next({
        statusCode: 409,
        message: `Category with id = ${req.params._id} was not found in the database`,
      });
    }
    return res.send({ success: true, data: { category } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}

export async function updateCategoryHandler(
  req: Request<updateCategoryInput['params'], {}, updateCategoryInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const category = await findAndUpdateCategory(
      { _id: req.params._id },
      req.body,
      { lean: true, new: true }
    );
    if (!category) {
      return next({
        statusCode: 409,
        message: `Category with id = ${req.params._id} was not found in the database`,
      });
    }
    return res.send({ success: true, data: { category } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
export async function deleteCategoryHandler(
  req: Request<deleteCategoryInput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const category = await findCategory({ _id: req.params._id });
    if (!category) {
      return next({
        statusCode: 409,
        message: `Category with id = ${req.params._id} was not found in the database`,
      });
    }
    await deleteCategory({ _id: category._id });
    return res.send({ success: true, data: { category: category._id } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
