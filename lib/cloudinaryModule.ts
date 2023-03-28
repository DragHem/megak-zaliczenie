import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export abstract class PhotoUpload {
  private static cloudinaryOptions = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: "KittyProject",
  };

  static uploadImage = async (imagePath: string) => {
    try {
      return await cloudinary.uploader.upload(
        imagePath,
        this.cloudinaryOptions
      );
    } catch (e) {
      console.log(e);
    }
  };
}
