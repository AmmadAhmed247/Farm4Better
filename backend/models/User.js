import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // hide password in queries by default
    },

    userType: {
      type: String,
      enum: ["buyer", "farmer"],
      default: "buyer",
    },

    farmerStatus: {
      type: Boolean,
      default: false, // Farmers must be verified or activated manually
    },

    // Optional fields for scalability
    profileImage: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);



const User = mongoose.model("User", userSchema);
export default User;
