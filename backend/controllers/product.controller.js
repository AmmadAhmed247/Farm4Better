import { Product } from "../models/product.model.js";
import { uploadToImageKit } from "../middlewares/upload.js";

export const addProduct = async (req, res) => {
  try {
    const { name, category, price, unit, quantity, description, isOrganic, isPesticideFree } = req.body;

    // Upload all images to ImageKit
    const uploadedImages = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploaded = await uploadToImageKit(file);
        uploadedImages.push({
          url: uploaded.url,
          fileId: uploaded.fileId,
        });
      }
    }

    const product = await Product.create({
      name,
      category,
      price,
      unit,
      quantity,
      description,
      isOrganic,
      isPesticideFree,
      images: uploadedImages,
      farmer: req.user?._id || null, // if you connect with auth later
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: err.message,
    });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
