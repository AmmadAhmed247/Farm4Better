import Farmer from "../models/farmer.model.js";
import User from "../models/User.js";
import { uploadToImageKit } from "../middlewares/upload.js";
import mongoose from "mongoose";

// ✅ Register Farmer
export const registerFarmer = async (req, res) => {
  try {
    const { name, email, phone, farmName, location, farmType, experience } = req.body;

    // 🔒 Make sure this user exists and is authenticated
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized: Login required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🧠 Prevent duplicate farmer registration
    const existingFarmer = await Farmer.findOne({ user: user._id });
    if (existingFarmer) {
      return res.status(400).json({ message: "Farmer profile already exists" });
    }

    // 📤 Upload documents
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

    // ✅ Create linked farmer
    const farmer = await Farmer.create({
      user: user._id, // 🔗 Link farmer to user
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
      status: "pending",
    });

    // 🔄 Update user type if not already farmer
    if (user.userType !== "farmer") {
      user.userType = "farmer";
      await user.save();
    }

    res.status(201).json({
      message: "Farmer registered successfully ✅",
      farmer,
    });
  } catch (error) {
    console.error("❌ Error registering farmer:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Fetch Farmer by Query
export const getFarmerProfile = async (req, res) => {
  try {
    const { id, email } = req.query;
    let farmer = null;

    if (id) farmer = await Farmer.findById(id).populate("user");
    else if (email) farmer = await Farmer.findOne({ email }).populate("user");
    else return res.status(400).json({ message: "Provide farmer id or email as query param" });

    if (!farmer) return res.status(404).json({ message: "Farmer not found" });
    res.status(200).json({ farmer });
  } catch (error) {
    console.error("❌ Error fetching farmer profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get Authenticated Farmer ("My Profile")
export const getFarmerMe = async (req, res) => {
  try {
    console.log("GET /api/farmer/me called - req.user:", req.user);

    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized: Login required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.userType !== "farmer") {
      return res.status(403).json({ message: "User is not registered as a farmer" });
    }

    let farmer = await Farmer.findOne({ user: user._id }).populate("user");

    // 🧩 Auto-create basic profile if missing
    if (!farmer) {
      farmer = await Farmer.create({
        user: user._id,
        name: user.name,
        email: user.email,
        phone: "",
        farmName: `${user.name}'s Farm`,
        location: "",
        farmType: "",
        experience: "",
        status: "pending",
      });
    }

    res.status(200).json({ farmer });
  } catch (error) {
    console.error("Error in getFarmerMe:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
