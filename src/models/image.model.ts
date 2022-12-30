import mongoose from 'mongoose';
export interface ImageDocument extends mongoose.Document {
  url: string;
  ownerId: mongoose.Types.ObjectId;
}
const ImageSchema = new mongoose.Schema<ImageDocument>({
  url: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const ImageModel = mongoose.model<ImageDocument>('Image', ImageSchema);
export default ImageModel;
