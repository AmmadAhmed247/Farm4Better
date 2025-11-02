import { Product } from "../models/product.model.js";
import { uploadToImageKit } from "../middlewares/upload.js";
import Farmer from "../models/farmer.model.js";

export const addProduct = async (req, res) => {
  try {
    console.log('POST /api/products/add - Request body:', req.body);
    console.log('POST /api/products/add - User:', req.user);
    console.log('POST /api/products/add - Files:', req.files);

    // Validate farmer status first
    if (!req.user?.id) {
      console.log('No user ID in request');
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    const farmer = await Farmer.findOne({ user: req.user.id });


    console.log('Found farmer:', farmer);
    
    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "Farmer profile not found"
      });
    }

    if (farmer.status !== 'approved') {
      return res.status(403).json({
        success: false,
        message: "Your documents are still under review. Please wait for approval before adding products."
      });
    }

    const { name, category, price, unit, quantity, description, isOrganic, isPesticideFree } = req.body;

    // Upload all images to ImageKit
    const uploadedImages = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploaded = await uploadToImageKit(file);
        // uploadToImageKit currently returns the uploaded URL string
        uploadedImages.push({
          url: typeof uploaded === 'string' ? uploaded : uploaded.url,
          fileId: uploaded?.fileId || null,
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
      farmer: farmer._id // Use the found farmer's ID
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (err) {
    console.error('Error adding product:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: err.message,
    });
  }
};

// Get product by id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate('farmer');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    // populate farmer to expose farmer details (like location) to the client
    const products = await Product.find().populate('farmer').sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
