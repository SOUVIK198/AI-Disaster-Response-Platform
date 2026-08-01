import { v2 as cloudinary } from "cloudinary";
import { env } from "./env";

// Configure Cloudinary
cloudinary.config({
  cloud_name: env.CLOUDINARY.CLOUD_NAME,
  api_key: env.CLOUDINARY.API_KEY,
  api_secret: env.CLOUDINARY.API_SECRET,
  secure: true,
});

/**
 * Upload image to Cloudinary
 */
export const uploadImage = async (
  filePath: string,
  folder: string
) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "image",
    });

    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete image from Cloudinary
 */
export const deleteImage = async (
  publicId: string
) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);

    return result;
  } catch (error) {
    throw error;
  }
};

export default cloudinary;