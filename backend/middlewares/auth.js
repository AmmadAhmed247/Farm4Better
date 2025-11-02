import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Simple auth middleware that verifies token from cookie or Authorization header
export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")?.[1];
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach basic user info
    req.user = { id: decoded.id, email: decoded.email };
    return next();
  } catch (error) {
    console.error("Auth verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
