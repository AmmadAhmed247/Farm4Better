import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    fileId: {
      type: String,
      default: null,
    },
  },
  { _id: false } //disable automatic _id for subdocuments
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    category: {
      type: String,
      enum: ["vegetables", "fruits", "grains", "dairy", "herbs"],
      required: [true, "Category is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    unit: {
      type: String,
      enum: ["kg", "liter", "piece", "dozen"],
      required: [true, "Unit is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    totalSales: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    isOrganic: {
      type: Boolean,
      default: false,
    },
    isPesticideFree: {
      type: Boolean,
      default: false,
    },
    images: [imageSchema], // 👈 use the clean subdocument schema
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmer",
      default: null,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
