import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validate Input
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    console.log("Received Data:");
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Password:", password);

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    res.status(200).json({
      success: true,
      message: "Email is available ✅",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};