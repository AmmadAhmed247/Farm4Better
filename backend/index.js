import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import authRoutes from "./routes/auth.route.js";
import FarmerRoute from "./routes/farmer.route.js";
import productRoutes from "./routes/product.route.js";
import auth from './middlewares/auth.js';
import cartRoutes from './routes/cart.route.js';
import aiRoutes from './routes/ai.route.js';
import chatRoutes from './routes/chat.route.js';
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
app.use("/api/farmer", FarmerRoute);
app.use("/api/products",productRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("✅ Farmer Chatbot API running!");
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
