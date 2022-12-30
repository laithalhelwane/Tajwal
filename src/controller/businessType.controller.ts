import { NextFunction, Request, Response } from 'express';
import {
  createBusinessTypeInput,
  deleteBusinessTypeINput,
  getBusinessTypebyIdInput,
  getTopByBusinessTypeIdInput,
  updateBusinessTypeInput,
} from '../schema/bussinessType.schema';
import {
  createBusinessType,
  deleteBusinessType,
  findAndUpdateBusinessType,
  findBusinessType,
  getAllBusinessType,
} from '../service/businessType.service';
import { getTopBusiness } from '../service/business.service';
import { findTypes } from '../service/type.service';
import { findCategories } from '../service/category.service';
export async function createBusinessTypeHandler(
  req: Request<{}, {}, createBusinessTypeInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const businessType = await createBusinessType(req.body);
    return res.status(201).send({ success: true, data: { businessType } });
  } catch (err: any) {
    return next({ statusCode: 409, message: err.message });
  }
}
export async function getBusinessTypesHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const businessTypes = await getAllBusinessType();
    return res.send({ success: true, data: { businessTypes } });
  } catch (err: any) {
    return next({ statusCode: 409, message: err.message });
  }
}
export async function getTypesByBusinessTypeIdHandler(
  req: Request<getTopByBusinessTypeIdInput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const businessType = await findBusinessType({ _id: req.params._id });
    if (!businessType) {
      return next({
        statusCode: 404,
        message: `businessType with id=${req.params._id} not found`,
      });
    }
    const types = await findTypes({ businessTypeId: req.params._id });
    return res.send({ success: true, data: { types } });
  } catch (err: any) {
    return next({ statusCode: 409, message: err.message });
  }
}
export async function getTopByBusinessTypeIdHandler(
  req: Request<getTopByBusinessTypeIdInput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const businessType = await findBusinessType({ _id: req.params._id });
    if (!businessType) {
      return next({
        statusCode: 404,
        message: `businessType with id=${req.params._id} not found`,
      });
    }
    const businesses = await getTopBusiness({ businessTypeId: req.params._id });
    return res.status(200).send({ success: true, data: { businesses } });
  } catch (err: any) {
    return next({ statusCode: 409, message: err.message });
  }
}
export async function updateBusinessTypeHandler(
  req: Request<updateBusinessTypeInput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const businessType = await findAndUpdateBusinessType(
      { _id: req.params._id },
      req.body,
      { lean: true, new: true }
    );
    if (!businessType) {
      return next({
        statusCode: 404,
        message: `businessType with id ${req.params._id} not found`,
      });
    }
    return res.send(businessType);
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}

export async function deleteBusinessTypeHandler(
  req: Request<deleteBusinessTypeINput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const isExist = await findBusinessType({ _id: req.params._id });
    if (!isExist) {
      return next({
        statusCode: 404,
        message: `businessType with id ${req.params._id} not found`,
      });
    }
    const businessType = await deleteBusinessType({ _id: req.params._id });
    return res.send({ success: true, data: { businessType: req.params._id } });
  } catch (err: any) {
    return next({ statusCode: 409, message: err.message });
  }
}

export async function getBusinessTypebyIdHandler(
  req: Request<getBusinessTypebyIdInput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const businessType = await findBusinessType(
      { _id: req.params._id },
      { lean: true }
    );
    if (!businessType) {
      return res.status(404).send();
    }
    return res.send({ success: true, data: { businessType } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
export async function getCategoriesByBusinessTypeIdHandler(
  req: Request<getTopByBusinessTypeIdInput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const businessType = await findBusinessType({ _id: req.params._id });
    if (!businessType) {
      return next({
        statusCode: 404,
        message: `businessType with id=${req.params._id} not found`,
      });
    }
    const categories = await findCategories({ businessTypeId: req.params._id });
    return res.send({ success: true, data: { categories } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
