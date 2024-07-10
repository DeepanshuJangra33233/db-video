import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload an image
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // FILE HAS BEEN UPLOADED SUCCESSFUL REMOVE FILE FROM LOCAL
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

async function deleteFile(id) {
  try {
    if (!id) return null;
    const result = await cloudinary.uploader.destroy(id);
    return result;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}
export { uploadOnCloudinary, deleteFile };
