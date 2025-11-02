import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    farmName: { type: String, required: true },
    location: { type: String, required: true },
    farmType: { type: String, required: true },
    experience: { type: String, required: true },
    idDocument: { type: String, required: true },
    farmDocument: { type: String, required: true },
    organicCertificate: { type: String },
    bankProof: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Farmer = mongoose.model("Farmer", farmerSchema);
export default Farmer;
