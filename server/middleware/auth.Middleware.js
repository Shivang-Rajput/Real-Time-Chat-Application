import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find User
const user = await User.findById(decoded.id).select("-password");

if (!user) {
  return res.status(401).json({
    success: false,
    message: "User not found",
  });
}

console.log("Authenticated User:");
console.log(user);

    console.log("Decoded Token:");
    console.log(decoded);

  req.user = user;
    next();

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default protect;