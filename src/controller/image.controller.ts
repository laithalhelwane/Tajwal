import { Request, Response, NextFunction } from 'express';
import { createImage, deleteImage } from '../service/image.service';
import { get } from 'lodash';
import { uploadImageInput } from '../schema/product.schema';
export async function createImageHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const ownerId =
      get(res.locals.user, '_id') || get(res.locals.business, '_id');
    await deleteImage({ ownerId });
    const image = await createImage(req.file as Express.Multer.File, {
      url: `${req.protocol}://${req.headers.host!}`,
      ownerId,
    });
    return res.status(201).send({ success: true, data: { image } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}

export async function createMultipleImageHandler(
  req: Request<uploadImageInput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    //await deleteImage({ ownerId: req.params._id });
    // const ret = [];
    // for (const file of req.files as Express.Multer.File[]) {
    //   const temp = await createImage(file, {
    //     url: `${req.protocol}://${req.headers.host!}`,
    //     ownerId: req.params._id,
    //   });
    //   ret.push(temp);
    // }
    await deleteImage({
      url: `${req.protocol}://${req.headers.host!}/product.png`,
      ownerId: req.params._id,
    });
    const image = await createImage(req.file as Express.Multer.File, {
      url: `${req.protocol}://${req.headers.host!}`,
      ownerId: req.params._id,
    });
    return res.status(201).send({ success: true, data: { image } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
