import Farmer from "../models/farmer.model.js";
import { uploadToImageKit } from "../middlewares/upload.js";

export const registerFarmer = async (req, res) => {
  try {
    const { name, email, phone, farmName, location, farmType, experience } = req.body;

    const idDocUrl = req.files.idDocument
      ? await uploadToImageKit(req.files.idDocument[0])
      : null;

    const farmDocUrl = req.files.farmDocument
      ? await uploadToImageKit(req.files.farmDocument[0])
      : null;

    const organicCertUrl = req.files.organicCertificate
      ? await uploadToImageKit(req.files.organicCertificate[0])
      : null;

    const bankProofUrl = req.files.bankProof
      ? await uploadToImageKit(req.files.bankProof[0])
      : null;

    const farmer = await Farmer.create({
      name,
      email,
      phone,
      farmName,
      location,
      farmType,
      experience,
      idDocument: idDocUrl,
      farmDocument: farmDocUrl,
      organicCertificate: organicCertUrl,
      bankProof: bankProofUrl,
    });

    res.status(201).json({
      message: "Farmer registered successfully ✅",
      farmer,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
