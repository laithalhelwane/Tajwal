import ImageModel, { ImageDocument } from '../models/image.model';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 10);
import sharp from 'sharp';
import { DocumentDefinition, FilterQuery } from 'mongoose';

export async function createImage(
  input: Express.Multer.File,
  extraData: DocumentDefinition<Omit<ImageDocument, 'createAt' | 'updateAt'>>
) {
  const fileName = `image_${nanoid()}.png`;
  await sharp(input.buffer).png().toFile(`./src/images/${fileName}`);

  const image = new ImageModel({
    url: `${extraData.url}/${fileName}`,
    ownerId: extraData.ownerId,
  });
  await image.save();
  return image.toJSON();
}
export async function createImageLocal(
  extraData: DocumentDefinition<Omit<ImageDocument, 'createAt' | 'updateAt'>>,
  type: string
) {
  const image = new ImageModel({
    url: `${extraData.url}/${type}.png`,
    ownerId: extraData.ownerId,
  });
  await image.save();
  return image.toJSON();
}
export async function deleteImage(query: FilterQuery<ImageDocument>) {
  return await ImageModel.deleteMany(query);
}
