import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../models/User";

dotenv.config();
const { SECRET_KEY } = process.env;

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token received:", token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Decoded token:", decoded);

    const user = await User.findByPk(decoded.id);
    console.log("User found:", user);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }
};
