// middlewares/upload.js
import imagekit from "../middlewares/imagekit.js";

export const uploadToImageKit = async (file) => {
  try {
    console.log("Uploading file:", file.originalname); // debug

    const uploaded = await imagekit.upload({
      file: file.buffer, // memory buffer, not path
      fileName: `${Date.now()}_${file.originalname}`,
      folder: "/farm-products",
    });

  console.log("Uploaded to ImageKit:", uploaded.url);
  // Return the uploaded file URL (string) so Mongoose string fields receive a string
  return uploaded.url;
  } catch (error) {
    console.error("ImageKit upload failed:", error);
    throw new Error("Image upload failed");
  }
};
