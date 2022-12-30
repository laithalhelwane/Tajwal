import { Request, Response, NextFunction } from 'express';
import {
  createBusinessInput,
  deleteBusinessInput,
  getBusinessInput,
  updateBusinessInput,
} from '../schema/bussiness.schema';
import {
  createBusiness,
  deleteBusiness,
  findAndUpdateBusiness,
  findBusiness,
  getAllbusinesses,
} from '../service/business.service';
import { findBusinessType } from '../service/businessType.service';
import { deleteLike } from '../service/like.service';
import { createLocation, deleteLocation } from '../service/location.service';
import { deleteProduct } from '../service/product.service';
import {
  createWorkingTime,
  deleteWorkingTime,
} from '../service/workingHours.service';
import nanoid from '../util/nanoid';
export async function getAllbusinessesHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const buisnesses = await getAllbusinesses(res);
    return res.send({ success: true, data: { buisnesses } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
export async function createBusinessHandler(
  req: Request<{}, {}, createBusinessInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const businessType = await findBusinessType({
      _id: req.body.businessTypeId,
    });
    if (!businessType) {
      return res
        .status(404)
        .send(
          `businessType with id = ${req.body.businessTypeId} was not found in the database`
        );
    }
    const rsid = `business_${nanoid()}`;
    const business = await createBusiness({ ...req.body, rsid }, req);
    await createLocation({
      ...req.body.location,
      businessId: business._id,
    });
    req.body.workingTime.forEach(
      async (workTime) =>
        await createWorkingTime({
          ...workTime,
          businessId: business._id,
        })
    );
    const final = await findBusiness({ _id: business._id });
    return res.status(201).send({ success: true, data: { business: final } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
export async function getBusinessHandler(
  req: Request<getBusinessInput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const business = await findBusiness({ _id: req.params._id });
    if (!business) {
      return next({
        statusCode: 404,
        message: `business with id = ${req.params._id} not found`,
      });
    }
    
    return res.status(200).send({
      success: true,
      data: {
        business,
      },
    });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
export async function getCurrentBusinessHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const business = await findBusiness({ _id: res.locals.business._id });
    return res.status(200).send({ success: true, data: { business } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
export async function deleteBusinessHandler(
  req: Request<deleteBusinessInput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    await deleteWorkingTime({ businessId: res.locals.business._id });
    await deleteLocation({ businessId: res.locals.business._id });
    await deleteLike({ businessId: res.locals.business._id });
    await deleteProduct({ businessId: res.locals.business._id });
    await deleteBusiness({ _id: res.locals.business._id });
    return res.send({
      success: true,
      data: { business: res.locals.business._id },
    });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
export async function updateBusinessHandler(
  req: Request<{}, {}, updateBusinessInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    await findAndUpdateBusiness({ _id: res.locals.business._id }, req.body, {});
    if (req.body.location !== undefined) {
      await deleteLocation({ businessId: res.locals.business._id });
      await createLocation({
        ...req.body.location,
        businessId: res.locals.business._id,
      });
    }
    if (req.body.workingTime !== undefined) {
      await deleteWorkingTime({ businessId: res.locals.business._id });
      req.body.workingTime.forEach(
        async (workTime) =>
          await createWorkingTime({
            ...workTime,
            businessId: res.locals.business._id,
          })
      );
    }
    const business = await findBusiness({ _id: res.locals.business._id });
    return res.send({ success: true, data: { business } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
