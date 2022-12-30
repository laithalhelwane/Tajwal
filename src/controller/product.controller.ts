import { Request, Response, NextFunction } from 'express';
import ProductCategoryModel from '../models/productCategory.model';
import ProductTypeModel from '../models/productType.model';
import {
  createProductInput,
  deleteProductInput,
  getProductInput,
  updateProductInput,
} from '../schema/product.schema';
import { findCategory } from '../service/category.service';
import { findType } from '../service/type.service';
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
  findProducts,
} from '../service/product.service';
import nanoid from '../util/nanoid';

export async function createProductHandler(
  req: Request<{}, {}, createProductInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const rsid = `product_${nanoid()}`;
    const product = await createProduct(
      {
        ...req.body,
        rsid,
        businessId: res.locals.business._id,
        businessName: res.locals.business.name,
      },
      req
    );
    if (req.body.categoryId !== undefined) {
      const category = await findCategory({ _id: req.body.categoryId });
      if (category !== null) {
        await ProductCategoryModel.create({
          categoryId: req.body.categoryId,
          productId: product._id,
          categoryName: category.name,
        });
      }
    }

    if (req.body.typeId !== undefined) {
      const type = await findType({ _id: req.body.typeId });
      if (type !== null) {
        await ProductTypeModel.create({
          typeId: req.body.typeId,
          productId: product._id,
          typeName: type.name,
        });
      }
    }
    const ret = await findProduct(
      { _id: product._id },
      { populate: ['images', 'categories', 'types'] }
    );
    return res.status(201).send({ success: true, data: { product: ret } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
export async function getSimilarProduct(
  req: Request<getProductInput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    // const products = [];
    const product = await findProduct({ _id: req.params._id });
    if (!product) {
      return next({
        statusCode: 404,
        message: `product with id=${req.params._id} not found`,
      });
    }

    //@ts-ignore
    const productCategory = await ProductCategoryModel.find({
      categoryId: product.categories[0].categoryId,
    });
    const products = [];
    for (let rel of productCategory) {
      const temp = await findProduct({_id:rel.productId});
      products.push(temp);
    }

    return res.send({ success: true, data: { products } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
export async function getProductHandler(
  req: Request<getProductInput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await findProduct({ _id: req.params._id });
    if (!product) {
      return next({
        statusCode: 404,
        message: `Product with id=${req.params._id} not found`,
      });
    }
    return res.send({ success: true, data: { product } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
export async function updateProductHandler(
  req: Request<updateProductInput['params'], {}, updateProductInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await findAndUpdateProduct(
      { _id: req.params._id, businessId: res.locals.business._id },
      req.body,
      { lean: true, new: true }
    );
    if (!product) {
      return next({
        statusCode: 404,
        message: `Product with id=${req.params._id} not found`,
      });
    }
    if (req.body.categoryId !== undefined) {
      await ProductCategoryModel.deleteMany({ productId: product._id });

      const category = await findCategory({ _id: req.body.categoryId });
      if (category) {
        await ProductCategoryModel.create({
          categoryId: req.body.categoryId,
          productId: product._id,
          categoryName: category.name,
        });
      }
    }
    if (req.body.typeId !== undefined) {
      await ProductTypeModel.deleteMany({ productId: product._id });

      const type = await findType({ _id: req.body.typeId });
      if (type) {
        await ProductTypeModel.create({
          typeId: req.body.typeId,
          productId: product._id,
          typeName: type.name,
        });
      }
    }
    const updateProduct = await findProduct({
      _id: req.params._id,
      businessId: res.locals.business._id,
    });
    return res.send({ success: true, data: { product: updateProduct } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
export async function deleteProductHandler(
  req: Request<deleteProductInput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await findProduct({
      _id: req.params._id,
      businessId: res.locals.business._id,
    });
    if (!product) {
      return next({
        statusCode: 404,
        message: `Product with id=${req.params._id} not found`,
      });
    }
    await deleteProduct({ _id: req.params._id });
    return res.send({ success: true, data: { product } });
  } catch (err: any) {
    next({ statusCode: 409, message: err.message });
  }
}
