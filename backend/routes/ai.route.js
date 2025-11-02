import express from "express";
import axios from "axios";
import multer from "multer";
import FormData from "form-data"; // <-- make sure this is installed

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/predict", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const formData = new FormData();
    formData.append("file", req.file.buffer, { filename: req.file.originalname });

    const flaskRes = await axios.post("http://127.0.0.1:5000/predict", formData, {
      headers: formData.getHeaders(),
    });

    res.json(flaskRes.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "AI prediction failed" });
  }
});

export default router;
