import express from "express";
import multer from "multer";
import { registerFarmer } from "../controllers/farmer.controller.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/register",
  upload.fields([
    { name: "idDocument", maxCount: 1 },
    { name: "farmDocument", maxCount: 1 },
    { name: "organicCertificate", maxCount: 1 },
    { name: "bankProof", maxCount: 1 },
  ]),
  registerFarmer
);

export default router;
