import { NextApiRequest } from "next";

import path from "path";
import fs from "fs";

import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";

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

  static async uploadImage(imagePath: string) {
    try {
      return await cloudinary.uploader.upload(
        imagePath,
        this.cloudinaryOptions
      );
    } catch (e) {}
  }

  static async extractBodyFromFormData(req: NextApiRequest) {
    const dir = path.join(__dirname, "..", "/temporaryImages");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    //@todo doać sprawdzanie typów, chociaż najprostsze
    return new Promise(function (resolve, reject) {
      const form = new formidable.IncomingForm({
        keepExtensions: true,
        uploadDir: dir,
        maxFiles: 3,
      });

      form.parse(req, function (err, fields, files) {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });
  }
}
