const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password, username, role } = req.body;
    console.log("Register attempt:", { email, password, username, role });
    const validRoles = ["user", "admin"];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or username already exists" });
    }
    const user = new User({ email, password, username, role: role || "user" });
    await user.save();
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res
      .status(201)
      .json({
        token,
        user: { id: user._id, email, username, role: user.role },
      });
  } catch (error) {
    console.error("Register error:", error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Email or username conflict, please try again" });
    }
    res
      .status(400)
      .json({ message: "Error registering user", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", { email, password });
    const user = await User.findOne({ email });
    console.log("User found:", user ? user.email : null);
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({ token, user: { id: user._id, email, role: user.role } });
  } catch (error) {
    res.status(400).json({ message: "Error logging in", error: error.message });
  }
};


exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(400).json({ message: "Error fetching user", error: error.message });
  }
};