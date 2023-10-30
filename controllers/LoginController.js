const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  try {
    const user = await User.findOne({ where: { userEmail } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      userPassword,
      user.userPassword
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    await user.update({ isSignedIn: true });

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.userId = token;
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  login,
};
