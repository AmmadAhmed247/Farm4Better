import express from "express";
import multer from "multer";
import { addProduct, getAllProducts, getProductById } from "../controllers/product.controller.js";

const router = express.Router();
const storage = multer.memoryStorage(); // store in memory for ImageKit
const upload = multer({ storage });

router.post("/add", upload.array("images", 5), addProduct);
router.get("/", getAllProducts);
router.get('/:id', getProductById);

export default router;
