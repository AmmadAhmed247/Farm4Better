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
    return uploaded;
  } catch (error) {
    console.error("ImageKit upload failed:", error);
    throw new Error("Image upload failed");
  }
};
