import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import authRoutes from "./routes/auth.route.js";
import FarmerRoute from "./routes/farmer.route.js";
import productRoutes from "./routes/product.route.js";
dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/farmers", FarmerRoute);
app.use("/api/products", productRoutes);




app.listen(process.env.PORT, () => console.log(`Server running on port `));
