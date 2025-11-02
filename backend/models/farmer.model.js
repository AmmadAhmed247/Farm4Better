import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: "" }, // optional for now
    farmName: { type: String, default: "" }, // can be filled later
    location: { type: String, default: "" },
    farmType: { type: String, default: "" },
    experience: { type: String, default: "" },
    idDocument: { type: String, default: "" },
    farmDocument: { type: String, default: "" },
    organicCertificate: { type: String, default: "" },
    bankProof: { type: String, default: "" },
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
