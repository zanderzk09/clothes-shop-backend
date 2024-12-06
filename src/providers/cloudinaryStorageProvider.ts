import { v2 as cloudinary } from 'cloudinary';
import { IStorageProvider } from '../interfaces/IStorageProvider';

cloudinary.config(process.env.CLOUDINARY_URL!);

export class CloudinaryStorageProvider implements IStorageProvider {
  async upload(file: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result && result.secure_url) {
            resolve(result.secure_url);
          } else {
            reject(new Error('No secure URL returned'));
          }
        }
      );

      uploadStream.end(file);
    });
  }
}
