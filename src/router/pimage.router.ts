/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import { Router } from 'express';
import sharp from 'sharp';
import upload from '../middleware/multer';
import ImageModel from '../models/image.model';
import { createImage, deleteImage } from '../service/image.service';

const router = Router();
router.post('/api/pimage', upload.single('image'), async (req, res) => {
  await deleteImage({
    url: `${req.protocol}://${req.headers.host!}/product.png`,
    ownerId: req.body._id,
  });

  const fileName = `${req.protocol}://${req.headers.host!}/${req.body.image}`;

  const image = new ImageModel({
    url: fileName,
    ownerId: req.body._id,
  });
  await image.save();
  return res
    .status(201)
    .send({ success: true, data: { image: image.toJSON() } });
});
router.post('/api/bimage', upload.single('image'), async (req, res) => {
  await deleteImage({
    ownerId: req.body._id,
  });

  const fileName = `${req.protocol}://${req.headers.host!}/${req.body.image}`;

  const image = new ImageModel({
    url: fileName,
    ownerId: req.body._id,
  });
  await image.save();
  return res
    .status(201)
    .send({ success: true, data: { image: image.toJSON() } });
});
export default router;
