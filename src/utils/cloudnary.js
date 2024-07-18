import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload an image
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const result = await cloudinary.uploader.upload(localFilePath, {
      upload_preset: "ml_default",
    });
    // FILE HAS BEEN UPLOADED SUCCESSFUL REMOVE FILE FROM LOCAL
    return result;
  } catch (error) {
    return error;
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
