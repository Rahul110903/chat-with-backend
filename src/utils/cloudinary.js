import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadCoudinary = async function (localFilePath) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  if (!localFilePath) return null;
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File is uploaded on : ", result.url);
    fs.unlinkSync(localFilePath);
    return result;
  } catch (error) {
    console.error("Error while uploading file to Cloudinary", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadCoudinary };
